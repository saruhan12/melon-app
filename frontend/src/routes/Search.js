import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Modal from "./Modal";
import { useBookContext } from "../context/BookContext";

function Search() {
    const { genreBooks, sliderBooks, bookGenres } = useBookContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const openModal = (book) => {
        if (!book) return;
        const bookWithGenres = {
            ...book,
            genres: bookGenres[book.id] || [],
        };
        setSelectedBook(bookWithGenres);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }

        const allBooks = Object.values(genreBooks).flat();

        const filteredBooks = allBooks.filter((book) => {
            const genres = book.genres || [];
            return (
                book.name.toLowerCase().includes(query) ||
                genres.some((genre) => genre.toLowerCase().includes(query))
            );
        });

        setSearchResults(filteredBooks);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipe: true,
    };

    return (
        <div
            style={{
                textAlign: "left",
                padding: "20px",
                position: "relative",
                backgroundColor: "#FFD54F",
                minHeight: "100vh",
            }}
        >
            <Modal isOpen={isModalOpen} book={selectedBook} onClose={closeModal} />

            {/* Search Bar */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search for books or genres..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
            </div>

            {/* Search Results */}
            {searchQuery.trim() && searchResults.length > 0 ? (
                <div>
                    <h2>Search Results</h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {searchResults.map((book, index) => (
                            <li
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => openModal(book)}
                            >
                                <img
                                    src={book.cover_url}
                                    alt={book.name}
                                    style={{
                                        width: "80px",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                />
                                <span>{book.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : searchQuery.trim() ? (
                <h2>No results found</h2>
            ) : (
                Object.entries(genreBooks).map(([genre, books], idx) => (
                    <div key={idx} style={{ marginBottom: "50px" }}>
                        <h2>{genre}</h2>
                        <div style={{ position: "relative", padding: "0 20px" }}>
                            <Slider {...settings}>
                                {books.map((book, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            padding: "10px",
                                            textAlign: "center",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => openModal(book)}
                                    >
                                        <img
                                            src={book.cover_url}
                                            alt={book.name}
                                            style={{
                                                width: "120px",
                                                height: "160px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                marginBottom: "10px",
                                            }}
                                        />
                                        <h3
                                            style={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            {book.name}
                                        </h3>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Search;
