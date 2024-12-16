import React, { createContext, useState, useEffect, useCallback } from "react";
import Papa from "papaparse";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [sliderBooks, setSliderBooks] = useState({});
    const [bookReviews, setBookReviews] = useState({});
    const [bookGenres, setBookGenres] = useState({});
    const [genreBooks, setGenreBooks] = useState({});
    const [allGenres, setAllGenres] = useState([]); // New state to hold unique genres
    const [lastUpdated, setLastUpdated] = useState(null);

    const normalizeBookId = (bookId) => parseInt(bookId, 10); // Normalize book IDs to integers

    const fetchBooksData = useCallback(() => {
        Papa.parse("/sonBooks.csv", {
            header: true,
            download: true,
            complete: (result) => {
                const books = result.data;
                const shuffled = books.sort(() => 0.5 - Math.random());

                const genresMap = {};
                const genreBooksMap = {};
                const uniqueGenres = new Set(); // Use a Set to gather unique genres

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

                    // Populate unique genres
                    bookGenres.forEach((genre) => uniqueGenres.add(genre));

                    // Update genreBooksMap
                    bookGenres.forEach((genre) => {
                        if (!genreBooksMap[genre]) {
                            genreBooksMap[genre] = [];
                        }
                        genreBooksMap[genre].push(bookData);
                    });

                    // Update genresMap
                    genresMap[bookData.id] = bookGenres;
                });

                setBookGenres(genresMap);
                setGenreBooks(genreBooksMap);
                setAllGenres(Array.from(uniqueGenres).sort()); // Convert to array and sort alphabetically

                // Set books for sliders
                setSliderBooks({
                    recommended: shuffled.slice(0, 15),
                    topPicks: shuffled.slice(15, 30),
                    favoriteGenres: shuffled.slice(30, 45),
                    popularAmongFriends: shuffled.slice(45, 60),
                });

                setLastUpdated(Date.now());
            },
        });
    }, []);

    const fetchReviewsData = useCallback(() => {
        Papa.parse("/sonRew.csv", {
            header: true,
            download: true,
            complete: (result) => {
                const reviews = result.data;

                // Map reviews to their respective book IDs
                const reviewsMap = {};
                reviews.forEach((review) => {
                    const bookId = normalizeBookId(review.book_id);
                    if (!reviewsMap[bookId]) {
                        reviewsMap[bookId] = [];
                    }
                    reviewsMap[bookId].push({
                        text: review.text || "No text provided.",
                        rating: parseInt(review.rating, 10) || 0, // Default rating to 0 if missing
                    });
                });

                setBookReviews(reviewsMap);
            },
        });
    }, []);

    useEffect(() => {
        if (!lastUpdated || Date.now() - lastUpdated > 600000) {
            fetchBooksData();
            fetchReviewsData();
        }
    }, [lastUpdated, fetchBooksData, fetchReviewsData]);

    return (
        <BookContext.Provider
            value={{
                sliderBooks,
                bookReviews,
                bookGenres,
                genreBooks,
                allGenres, // Provide unique genres
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => React.useContext(BookContext);
