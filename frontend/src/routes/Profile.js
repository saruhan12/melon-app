import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Modal from "./Modal";
import { useBookContext } from "../context/BookContext";

function Profile() {
    const { sliderBooks } = useBookContext(); // Access books from context
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [favoriteBooks, setFavoriteBooks] = useState([]); // State for random favorite books
    const [reviewedBooks, setReviewedBooks] = useState([]); // State for reviewed books
    const [favoriteGenre, setFavoriteGenre] = useState(""); // Favorite genre selected by the user
    const [isSelectingGenre, setIsSelectingGenre] = useState(false); // Whether user is selecting a genre

    const userInfo = {
        avatar: "", // Empty or undefined means no custom avatar
        username: "John Doe",
    };

    // Default avatar image
    const defaultAvatar = "https://static.thenounproject.com/png/4121543-200.png";

    // Fetch random favorite and reviewed books
    useEffect(() => {
        const fetchRandomBooks = () => {
            const allBooks = [
                ...(sliderBooks.recommended || []),
                ...(sliderBooks.topPicks || []),
                ...(sliderBooks.favoriteGenres || []),
                ...(sliderBooks.popularAmongFriends || []),
            ];
            const shuffledBooks = allBooks.sort(() => 0.5 - Math.random());
            setFavoriteBooks(shuffledBooks.slice(0, 4)); // Pick 4 random books
            setReviewedBooks(shuffledBooks.slice(0, 50)); // Pick 50 random books
        };

        fetchRandomBooks();
    }, [sliderBooks]);

    const openModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const handleGenreChange = async (e) => {
        const selectedGenre = e.target.value;
        setFavoriteGenre(selectedGenre);
        setIsSelectingGenre(false);

        // Send the selected genre to the backend
        try {
            const response = await fetch("/api/set_favorite_genre/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ favoriteGenre: selectedGenre }),
            });
            if (!response.ok) {
                console.error("Failed to update favorite genre");
            }
        } catch (error) {
            console.error("Error updating favorite genre:", error);
        }
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipe: true,
    };

    return (
        <div style={styles.pageContainer}>
            {/* User Info Section */}
            <div style={styles.profileSection}>
                <img
                    src={userInfo.avatar || defaultAvatar} // Use defaultAvatar if no avatar is provided
                    alt="User Avatar"
                    style={styles.avatar}
                />
                <div style={styles.userInfo}>
                    <h2 style={styles.username}>{userInfo.username}</h2>
                    <div style={styles.favoriteGenre}>
                        {favoriteGenre ? (
                            <p style={styles.genreDisplay}>
                                Your favorite genre is: <strong>{favoriteGenre}</strong>{" "}
                                <button
                                    style={styles.changeGenreButton}
                                    onClick={() => setIsSelectingGenre(true)}
                                >
                                    Change
                                </button>
                            </p>
                        ) : (
                            <button
                                style={styles.selectGenreButton}
                                onClick={() => setIsSelectingGenre(true)}
                            >
                                Select Your Favorite Genre
                            </button>
                        )}

                        {isSelectingGenre && (
                            <select
                                id="genre-select"
                                value={favoriteGenre}
                                onChange={handleGenreChange}
                                style={styles.genreSelect}
                            >
                                <option value="" disabled>
                                    Select your favorite genre
                                </option>
                                {Object.keys(sliderBooks).map((genre, index) => (
                                    <option key={index} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} book={selectedBook} onClose={closeModal} />

            {/* Favorite Books Section */}
            <div style={styles.categoryContainer}>
                <h2 style={styles.categoryTitle}>Favorite Books</h2>
                <div style={styles.bookRow}>
                    {favoriteBooks.map((book, index) => (
                        <div
                            key={index}
                            style={styles.bookCard}
                            onClick={() => openModal(book)}
                        >
                            <img
                                src={book.cover_url}
                                alt={book.name}
                                style={styles.bookCover}
                            />
                            <h3 style={styles.bookTitle}>{book.name}</h3>
                            <p style={styles.bookAuthor}>{book.author}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Books Reviewed Slider */}
            <div style={styles.sliderContainer}>
                <h2 style={styles.sliderTitle}>Books Reviewed</h2>
                <Slider {...sliderSettings}>
                    {reviewedBooks.map((book, index) => (
                        <div key={index} style={styles.sliderItem} onClick={() => openModal(book)}>
                            <img
                                src={book.cover_url}
                                alt={book.name}
                                style={styles.sliderBookCover}
                            />
                            <h3 style={styles.sliderBookTitle}>{book.name}</h3>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        backgroundColor: "#FFD54F",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "'Arial', sans-serif",
    },
    profileSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: "40px",
        padding: "20px",
        backgroundColor: "#FFF",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    avatar: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "20px",
        border: "2px solid #ddd",
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
    },
    username: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#444",
        marginBottom: "15px",
    },
    favoriteGenre: {
        marginTop: "10px",
    },
    genreDisplay: {
        fontSize: "16px",
        color: "#333",
    },
    selectGenreButton: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#007BFF",
        cursor: "pointer",
        border: "none",
        background: "none",
        textDecoration: "underline",
    },
    changeGenreButton: {
        fontSize: "14px",
        color: "#007BFF",
        background: "none",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline",
    },
    categoryContainer: {
        marginBottom: "50px",
    },
    categoryTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#444",
        marginBottom: "20px",
    },
    bookRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
    },
    bookCard: {
        flex: "1 1 calc(25% - 20px)",
        maxWidth: "calc(25% - 20px)",
        textAlign: "center",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#fff",
    },
    bookCover: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px",
    },
    sliderContainer: {
        marginTop: "20px",
    },
    sliderTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    sliderItem: {
        textAlign: "center",
        cursor: "pointer",
        padding: "10px",
    },
    sliderBookCover: {
        width: "120px",
        height: "160px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    sliderBookTitle: {
        fontSize: "14px",
        marginTop: "10px",
    },
};

export default Profile;
