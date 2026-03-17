import "./productCategory.css"
import shopContext from "../../context/shopContext";
import React, { useContext, useEffect, useState, useRef } from "react"
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductCard from "../../components/ProductCard/ProductCard.jsx"
import Pagination from "../../components/Pagination/Pagination.jsx"
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import axios from "axios";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProductCategory() {
    let { topLevelCategory, secondLevelCategory, thirdLevelCategory, searchTerm } = useParams();
    let { backendURL, currency } = useContext(shopContext);
    
    let [categoryProducts, setCategoryProducts] = useState([]);
    let [filteredProducts, setFilteredProducts] = useState([]);
    let [color, setColor] = useState([]);
    let [size, setSize] = useState([]);
    let [priceRange, setPriceRange] = useState("");
    let [discountRange, setDiscountRange] = useState("");
    let [availability, setAvailability] = useState("");
    let [loading, setLoading] = useState(true);
    let [isSearchMode, setIsSearchMode] = useState(false);
    let [decodedSearchTerm, setDecodedSearchTerm] = useState("");
    let [hasSearched, setHasSearched] = useState(false); // NEW: Track if search has been performed
    
    const [openBox1, setOpenBox1] = useState(false);
    const [openBox2, setOpenBox2] = useState(false);
    const [openBox3, setOpenBox3] = useState(false);
    const [openBox4, setOpenBox4] = useState(false);
    const [openBox5, setOpenBox5] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [filtersMobileOpen, setFiltersMobileOpen] = useState(false);
    const sortDropdownRef = useRef(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // Handle URL parameters and set mode - FIXED: More reliable detection
    useEffect(() => {
        const isSearchRoute = searchTerm && searchTerm !== "undefined";
        setIsSearchMode(isSearchRoute);
        
        if (isSearchRoute) {
            const decoded = decodeURIComponent(searchTerm);
            setDecodedSearchTerm(decoded);
            setHasSearched(true); // Mark that we've performed a search
        } else {
            setDecodedSearchTerm("");
            setHasSearched(false);
        }

        // Reset filters when route changes
        setColor([]);
        setSize([]);
        setPriceRange("");
        setDiscountRange("");
        setAvailability("");
        setCurrentPage(1);
    }, [searchTerm, topLevelCategory, secondLevelCategory, thirdLevelCategory]);

    const handleColor = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;
        if (checked) {
            let success = true;
            for (let i = 0; i < color.length; i++) {
                if (color[i] === value) {
                    success = false;
                    break;
                }
            }

            if (success === true) {
                setColor([...color, value]);
            }
        } else {
            setColor(color.filter((c) => c !== value));
        }
    }

    const handleSize = (e) => {
        let value = e.target.value;
        let success = true;
        for (let i = 0; i < size.length; i++) {
            if (size[i] === value) {
                success = false;
                break;
            }
        }
        if (success === true) {
            setSize((prev) => [...prev, value]);
        } else {
            setSize(size.filter((item) => item !== value));
        }
    }

    const handleSortOption = (value) => {
        setSortDropdownOpen(false);
        if (filteredProducts && filteredProducts.length > 0) {
            switch (value) {
                case "lowToHigh":
                    sortFromLowToHigh();
                    break;
                case "highToLow":
                    sortFromHighToLow();
                    break;
                default:
                    break;
            }
        }
    }

    const sortFromLowToHigh = () => {
        const sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        updatePagination(sortedProducts);
    }

    const sortFromHighToLow = () => {
        const sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        updatePagination(sortedProducts);
    }

    // Pagination functions
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getCurrentPageProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const updatePagination = (products) => {
        setFilteredProducts(products);
        const totalPagesCount = Math.ceil(products.length / productsPerPage);
        setTotalPages(totalPagesCount);
        // Only reset to page 1 if we have new search results
        if (hasSearched || products.length !== filteredProducts.length) {
            setCurrentPage(1);
        }
    };

    // FIXED: Main data fetching function with better state management
    useEffect(() => {
        let isMounted = true; // Prevent state updates on unmounted component
        
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let response;

                if (isSearchMode && decodedSearchTerm) {
                    // Handle search case - ensure we only search when we have a term
                    console.log("Searching for:", decodedSearchTerm);
                    response = await axios.post(`${backendURL}/api/product/search`, {
                        searchTerm: decodedSearchTerm
                    });
                } else if (!isSearchMode) {
                    // Handle normal category navigation - only when not in search mode
                    let payload = {
                        topLevelCategory: topLevelCategory || "",
                        secondLevelCategory: secondLevelCategory || "",
                        thirdLevelCategory: thirdLevelCategory || "",
                        color,
                        size,
                        priceRange,
                        discountRange,
                        availability,
                    };

                    response = await axios.post(`${backendURL}/api/product/filter`, payload);
                } else {
                    // If we're in search mode but no decoded term, skip the API call
                    setLoading(false);
                    return;
                }

                if (isMounted) {
                    if (response.data.success) {
                        const products = response.data.findedFilteredProducts || [];
                        setCategoryProducts(products);
                        updatePagination(products);
                        
                        // Log for debugging
                        console.log(`Found ${products.length} products for:`, 
                            isSearchMode ? `search "${decodedSearchTerm}"` : `category ${thirdLevelCategory || secondLevelCategory || topLevelCategory}`);
                    } else {
                        toast.error(response.data.message);
                        setCategoryProducts([]);
                        updatePagination([]);
                    }
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching products:", error);
                    toast.error("Failed to load products");
                    setCategoryProducts([]);
                    updatePagination([]);
                    setLoading(false);
                }
            }
        };

        // Only fetch if we have valid parameters
        if (isSearchMode ? decodedSearchTerm : true) {
            fetchProducts();
        } else {
            setLoading(false);
        }

        return () => {
            isMounted = false; // Cleanup function
        };
    }, [
        backendURL, 
        isSearchMode, 
        decodedSearchTerm, 
        topLevelCategory, 
        secondLevelCategory, 
        thirdLevelCategory, 
        color, 
        size, 
        priceRange, 
        discountRange, 
        availability,
        hasSearched // Include hasSearched to trigger re-fetch when search mode changes
    ]);

    // Click outside handler for sort dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setSortDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Track viewport for responsive dropdown positioning
    useEffect(() => {
        const setFromWidth = () => setIsMobileViewport(window.innerWidth <= 768);
        setFromWidth();
        window.addEventListener('resize', setFromWidth);
        return () => window.removeEventListener('resize', setFromWidth);
    }, []);

    // Get page title based on route
    const getPageTitle = () => {
        if (isSearchMode && decodedSearchTerm) {
            return `Search Results for "${decodedSearchTerm}"`;
        } else if (thirdLevelCategory && thirdLevelCategory !== "undefined") {
            return thirdLevelCategory;
        } else if (secondLevelCategory && secondLevelCategory !== "undefined") {
            return secondLevelCategory;
        } else if (topLevelCategory && topLevelCategory !== "undefined") {
            return topLevelCategory;
        } else {
            return "All Products";
        }
    };

    // Clear all filters
    const clearAllFilters = () => {
        setColor([]);
        setSize([]);
        setPriceRange("");
        setDiscountRange("");
        setAvailability("");
    };

    return (
        <>
            <div className="productCategorySection">
                <Header />
                <Navbar />
                
                <div className="proCatSecHeader">
                    <div className="proCatSecHeadTop">
                        <h1>{getPageTitle()}</h1>
                        <div className="headerBox">
                            <div className="customSortDropdown" ref={sortDropdownRef}>
                                <div className="sortDivHIcon">
                                    <div className="sortTrigger" onClick={() => setSortDropdownOpen(!sortDropdownOpen)}>
                                        <span className="sortText">Sort</span>
                                        <div className={`sortArrow ${sortDropdownOpen ? 'open' : ''}`}>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <GridViewTwoToneIcon className="sortIcon" />
                                </div>

                                {sortDropdownOpen && (
                                    <div
                                        className="sortDropdownMenu"
                                        style={isMobileViewport ? { left: '50%', right: 'auto', transform: 'translateX(-50%)' } : { right: 0 }}
                                    >
                                        <div
                                            className="sortOption"
                                            onClick={() => handleSortOption('lowToHigh')}
                                        >
                                            Price: Low to High
                                        </div>
                                        <div
                                            className="sortOption"
                                            onClick={() => handleSortOption('highToLow')}
                                        >
                                            Price: High to Low
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="proCatSecHeaderBottom">
                        <p className="productsCount">
                            {loading ? "Loading..." : `${filteredProducts.length} products found`}
                        </p>
                        {(color.length > 0 || size.length > 0 || priceRange || discountRange || availability) && (
                            <button className="clearFiltersBtn" onClick={clearAllFilters}>
                                Clear All Filters
                            </button>
                        )}
                    </div>
                </div>

                <div className="categoryPageFilterSection">
                    <div className="filterHead">
                        <h3 className="filterHeadH">Filters</h3>
                        <button 
                            className="filterToggleBtn" 
                            onClick={() => setFiltersMobileOpen(!filtersMobileOpen)}
                        >
                            {filtersMobileOpen ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
                    
                    <div className="filterBoxAndProductSec">
                        <div className={`filterBox ${filtersMobileOpen ? 'mobileOpen' : ''}`}>
                            <div className="filterCardContainer">
                                {/* Color Filter */}
                                <div className="filterCard">
                                    <div className="filterCardHead">
                                        <p>Color</p>
                                        <div onClick={() => setOpenBox1(!openBox1)} className="addIcon">
                                            {openBox1 ? <RemoveIcon className="ico" /> : <AddIcon className="ico" />}
                                        </div>
                                    </div>
                                    {openBox1 && (
                                        <div className="openCard">
                                            {["white", "beige", "blue", "brown", "green", "purple", "yellow"].map(colorOption => (
                                                <div key={colorOption} className="openCardInpField">
                                                    <input 
                                                        onChange={handleColor} 
                                                        type="checkbox" 
                                                        value={colorOption}
                                                        checked={color.includes(colorOption)}
                                                    />
                                                    <p>{colorOption}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Size Filter */}
                                <div className="filterCard">
                                    <div className="filterCardHead">
                                        <p>Size</p>
                                        <div onClick={() => setOpenBox2(!openBox2)} className="addIcon">
                                            {openBox2 ? <RemoveIcon className="ico" /> : <AddIcon className="ico" />}
                                        </div>
                                    </div>
                                    {openBox2 && (
                                        <div className="openCard">
                                            {["S", "M", "L"].map(sizeOption => (
                                                <div key={sizeOption} className="openCardInpField">
                                                    <input 
                                                        onChange={handleSize} 
                                                        type="checkbox" 
                                                        value={sizeOption}
                                                        checked={size.includes(sizeOption)}
                                                    />
                                                    <p>{sizeOption}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Price Filter */}
                                <div className="filterCard">
                                    <div className="filterCardHead">
                                        <p>Price</p>
                                        <div onClick={() => setOpenBox3(!openBox3)} className="addIcon">
                                            {openBox3 ? <RemoveIcon className="ico" /> : <AddIcon className="ico" />}
                                        </div>
                                    </div>
                                    {openBox3 && (
                                        <div className="openCard">
                                            {[
                                                {value: "2000 to 4000", label: `${currency}2000 To ${currency}4000`},
                                                {value: "4000 to 8000", label: `${currency}4000 To ${currency}8000`},
                                                {value: "8000 to 16000", label: `${currency}8000 To ${currency}16000`},
                                                {value: "16000 to 32000", label: `${currency}16000 To ${currency}32000`},
                                                {value: "32000 to 64000", label: `${currency}32000 To ${currency}64000`}
                                            ].map(priceOption => (
                                                <div key={priceOption.value} className="openCardInpField">
                                                    <input 
                                                        onChange={(e) => setPriceRange(e.target.value)} 
                                                        type="radio" 
                                                        name="priceRange" 
                                                        value={priceOption.value}
                                                        checked={priceRange === priceOption.value}
                                                    />
                                                    <p>{priceOption.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Discount Filter */}
                                <div className="filterCard">
                                    <div className="filterCardHead">
                                        <p>Discount Range</p>
                                        <div onClick={() => setOpenBox4(!openBox4)} className="addIcon">
                                            {openBox4 ? <RemoveIcon className="ico" /> : <AddIcon className="ico" />}
                                        </div>
                                    </div>
                                    {openBox4 && (
                                        <div className="openCard">
                                            {[10, 20, 30, 40, 50, 60, 70, 80].map(discount => (
                                                <div key={discount} className="openCardInpField">
                                                    <input 
                                                        onChange={(e) => setDiscountRange(e.target.value)} 
                                                        type="radio" 
                                                        name="discountRange" 
                                                        value={discount.toString()}
                                                        checked={discountRange === discount.toString()}
                                                    />
                                                    <p>{discount}% and above</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Availability Filter */}
                                <div className="filterCard">
                                    <div className="filterCardHead">
                                        <p>Availability</p>
                                        <div onClick={() => setOpenBox5(!openBox5)} className="addIcon">
                                            {openBox5 ? <RemoveIcon className="ico" /> : <AddIcon className="ico" />}
                                        </div>
                                    </div>
                                    {openBox5 && (
                                        <div className="openCard">
                                            {[
                                                {value: "inStock", label: "In Stock"},
                                                {value: "outOfStock", label: "Out Of Stock"}
                                            ].map(availabilityOption => (
                                                <div key={availabilityOption.value} className="openCardInpField">
                                                    <input 
                                                        onChange={(e) => setAvailability(e.target.value)} 
                                                        type="radio" 
                                                        name="availability" 
                                                        value={availabilityOption.value}
                                                        checked={availability === availabilityOption.value}
                                                    />
                                                    <p>{availabilityOption.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Products Data */}
                        <div className="filteredProductContainer">
                            {loading ? (
                                <div className="loadingState">Loading products...</div>
                            ) : getCurrentPageProducts().length > 0 ? (
                                <>
                                    {getCurrentPageProducts().map((item, index) =>
                                        <ProductCard
                                            key={item._id || index}
                                            imageUrl={item.imageUrl}
                                            brand={item.brand}
                                            title={item.title}
                                            color={item.color}
                                            price={item.price}
                                            discountPrice={item.discountPrice}
                                            discountPercentage={item.discountPercentage}
                                            productId={item._id}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="noProductsFound">
                                    <h2>No products found</h2>
                                    <p>
                                        {isSearchMode && decodedSearchTerm
                                            ? `No products found for "${decodedSearchTerm}". Try searching with different terms.`
                                            : "Try adjusting your filters to find what you're looking for."
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination Component */}
                {!loading && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        maxVisiblePages={5}
                    />
                )}

                <Footer />
            </div>
        </>
    )
}