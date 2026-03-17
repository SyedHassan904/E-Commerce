import "./productGallery.css"
import React, { useContext, useEffect, useState, useRef } from "react"
import shopContext from "../../context/shopContext.js"
import Product from "../Product/Product.jsx";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios"
import { toast } from "react-toastify"

export default function ProductGallery({ title, topLevelCategory, secondLevelCategory, thirdLevelCategory }) {
    const [filteredCatProducts, setFilteredCatProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { backendURL } = useContext(shopContext);
    const scrollContainerRef = useRef(null);

    const productsPerPage = 6; // Number of products visible at once

    useEffect(() => {
        const getFilteredCategoryProducts = async () => {
            let payload = {
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
            }
            try {
                let response = await axios.post(`${backendURL}/api/product/filter`, payload);
                if (response.data.success) {
                    setFilteredCatProducts(response.data.findedFilteredProducts);
                    setTotalPages(Math.ceil(response.data.findedFilteredProducts.length / productsPerPage));
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        getFilteredCategoryProducts();
    }, [backendURL, topLevelCategory, secondLevelCategory, thirdLevelCategory]);

    const scrollToNext = () => {
        if (currentPage < totalPages - 1) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            scrollContainerRef.current.scrollTo({
                left: nextPage * scrollContainerRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollToPrevious = () => {
        if (currentPage > 0) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            scrollContainerRef.current.scrollTo({
                left: prevPage * scrollContainerRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
        scrollContainerRef.current.scrollTo({
            left: pageIndex * scrollContainerRef.current.clientWidth,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {
                filteredCatProducts?.length > 0?
                <div className="productGallerySection">
                <div className="galleryHeader">
                    <h2 className="galleryTitle">{title}</h2>
                    <div className="paginationDots">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`paginationDot ${currentPage === index ? 'active' : ''}`}
                                onClick={() => scrollToPage(index)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="productGalleryContainer">
                    {/* Left scroll button - only visible when not on first page */}
                    {currentPage > 0 && (
                        <button 
                            className="scrollArrow scrollArrowLeft" 
                            onClick={scrollToPrevious}
                        >
                            <ArrowBackIosIcon className="arrowIcon"/>
                        </button>
                    )}
                    
                    <div 
                        className="productGalleryProductsBox" 
                        ref={scrollContainerRef}
                    >
                        {filteredCatProducts?.slice()?.reverse()?.map((item, index) => (
                            <Product 
                                key={index} 
                                imageUrl={item?.imageUrl} 
                                brand={item?.brand} 
                                title={item?.title}
                                productId={item?._id}
                            />
                        ))}
                    </div>
                    
                    {/* Right scroll button - only visible when not on last page */}
                    {currentPage < totalPages - 1 && (
                        <button 
                            className="scrollArrow scrollArrowRight" 
                            onClick={scrollToNext}
                        >
                            <ArrowForwardIosIcon className="arrowIcon"/>
                        </button>
                    )}
                </div>
            </div>
            :
            ""
            }
        </>
    )
}