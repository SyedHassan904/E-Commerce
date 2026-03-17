import "./orderDetails.css"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import shopContext from "../../context/shopContext.js";
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import StarIcon from '@mui/icons-material/Star';
import SingleOrderProgress from "../../components/SingleOrderProgress/SingleOrderProgress.jsx"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export default function OrderDetailsProgress() {
    const { orderId } = useParams();
    const [singleOrderDetails, setSingleOrderDetails] = useState([]);
    const { backendURL,setLoginPopup,currency, token } = useContext(shopContext);
    const [orderStatusOD, setOrderStatusOD] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getSingleOrderDetails = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/order/single/${orderId}`);
                if (response.data.success) {
                    setSingleOrderDetails(response.data.findedSingleOrder);
                    setOrderStatusOD(response?.data?.findedSingleOrder?.status);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getSingleOrderDetails();
    }, [backendURL, orderId]);

    const handleCancelOrder = async () => {
        try {
            let payload = {
                orderId,
            }
            let response = await axios.post(`${backendURL}/api/order/cancel`, payload, { headers: { token: token } });
            if (response.data.success) {
                toast.success(response.data.message);
                // Refresh order details after cancellation
                const refreshResponse = await axios.get(`${backendURL}/api/order/single/${orderId}`);
                if (refreshResponse.data.success) {
                    setSingleOrderDetails(refreshResponse.data.findedSingleOrder);
                    setOrderStatusOD(refreshResponse?.data?.findedSingleOrder?.status);
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleRateAndReview = (productId) => {
        navigate(`/rate/${productId}`);
    }

    useEffect(() =>{
            if(!token || token === ""){
                navigate("/")
                setLoginPopup(true)
            }
        }, [token]);

    return (
        <>
            <div className="orderDetailsProgressPage">
                <Header />
                <Navbar />
                <div className="orderDetContainer">
                    {
                        singleOrderDetails && (
                            <div className="orderUserDetails">
                                <h3>Delivery Address</h3>
                                <p className="ordererNameOD">
                                    <span className="ordererFirstNameOD">{singleOrderDetails?.username}</span> 
                                    <span className="ordererLastNameOD">{singleOrderDetails?.lastName}</span>
                                </p>
                                <p className="ordererAddress">{singleOrderDetails?.address}</p>
                                <p className="ordererNumberHeadOD">Phone Number</p>
                                <p className="ordererAddress">{singleOrderDetails?.phoneNumber}</p>
                            </div>
                        )
                    }

                    {/* Order Details Progress */}
                    <div className="singleOrderProgressSectionDiv">
                        <SingleOrderProgress orderStatus={orderStatusOD} />
                        {orderStatusOD !== "cancelled" && orderStatusOD !== "delivered" && (
                            <button onClick={handleCancelOrder} id="cancelOrderBtn">Cancel Order</button>
                        )}
                    </div>
                    
                    <div className="orderDetailsProducts">
                        {singleOrderDetails?.orderCartProducts?.map((item) => (
                            <div key={item._id} className="singOrderDetContainer">
                                <div className="sinODetImgAndContent">
                                    <div className="sonOrderDetImgDiv">
                                        <img src={item?.cartProducts?.imageUrl} alt={item?.cartProducts?.title} />
                                    </div>

                                    <div className="singOrderContentOD">
                                        <div className="sinOrderODTitle">
                                            <p>{item?.cartProducts?.title}</p>
                                        </div>
                                        <div className="orDetSizeCol">
                                            <p className="colPara">
                                                Color:
                                                <span>{item?.cartProducts?.color}</span>
                                            </p>

                                            <p className="orDetSizPar">
                                                Size:
                                                <span>{item?.size}</span>
                                            </p>
                                        </div>

                                        <p className="orderDetSeller">
                                            Seller : <span>{item?.cartProducts?.brand}</span>
                                        </p>

                                        <p className="sinOrDetPrice">
                                            {currency}
                                            <span>
                                                {item?.cartProducts?.price}
                                            </span>
                                        </p>

                                        {/* Quantity */}
                                        <p className="orderDetQuantity">
                                            Quantity: <span>{item?.quantity}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* ALWAYS show rate & review button */}
                                <div className="rateReviewSection">
                                    <div 
                                        onClick={() => handleRateAndReview(item?.cartProducts?._id)} 
                                        className="rateAndReviewBtn"
                                    >
                                        <StarIcon style={{ color: "#473680" }} className="starIcoOD" />
                                        <p>Rate & Review Product</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}