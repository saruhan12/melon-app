import React, { useState } from "react";
import "./Modal.css";
import { useBookContext } from "../context/BookContext";

function Modal({ isOpen, book, onClose }) {
    const { bookReviews, bookGenres } = useBookContext();
    const [isReviewViewMode, setIsReviewViewMode] = useState(false);
    const [isWriteReviewMode, setIsWriteReviewMode] = useState(false);
    const [expandedReview, setExpandedReview] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    if (!isOpen || !book) return null;

    const reviews = bookReviews[book["Unnamed: 0"]] || [];
    const genres = bookGenres[book["Unnamed: 0"]] || [];

    const handleCloseButton = () => {
        if (isReviewViewMode || isWriteReviewMode) {
            setIsReviewViewMode(false);
            setIsWriteReviewMode(false);
        } else {
            onClose();
        }
    };

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch("/api/save_review/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    book_id: book["Unnamed: 0"],
                    user_id: 123, // Replace with actual user ID
                    review_text: reviewText,
                    rating: rating,
                }),
            });

            if (response.ok) {
                alert("Review submitted successfully!");
                setReviewText("");
                setRating(0);
                setIsWriteReviewMode(false);
            } else {
                alert("Error submitting review");
            }
        } catch (error) {
            alert("Error submitting review: " + error.message);
        }
    };

    const handleReviewClick = (index) => {
        setExpandedReview((prev) => (prev === index ? null : index));
    };

    const renderStars = (currentRating) => (
        <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onMouseEnter={() => setRating(star)}
                    onClick={() => setRating(star)}
                    style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: star <= currentRating ? "#ffc107" : "#e4e5e9",
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="close-button" onClick={handleCloseButton}>
                    Close
                </button>

                <div className="modal-layout">
                    {/* Cover Photo */}
                    <div className="modal-cover">
                        <img
                            src={book.cover_url}
                            alt={book.name}
                            className="modal-book-cover-large"
                        />
                    </div>

                    {/* Right-Side Content */}
                    <div className="modal-right-content">
                        {!isReviewViewMode && !isWriteReviewMode ? (
                            <>
                                <div>
                                    <h2>{book.name}</h2>
                                    <p>
                                        <strong>Author:</strong> {book.author}
                                    </p>
                                    <p>
                                        <strong>Genres:</strong> {genres.join(", ")}
                                    </p>
                                </div>
                                <div className="modal-buttons">
                                    <button
                                        className="see-reviews-button"
                                        onClick={() => setIsReviewViewMode(true)}
                                    >
                                        See Reviews
                                    </button>
                                    <button
                                        className="review-button"
                                        onClick={() => setIsWriteReviewMode(true)}
                                    >
                                        Review This Book
                                    </button>
                                </div>
                            </>
                        ) : isReviewViewMode ? (
                            <div className="review-container">
                                <h3>Reviews</h3>
                                <div className="review-list">
                                    {reviews.length > 0 ? (
                                        reviews.map((review, index) => (
                                            <div
                                                key={index}
                                                className="review"
                                                onClick={() => handleReviewClick(index)}
                                            >
                                                <p>
                                                    {expandedReview === index
                                                        ? review.text
                                                        : `${review.text.substring(0, 500)}${
                                                              review.text.length > 500 ? "..." : ""
                                                          }`}
                                                </p>
                                                <div>{renderStars(review.rating)}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No reviews yet. Be the first to review this book!</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3>Write a Review</h3>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review here..."
                                    className="review-textarea"
                                />
                                <div>
                                    <strong>Rating:</strong>
                                    {renderStars(rating)}
                                </div>
                                <div className="review-buttons">
                                    <button
                                        className="submit-review-button"
                                        onClick={handleReviewSubmit}
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        className="cancel-review-button"
                                        onClick={() => setIsWriteReviewMode(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
