import "./checkout.css"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Progress from "../../components/Progress/Progress.jsx"
import TextField from '@mui/material/TextField';
import shopContext from "../../context/shopContext.js"
import { useNavigate, useLocation } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { useCart } from "../../hooks/useCart.js"
export default function Checkout() {
    const { backendURL, isDeliveryAddress, isLogin, isPayment, isOrderSummary, setLocation, token, profileData } = useContext(shopContext);
    const {fetchCart} = useCart();
    const navigate = useNavigate();
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [zipCode, setZipCode] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    const onSubmitOrderHandler = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!firstName || !lastName || !address || !city || !state || !zipCode || !phoneNumber) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!profileData?._id) {
            toast.error("User not found. Please login again.");
            return;
        }

        try {
            let payload = {
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode: parseInt(zipCode),
                phoneNumber: parseInt(phoneNumber),
                userId: profileData._id
            }
            
            let response = await axios.post(`${backendURL}/api/order/place`, payload, { headers: { token: token } });
            if (response.data.success) {
                fetchCart()
                navigate(`/orderSummary/${response.data.orderId}`)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Order placement error:", error);
            if (error.response?.status === 400) {
                toast.error(error.response.data.message || "Invalid data provided");
            } else if (error.response?.status === 404) {
                toast.error("User not found. Please login again.");
            } else {
                toast.error(error.message || "Failed to place order");
            }
        }
    }

    let location = useLocation();
    useEffect(() => {
        setLocation(location.pathname);
    }, [location.pathname, setLocation])

    return (
        <>
            <div className="checkOutPage">
                <Header />
                <Navbar />
                <div className="checkOutPageSection">
                    {/* Progress Section */}
                    <Progress isDeliveryAddress={isDeliveryAddress} isLogin={isLogin} isPayment={isPayment} isOrderSummary={isOrderSummary} />
                    <div className="checkoutMainContent">
                        <button onClick={() => navigate("/cart")} className="backBtn" id="orderSummaryBackBtn">BACK</button>

                        <div className="orderSummaryFormSection">
                            <div className="orderSummaryBlankSec"></div>

                            <form onSubmit={(e) => onSubmitOrderHandler(e)} id="orderSummaryForm">
                                <div className="orderSummFormFieldRow">
                                    <TextField
                                        label="First Name *"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                    />
                                    <TextField
                                        label="Last Name *"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName}
                                    />
                                </div>
                                <TextField
                                    label="Address *"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={1}
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    required
                                />
                                <div className="orderSummFormFieldRow">
                                    <TextField
                                        label="City *"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setCity(e.target.value)}
                                        value={city}
                                    />
                                    <TextField
                                        label="State/Province/Region *"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setState(e.target.value)}
                                        value={state}
                                    />
                                </div>
                                <div className="orderSummFormFieldRow">
                                    <TextField
                                        label="Zip / Postal Code *"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setZipCode(e.target.value)}
                                        value={zipCode}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*'
                                        }}
                                    />
                                    <TextField
                                        label="Phone Number *"
                                        variant="outlined"
                                        fullWidth
                                        type="tel"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        value={phoneNumber}
                                    />
                                </div>
                                <button id="orderSummaryDeliverBtn" type="submit">DELIVERED HERE</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}