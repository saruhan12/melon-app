import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "./Modal";
import { useBookContext } from "../context/BookContext";

function Home() {
    const { sliderBooks } = useBookContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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
                position: "absolute",
                left: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
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
                position: "absolute",
                right: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
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
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        swipe: true,
    };

    const sliders = [
        { title: "Recommended for You", books: sliderBooks.recommended },
        { title: "Today's Top Picks", books: sliderBooks.topPicks },
        { title: "Based on Your Favorite Genre", books: sliderBooks.favoriteGenres },
    ];

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

            {sliders.map((slider, idx) => (
                <div key={idx} style={{ marginBottom: "50px" }}>
                    <h2>{slider.title}</h2>
                    <div style={{ position: "relative", padding: "0 20px" }}>
                        <Slider {...settings}>
                            {slider.books.map((book, index) => (
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
                                            width: "120px", // Set a smaller width
                                            height: "160px", // Set a smaller height
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <h3
                                        style={{
                                            fontSize: "14px", // Adjust text size to match smaller images
                                        }}
                                    >
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

export default Home;
