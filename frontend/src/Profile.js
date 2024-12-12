import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from './Modal';

function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const userFavorites = {
        "Favorite Books": [
            { title: "Pride and Prejudice", author: "Jane Austen", reviews: ["Romantic.", "Witty."] },
            { title: "Moby Dick", author: "Herman Melville", reviews: ["Epic.", "Classic."] },
        ],
        "Favorite Genres": [
            { title: "1984", author: "George Orwell", reviews: ["Relevant.", "Insightful."] },
            { title: "To Kill a Mockingbird", author: "Harper Lee", reviews: ["Powerful.", "Timeless."] },
        ],
    };

    const openModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Profile Page</h1>
            <Modal isOpen={isModalOpen} book={selectedBook} onClose={closeModal} />
            {Object.keys(userFavorites).map((category) => (
                <div key={category} style={{ marginBottom: '30px' }}>
                    <h2>{category}</h2>
                    <Slider {...sliderSettings}>
                        {userFavorites[category].map((book, index) => (
                            <div
                                key={index}
                                style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => openModal(book)}
                            >
                                <h3>{book.title}</h3>
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>
    );
}

export default Profile;
