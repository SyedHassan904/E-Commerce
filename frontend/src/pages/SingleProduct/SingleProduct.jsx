import "./singleProduct.css"
import shopContext from "../../context/shopContext.js"
import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import RatingBars from "../../components/RatingBars/RatingBars.jsx"
import StarRating from "../../components/StarRating/StarRating.jsx"
import Product from "../../components/Product/Product.jsx"
import axios from "axios"
import { toast } from "react-toastify"
import { useCart } from "../../hooks/useCart.js"
import productDetailsData from "./singleProductData.js"

export default function SingleProduct() {
    const { productId } = useParams();
    const { backendURL, currency } = useContext(shopContext)
    const [singleProduct, setSingleProduct] = useState("");
    const navigate = useNavigate();
    let [size, setSize] = useState();
    let [allThreeCatArr, setAllThreeCatArr] = useState([]);
    let [secondLvlCatProArr, setSecondLvlCatProArr] = useState([]);
    let [productDetailsDataState, setProductDetailsData] = useState();
    let [barData, setBarData] = useState([]);
    let [totalReviews, setTotalReviews] = useState(0);
    let [ratingAvg, setRatingAvg] = useState(0);
    let [productRatingsDetails, setproductRatingsDetails] = useState([]);
    const { addToCart } = useCart();

    // Fetch single product data
    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                let response = await axios.post(`${backendURL}/api/product/single`, { productId });
                if (response.data.success) {
                    const productData = response.data.singleProduct;
                    setSingleProduct(productData);

                    const filteredProducts = response?.data?.findedFilteredProducts || [];

                    const sameThirdLevelArr = filteredProducts
                        .filter(
                            (item) =>
                                item?.thirdLevelCategory === productData?.thirdLevelCategory &&
                                item?._id !== productId
                        )
                        .slice(0, 4);

                    const sameSecondLevelArr = filteredProducts.filter(
                        (product) =>
                            product?.secondLevelCategory === productData?.secondLevelCategory &&
                            product._id !== productId
                    );

                    setAllThreeCatArr(sameThirdLevelArr);
                    setSecondLvlCatProArr(sameSecondLevelArr);
                    setSize("");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        if (productId) {
            getSingleProduct();
        }

    }, [productId, backendURL]);


    const handleAddToCart = async () => {
        if (!size) {
            toast.error("Please select a size first");
            return;
        }

        const success = await addToCart(productId, size, 1);
        if (success) {
            navigate("/cart");
        }
    }

    // FIXED: Always show minimum rating (1 star) when no reviews exist
    useEffect(() => {
        if (singleProduct) {
            if (singleProduct.ratingsAndReviews?.length > 0) {
                let sum = 0;
                let excProArr = [];
                let veryGoodProArr = [];
                let goodProArr = [];
                let avgProArr = [];
                let poorProArr = [];

                singleProduct.ratingsAndReviews.forEach((review) => {
                    sum += review.ratings;
                    switch (review.ratings) {
                        case 5: excProArr.push(review); break;
                        case 4: veryGoodProArr.push(review); break;
                        case 3: goodProArr.push(review); break;
                        case 2: avgProArr.push(review); break;
                        case 1: poorProArr.push(review); break;
                        default: break;
                    }
                });

                const averageRating = sum / singleProduct.ratingsAndReviews.length;
                setRatingAvg(averageRating);
                setTotalReviews(singleProduct.ratingsAndReviews.length);

                // Set bar data with actual ratings
                setBarData([
                    { label: 'Excellent', value: excProArr.length, color: '#4caf50' },
                    { label: 'Very Good', value: veryGoodProArr.length, color: '#2e7d32' },
                    { label: 'Good', value: goodProArr.length, color: '#ffeb3b' },
                    { label: 'Average', value: avgProArr.length, color: '#8d6e63' },
                    { label: 'Poor', value: poorProArr.length, color: '#f44336' }
                ]);
            } else {
                // FIXED: Show minimum rating (1 star) when no reviews exist
                setRatingAvg(1); // Minimum possible rating
                setTotalReviews(0);
                // Show empty rating bars for no reviews
                setBarData([
                    { label: 'Excellent', value: 0, color: '#4caf50' },
                    { label: 'Very Good', value: 0, color: '#2e7d32' },
                    { label: 'Good', value: 0, color: '#ffeb3b' },
                    { label: 'Average', value: 0, color: '#8d6e63' },
                    { label: 'Poor', value: 0, color: '#f44336' }
                ]);
            }
        }
    }, [singleProduct]);

    useEffect(() => {
        if (productDetailsData && singleProduct) {
            let ProductsDetailsDataVar = productDetailsData.filter((item) => {
                const itemThirdLevel = item.thirdLevelCategory?.replace(/\s+/g, '').toLowerCase();
                const itemSecondLevel = item.secondLevelCategory?.replace(/\s+/g, '').toLowerCase();
                const singleProductThirdLevel = singleProduct.thirdLevelCategory?.replace(/\s+/g, '').toLowerCase();
                const singleProductSecondLevel = singleProduct.secondLevelCategory?.replace(/\s+/g, '').toLowerCase();

                return itemThirdLevel === singleProductThirdLevel &&
                    itemSecondLevel === singleProductSecondLevel;
            });

            if (ProductsDetailsDataVar.length > 0) {
                setProductDetailsData(ProductsDetailsDataVar[0])
            } else {
                setProductDetailsData(null);
            }
        }
    }, [singleProduct?.thirdLevelCategory, singleProduct?.secondLevelCategory, productDetailsData]);

    useEffect(() => {
        const getProductRatingsDetails = async () => {
            try {
                let response = await axios.post(`${backendURL}/api/product/productRatingsDetails`, { productId });
                if (response?.data?.success) {
                    setproductRatingsDetails(response?.data?.findedProductRatingsDetails)
                } else {
                    toast.error(response?.data?.message)
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

        if (productId) {
            getProductRatingsDetails();
        }
    }, [backendURL, productId])

    return (
        <>
            <div className="singleProductSection">
                <Header />
                <Navbar />
                {/* Breadcrumb Navigation */}
                <div className="breadcrumbContainer">
                    <div className="breadcrumb">
                        <span className="breadcrumbItem">{singleProduct.topLevelCategory}</span>
                        <span className="breadcrumbSeparator">/</span>
                        <span className="breadcrumbItem">{singleProduct.secondLevelCategory}</span>
                        <span className="breadcrumbSeparator">/</span>
                        <span className="breadcrumbItem">{singleProduct.thirdLevelCategory}</span>
                    </div>
                </div>

                {/* Main Product Section */}
                <div className="productMainContainer">
                    <div className="singleProImgGallery">
                        <div className="sinProMainImg">
                            <img src={singleProduct?.imageUrl} alt="no img" />
                        </div>
                        <div className="FimageGallery">
                            {
                                allThreeCatArr?.map((item, index) =>
                                    <Link key={index} className="link" to={`/single/${item._id}`}>
                                        <img src={item?.imageUrl} alt="no img" />
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                    {/* Product Information Section */}
                    <div className="productInfoSection">
                        {/* Brand */}
                        <div className="productBrand">{singleProduct.brand}</div>

                        {/* Product Title */}
                        <h1 className="productTitle">{singleProduct.title}</h1>

                        {/* Pricing */}
                        <div className="productPricing">
                            <span className="currentPrice">{currency}{singleProduct.discountPrice}</span>
                            <span className="originalPrice">{currency}{singleProduct.price}</span>
                            <span className="discountBadge">{singleProduct.discountPercentage}% Off</span>
                        </div>

                        {/* Ratings - FIXED: Always show at least 1 star (minimum rating) */}
                        <div className="productRatings">
                            <div className="starRating">
                                <StarRating ratingAvg={ratingAvg} />
                            </div>
                            <span className="ratingsCount">{ratingAvg.toFixed(1)} Rating</span>
                            <span className="reviewsCount">{totalReviews} Reviews</span>
                        </div>

                        {/* Size Selection */}
                        <div className="sizeSelection">
                            <h3 className="sizeLabel">Sizes</h3>
                            <div className="sizeButtons">
                                {singleProduct?.sizes?.map((sizeItem, index) => (
                                    <button
                                        key={index}
                                        className={`sizeButton ${sizeItem.sizeName === size ? 'selected' : ''}`}
                                        onClick={() => setSize(sizeItem.sizeName)}
                                    >
                                        {sizeItem.sizeName}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="addToCartButton" onClick={handleAddToCart}>
                            ADD TO CART
                        </button>

                        {/* Product Description */}
                        <div className="productDescription">
                            <p>{singleProduct?.description}</p>
                        </div>

                        {/* Highlights */}
                        <div className="highlightsSection">
                            <h3 className="highlightsTitle">Highlights</h3>
                            <ul className="highlightsList">
                                {
                                    productDetailsDataState?.Heighlights?.map((items, index) =>
                                        <li key={index}>{items}</li>
                                    )
                                }
                            </ul>
                        </div>

                        {/* Details */}
                        <div className="detailsSection">
                            <h3 className="detailsTitle">Details</h3>
                            <p className="detailsText">
                                {productDetailsDataState?.Details}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews and Ratings Section */}
                <div className="reviewsSection">
                    <h2 className="sinProPageTitle recentReviewsTitle">Recent Review & Ratings</h2>
                    <div className="reviewsContainer">
                        <div className="recentReviews">
                            <div className="reviewsList">
                                {productRatingsDetails?.length > 0 ? (
                                    productRatingsDetails.map((item, index) =>
                                        <div key={index} className="ProSinReviewAndRater">
                                            <div className="navProfilePic">
                                                {
                                                    item?.raterId?.profilePic === "" || !item?.raterId?.profilePic ?
                                                        <div className="NavprofilePic">
                                                            <p>{item?.raterId?.username?.charAt(0).toUpperCase()}</p>
                                                        </div>
                                                        :
                                                        <div className="profilePicImgDiv">
                                                            <img src={item?.raterId?.profilePic} alt="no img" />
                                                        </div>
                                                }
                                            </div>
                                            <div className="raterDetails">
                                                <p className="raterName">{item?.raterId?.username}</p>
                                                <p className="rateDate">
                                                    {new Date(
                                                        new Date(item?.updatedAt).getTime() + 3 * 24 * 60 * 60 * 1000
                                                    ).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })}
                                                </p>
                                                <div className="raterDetStartRate">
                                                    <StarRating ratingAvg={item?.ratings} />
                                                </div>
                                                <div className="ratingDesAndTitleDiv">
                                                    <p className="ratingTitle">Title: {item?.title}</p>
                                                    <p className="ratingDescription">Description: {item?.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="noReviewsMessage">
                                        No reviews yet for this product.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="productRatingsSummaryS">
                            <h3 className="ratingsSummaryTitle">Product Ratings</h3>
                            {/* FIXED: Always show rating summary with at least 1 star */}
                            <div className="overallRating">
                                <div className="ratingStars">
                                    <StarRating ratingAvg={ratingAvg} />
                                </div>
                                <span className="totalRatingsCount">{totalReviews} Reviews</span>
                            </div>
                            <RatingBars barData={barData} />
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                <div className="similarProductsSection">
                    <h2 className="sinProPageTitle similarProductsTitle">Similar Products</h2>
                    <div className="similarProductsGrid">
                        {
                            secondLvlCatProArr?.map((item, index) =>
                                <Product
                                    key={index}
                                    imageUrl={item?.imageUrl}
                                    brand={item?.brand}
                                    title={item?.title}
                                    productId={item?._id}
                                />
                            )
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}