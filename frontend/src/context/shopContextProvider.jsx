// ShopContextProvider.jsx
import shopContext from "./shopContext.js";
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function ShopContextProvider({ children }) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const currency = "PKR";
    const freeDelivery = 100;
    const deliveryCharges = 0;
    const popupRef = useRef();

    // state
    const [cartQuantity, setCartQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [userAllCartItems, setUserAllCartItems] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isDeliveryAddress, setIsDeliveryAddress] = useState(false);
    const [isOrderSummary, setIsOrderSummary] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [location, setLocation] = useState("");
    const [orderIdState, setOrderId] = useState("");
    const [role, setRole] = useState("");
    const [profileData, setProfileData] = useState(null);
    const [loginPopup, setLoginPopup] = useState(false);
    const [loginState, setLoginState] = useState("register");
    const [token, setToken] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Helpers
    const computeTotals = (cartData = []) => {
        let qty = 0;
        let priceSum = 0;
        let discountSum = 0;

        if (!Array.isArray(cartData)) cartData = [];

        cartData.forEach(cd => {
            const itemQty = Math.max(0, parseInt(cd.quantity) || 0);
            const itemPrice = Math.max(0, parseFloat(cd.cartProducts?.price) || 0);
            const itemDiscountPrice = Math.max(0, parseFloat(cd.cartProducts?.discountPrice ?? itemPrice) || 0);

            qty += itemQty;
            priceSum += itemPrice * itemQty;
            discountSum += (itemPrice - itemDiscountPrice) * itemQty;
        });

        const finalAmount = Math.round((priceSum - discountSum) * 100) / 100;

        return {
            quantity: qty,
            price: Math.round(priceSum * 100) / 100,
            discount: Math.round(discountSum * 100) / 100,
            total: finalAmount
        };
    };

    // Recompute totals whenever userAllCartItems changes
    useEffect(() => {
        const totals = computeTotals(userAllCartItems);
        setCartQuantity(totals.quantity);
        setTotalPrice(totals.price);
        setTotalDiscount(totals.discount);
        setTotalAmount(totals.total);
    }, [userAllCartItems]);

    // Fetch cart data on token change
    useEffect(() => {
        const getUserCart = async () => {
            if (!token || token === "") return;

            try {
                const payload = profileData?._id ? { userId: profileData._id } : {};
                const response = await axios.post(`${backendURL}/api/cart/all`, payload, { headers: { token } });

                if (response.data.success) {
                    const cartData = response?.data?.findedUserCartData?.cartData || [];
                    setUserAllCartItems(cartData);
                } else {
                    console.log("Cart fetch failed:", response.data.message);
                    if (response.data.message !== "No Items in the Cart") {
                        toast.error(response.data.message);
                    }
                }
            } catch (error) {
                console.log("getUserCart error:", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.log("Token expired, logging out user");
                    setToken("");
                    setProfileData(null);
                    localStorage.removeItem("token");
                } else {
                    console.log("Cart fetch error:", error.message);
                }
            }
        }

        getUserCart();
    }, [backendURL, token, profileData]);

    // Get profile
    useEffect(() => {
        const getUserProfileData = async () => {
            if (!token || token === "") return;
            try {
                const response = await axios.post(`${backendURL}/api/user/getUserProfile`, {}, { headers: { token } });
                if (response.data.success) {
                    setProfileData(response.data.findedUser);
                    setRole(response?.data?.findedUser?.role)
                }
            } catch (error) {
                console.log("profile fetch error:", error);
            }
        };
        getUserProfileData();
    }, [backendURL, token]);

    // initialize token from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken && token === "") {
            setToken(savedToken);
        }
    }, [token]);

    useEffect(() =>{
        if(token && token!== ""){
            setLoginPopup(false);
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [token]);

    // Set progress states based on current location
    useEffect(() => {
        if (location === "/checkout") {
            setIsDeliveryAddress(true);
            setIsOrderSummary(false);
            setIsPayment(false);
        } else if (location.includes("/orderSummary")) {
            setIsDeliveryAddress(true);
            setIsOrderSummary(true);
            setIsPayment(false);
        } else if (location.includes("/payment") || location.includes("/orderDetails")) {
            setIsDeliveryAddress(true);
            setIsOrderSummary(true);
            setIsPayment(true);
        }
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setLoginPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setLoginPopup]);

    const handleLogout = () => {
        setToken("");
        setRole("");
        setProfileData(null);
        setIsLogin(false);
        setCartQuantity(0);
        setTotalPrice(0);
        setTotalDiscount(0);
        setTotalAmount(0);
        setUserAllCartItems([]);
        localStorage.removeItem("token");
    };

    const handleTokenExpiration = () => {
        toast.error("Session expired. Please login again.");
        handleLogout();
    };

    useEffect(() =>{
        if(role && role === "admin"){
            window.location.href="http://localhost:5173"
        }
    } , [role])

    const contextValue = {
        currency,
        freeDelivery,
        backendURL,
        cartQuantity,
        setCartQuantity,
        userAllCartItems,
        setUserAllCartItems,
        totalPrice,
        setTotalPrice,
        totalDiscount,
        setTotalDiscount,
        totalAmount,
        setTotalAmount,
        isLogin,
        setIsLogin,
        isDeliveryAddress,
        setIsDeliveryAddress,
        isOrderSummary,
        setIsOrderSummary,
        isPayment,
        setIsPayment,
        setLocation,
        setOrderId,
        token,
        setToken,
        role,
        setRole,
        profileData,
        loginPopup,
        setLoginPopup,
        loginState,
        setLoginState,
        popupRef,
        handleLogout,
        handleTokenExpiration,
        deliveryCharges,
        searchTerm,
        setSearchTerm,
    }

    return (
        <shopContext.Provider value={contextValue}>
            {children}
        </shopContext.Provider>
    )
}