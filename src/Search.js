import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from './Modal';

function Search() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const genres = {
        Fiction: [
            { title: "The Alchemist", author: "Paulo Coelho", reviews: ["Inspirational.", "Thought-provoking."] },
            { title: "The Great Gatsby", author: "F. Scott Fitzgerald", reviews: ["Amazing!", "Timeless classic."] },
            { title: "1984", author: "George Orwell", reviews: ["Chillingly relevant.", "Thought-provoking."] },
        ],
        "Science Fiction": [
            { title: "Dune", author: "Frank Herbert", reviews: ["Epic.", "Groundbreaking."] },
            { title: "Foundation", author: "Isaac Asimov", reviews: ["Timeless sci-fi classic.", "Masterful."] },
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

    const CustomPrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                left: '-25px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'black',
                fontSize: '24px',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
                zIndex: 2,
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
                right: '-25px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'black',
                fontSize: '24px',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
                zIndex: 2,
            }}
        >
            ▶
        </button>
    );

    const sliderSettings = {
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
        <div style={{ padding: '20px' }}>
            <h1>Search Page</h1>
            <Modal isOpen={isModalOpen} book={selectedBook} onClose={closeModal} />
            {Object.keys(genres).map((genre) => (
                <div key={genre} style={{ marginBottom: '30px', position: 'relative' }}>
                    <h2>{genre}</h2>
                    <div style={{ position: 'relative', margin: '0 auto', padding: '20px 0' }}>
                        <Slider {...sliderSettings}>
                            {/* Add empty divs to create padding on both ends */}
                            <div style={{ padding: '10px' }} />
                            {genres[genre].map((book, index) => (
                                <div
                                    key={index}
                                    style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}
                                    onClick={() => openModal(book)}
                                >
                                    <h3>{book.title}</h3>
                                </div>
                            ))}
                            <div style={{ padding: '10px' }} />
                        </Slider>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Search;
