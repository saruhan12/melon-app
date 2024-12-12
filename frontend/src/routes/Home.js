import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from './Modal'; // Import the reusable Modal component

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const recommendedBooks = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", reviews: ["Amazing!", "Timeless classic."] },
        { title: "To Kill a Mockingbird", author: "Harper Lee", reviews: ["Powerful.", "A must-read."] },
        { title: "1984", author: "George Orwell", reviews: ["Chillingly relevant.", "Thought-provoking."] },
        { title: "Pride and Prejudice", author: "Jane Austen", reviews: ["Romantic and witty.", "A masterpiece."] },
        { title: "Moby Dick", author: "Herman Melville", reviews: ["Epic tale.", "Challenging but rewarding."] },
    ];

    const openModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const CustomPrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                left: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 1,
            }}
        >
            ◀
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                right: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 1,
            }}
        >
            ▶
        </button>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        swipe: true,
    };

    return (
        <div style={{ textAlign: 'left', padding: '20px', position: 'relative', backgroundColor: '#FFD54F', minHeight: '100vh' }} >
            <Modal isOpen={isModalOpen} book={selectedBook} onClose={closeModal} />
            <h2>Recommended for You</h2>
            <div style={{ position: 'relative', padding: '0 20px' }}>
                <Slider {...settings}>
                    {recommendedBooks.map((book, index) => (
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
            <h2>Todays Top Books</h2>
            <div style={{ position: 'relative', padding: '0 20px' }}>
            <Slider {...settings}>
                    {recommendedBooks.map((book, index) => (
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
        </div>
    );
}

export default Home;
