import React from 'react';
import './Modal.css';

function Modal({ isOpen, book, onClose }) {
    if (!isOpen || !book) return null;

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{book.name}</h2>
                <p>Genres: {book.genres}</p>
                <img
                    src={book.cover_url}
                    alt={book.name}
                    style={{ width: '200px', height: '300px', objectFit: 'cover', marginBottom: '20px' }}
                />
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                    <button className="visit-button">Visit Book Page</button>
                </a>
                <button onClick={onClose} className="close-button">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;
