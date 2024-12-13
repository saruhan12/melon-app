import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Papa from 'papaparse';
import Modal from './Modal';

function Search() {
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        Papa.parse('/booksConnu.csv', {
            download: true,
            header: true,
            complete: (results) => {
                setBooks(results.data);
            },
        });
    }, []);

    const getRandomBooks = (count) => {
        const shuffled = books.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const genres = [
        { genre: 'Fiction', books: getRandomBooks(15) },
        { genre: 'Science Fiction', books: getRandomBooks(15) },
        { genre: 'Mystery', books: getRandomBooks(15) },
        { genre: 'Fantasy', books: getRandomBooks(15) },
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
                left: '-20px',
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
                right: '-20px',
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

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        swipe: true,
    };

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: '#FFD54F',
                minHeight: '100vh',
                overflowX: 'hidden', // Prevent horizontal scrolling
            }}
        >
            <h1>Search Page</h1>
            <Modal isOpen={isModalOpen} book={selectedBook} onClose={closeModal} />
            {genres.map((genre, index) => (
                <div key={index} style={{ marginBottom: '30px' }}>
                    <h2>{genre.genre}</h2>
                    <div style={{ position: 'relative', padding: '20px 0' }}>
                        <Slider {...sliderSettings}>
                            {genre.books.map((book, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => openModal(book)}
                                >
                                    <img
                                        src={book.cover_url}
                                        alt={book.name}
                                        style={{
                                            width: '150px',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <h3 style={{ fontSize: '14px', margin: '10px 0 0' }}>
                                        {book.name}
                                    </h3>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Search;
