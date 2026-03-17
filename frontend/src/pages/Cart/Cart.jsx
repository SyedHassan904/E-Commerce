import React, { useContext, useEffect, useState } from "react"
import shopContext from "../../context/shopContext.js"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import axios from "axios"
import { useCart } from "../../hooks/useCart.js" // ADD THIS IMPORT
import "./cart.css"

export default function Cart() {
    const {setTotalPrice,token,backendURL,setUserAllCartItems,setCartQuantity,setTotalDiscount,setTotalAmount} = useContext(shopContext)
    const {
        currency,
        deliveryCharges,
    } = useContext(shopContext);

    const {
        cartItems,
        updateCart,
        removeFromCart,
        fetchCart,
        calculateTotals
    } = useCart();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            setIsLoading(true);
            await fetchCart();
            setIsLoading(false);
        };
        loadCart();
    }, [fetchCart]);

    // Calculate totals using the hook
    const { price: totalPrice, discount: totalDiscount, total: totalAmount } = calculateTotals(cartItems);

    const handleUpdateQuantity = (productId, size, newQuantity) => {
        if (newQuantity < 1) return;
        updateCart(productId, size, newQuantity);
    };

    const handleIncrease = (productId, size, currentQuantity) => {
        updateCart(productId, size, currentQuantity + 1);
    };

    const handleDecrease = (productId, size, currentQuantity) => {
        if (currentQuantity > 1) {
            updateCart(productId, size, currentQuantity - 1);
        }
    };

    const handleRemove = (productId, size) => {
        removeFromCart(productId, size);
    };

    useEffect(() => {
        const fetchCart = async () => {
            if (!token) {
                console.log("No token available, skipping cart fetch");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${backendURL}/api/cart/all`,
                    {},
                    { headers: { "token": token } }
                );
                if (response.data.success) {
                    const cartData = response?.data?.findedUserCartData?.cartData || [];
                    setUserAllCartItems(cartData);

                    const totals = calculateTotals(cartData);
                    setCartQuantity(totals.quantity);
                    setTotalPrice(totals.price);
                    setTotalDiscount(totals.discount);
                    setTotalAmount(totals.total);
                }
            } catch (error) {
                console.log("Cart fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch cart when component mounts
        fetchCart();

        // Also fetch cart when page becomes visible again (navigation back)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchCart();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [backendURL, token]);

    return (
        <>
            <div className="cartPage">
                <Header />
                <Navbar />
                {/* Main Cart Content */}
                <div className="cartMainContent">
                    <div className="cartContainer">
                        {/* Loading State */}
                        {isLoading ? (
                            <div className="loadingContainer">
                                <div className="loadingSpinner">Loading cart...</div>
                            </div>
                        ) : (
                            <>
                                {/* Cart Items Section */}
                                <div className="cartItemsSection">
                                    {cartItems?.length > 0 ? (
                                        cartItems.map((cartItem) => (
                                            <div key={`${cartItem?.cartProducts?._id}-${cartItem?.size}`} className="cartProDivContainer">
                                                <div className="cartItemCard">
                                                    <div className="cartProImg">
                                                        <img src={cartItem?.cartProducts?.imageUrl} alt={cartItem?.cartProducts?.title} />
                                                    </div>

                                                    <div className="cartProDiv">
                                                        <div className="productDetailsSection">
                                                            <h3 className="productTitle">{cartItem?.cartProducts?.title}</h3>
                                                            <div className="productSpecs">
                                                                <span className="sizeColor">Size: {cartItem?.size}, {cartItem?.cartProducts?.color}</span>
                                                            </div>
                                                            <div className="sellerInfo">
                                                                <span className="sellerLabel">Seller: </span>
                                                                <span className="sellerName">{cartItem?.cartProducts?.brand}</span>
                                                            </div>
                                                            <div className="productPricing">
                                                                <span className="originalPrice">{currency}{cartItem?.cartProducts?.price}</span>
                                                                <span className="currentPrice">{currency}{cartItem?.cartProducts?.discountPrice}</span>
                                                                <span className="discountPercentage">{cartItem?.cartProducts?.discountPercentage}% off</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="quantityControls">
                                                    <div className="quantitySelector">
                                                        <button
                                                            className="quantityBtn minusBtn"
                                                            onClick={() => handleDecrease(cartItem?.cartProducts?._id, cartItem?.size, cartItem?.quantity)}
                                                            disabled={cartItem.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={cartItem.quantity}
                                                            onChange={(e) => handleUpdateQuantity(cartItem?.cartProducts._id, cartItem?.size, parseInt(e.target.value) || 1)}
                                                            className="quantityInput"
                                                            min="1"
                                                        />
                                                        <button
                                                            className="quantityBtn plusBtn"
                                                            onClick={() => handleIncrease(cartItem?.cartProducts?._id, cartItem?.size, cartItem?.quantity)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="removeBtn"
                                                        onClick={() => handleRemove(cartItem?.cartProducts?._id, cartItem?.size)}
                                                    >
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="emptyCartMessage">
                                            <h3>Your cart is empty</h3>
                                            <p>Add some items to get started!</p>
                                        </div>
                                    )}
                                </div>

                                {/* Price Details Section */}
                                <div className="priceDetailsSection">
                                    <div className="priceDetailsCard">
                                        <h3 className="priceDetailsTitle">PRICE DETAILS</h3>

                                        <div className="priceBreakdown">
                                            <div className="priceRow">
                                                <span className="priceLabel">Price ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                                                <span className="priceValue">{currency}{totalPrice}</span>
                                            </div>

                                            <div className="priceRow">
                                                <span className="priceLabel">Discount</span>
                                                <span className="priceValue discount">-{currency}{totalDiscount}</span>
                                            </div>

                                            <div className="priceRow">
                                                <span className="priceLabel">Delivery Charges</span>
                                                <p className="priceValue free">{deliveryCharges === 0 ? <span>Free</span> : <span>{currency}{deliveryCharges}</span>}</p>
                                            </div>
                                        </div>

                                        <div className="totalAmountRow">
                                            <span className="totalAmountLabel">Total Amount</span>
                                            <span className="totalAmountValue">{currency}{totalAmount}</span>
                                        </div>

                                        <button
                                            className="checkoutBtn"
                                            onClick={() => navigate("/checkout")}
                                            disabled={cartItems.length === 0}
                                        >
                                            CHECK OUT
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}