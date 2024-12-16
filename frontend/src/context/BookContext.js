import React, { createContext, useState, useEffect, useCallback } from "react";
import Papa from "papaparse";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [sliderBooks, setSliderBooks] = useState({});
    const [bookReviews, setBookReviews] = useState({});
    const [bookGenres, setBookGenres] = useState({});
    const [genreBooks, setGenreBooks] = useState({});
    const [allGenres, setAllGenres] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);

    const normalizeBookId = (bookId) => parseInt(bookId, 10);

    const fetchBooksData = useCallback(() => {
        Papa.parse("/sonBooks.csv", {
            header: true,
            download: true,
            complete: (result) => {
                const books = result.data;
                const shuffled = books.sort(() => 0.5 - Math.random());

                const genresMap = {};
                const genreBooksMap = {};
                const uniqueGenres = new Set();

                books.forEach((book) => {
                    const bookGenres = book.genres
                        ? book.genres.split(",").map((genre) => genre.trim())
                        : [];

                    const bookData = {
                        id: normalizeBookId(book["Unnamed: 0"]),
                        name: book.name,
                        cover_url: book.cover_url || "https://via.placeholder.com/120",
                        author: book.author || "Unknown Author",
                        genres: bookGenres,
                    };

                    bookGenres.forEach((genre) => uniqueGenres.add(genre));

                    bookGenres.forEach((genre) => {
                        if (!genreBooksMap[genre]) {
                            genreBooksMap[genre] = [];
                        }
                        genreBooksMap[genre].push(bookData);
                    });

                    genresMap[bookData.id] = bookGenres;
                });

                setBookGenres(genresMap);
                setGenreBooks(genreBooksMap);
                setAllGenres(Array.from(uniqueGenres).sort());

                setSliderBooks((prev) => ({
                    ...prev,
                    topPicks: shuffled.slice(0, 15),
                    favoriteGenres: shuffled.slice(15, 30),
                    popularAmongFriends: shuffled.slice(30, 45),
                }));

                setLastUpdated(Date.now());
            },
        });
    }, []);

    const fetchRecommendations = useCallback(() => {
        fetch("/modelRec.json")
            .then((response) => response.json())
            .then((data) => {
                // Set recommendations for the "Recommended for You" slider
                setSliderBooks((prev) => ({
                    ...prev,
                    recommended: data,
                }));
            })
            .catch((error) => console.error("Error fetching recommendations:", error));
    }, []);

    const fetchReviewsData = useCallback(() => {
        Papa.parse("/sonRew.csv", {
            header: true,
            download: true,
            complete: (result) => {
                const reviews = result.data;
                const reviewsMap = {};
                reviews.forEach((review) => {
                    const bookId = normalizeBookId(review.book_id);
                    if (!reviewsMap[bookId]) {
                        reviewsMap[bookId] = [];
                    }
                    reviewsMap[bookId].push({
                        text: review.text || "No text provided.",
                        rating: parseInt(review.rating, 10) || 0,
                    });
                });

                setBookReviews(reviewsMap);
            },
        });
    }, []);

    useEffect(() => {
        if (!lastUpdated || Date.now() - lastUpdated > 600000) {
            fetchBooksData();
            fetchRecommendations();
            fetchReviewsData();
        }
    }, [lastUpdated, fetchBooksData, fetchRecommendations, fetchReviewsData]);

    return (
        <BookContext.Provider
            value={{
                sliderBooks,
                bookReviews,
                bookGenres,
                genreBooks,
                allGenres,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => React.useContext(BookContext);
