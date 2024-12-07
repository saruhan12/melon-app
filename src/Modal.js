import React from 'react';
import './Modal.css';

function Modal({ isOpen, book, onClose }) {
    if (!isOpen || !book) return null;

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{book.title}</h2>
                <p>By {book.author}</p>
                <h3>Reviews</h3>
                <ul>
                    {book.reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                    ))}
                </ul>
                <button onClick={onClose} className="close-button">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;