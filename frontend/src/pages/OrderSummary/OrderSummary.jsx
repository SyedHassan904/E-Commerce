import "./orderSummary.css"
import shopContext from "../../context/shopContext.js"
import React, { useContext, useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Progress from "../../components/Progress/Progress.jsx"
import { toast } from "react-toastify"
import axios from "axios"
export default function OrderSummary() {
    const { backendURL,setLoginPopup, setCartQuantity, setTotalPrice, setTotalDiscount, totalPrice, totalDiscount, setTotalAmount, currency, totalAmount, isOrderSummary, isLogin, isPayment, isDeliveryAddress, setLocation,deliveryCharges, token } = useContext(shopContext);
    const [singleOrder, setSingleOrder] = useState(null);
    const [singleOrderCartProducts, setSingleOrderCartProducts] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    // const [singleOrderId, setSingleOrderId] = useState("");
    const [totalCartItems, setTotalCartItems] = useState(0);
    let { orderId } = useParams();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const getSingleOrder = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/order/single/${orderId}`);
                if (response.data.success) {
                    setSingleOrder(response.data.findedSingleOrder);
                    // setSingleOrderId(response.data.findedSingleOrder._id);
                    let cartQuantity = 0;
                    let priceSum = 0;
                    let totalDis = 0;
                    setSingleOrderCartProducts(response?.data?.findedSingleOrder?.orderCartProducts);
                    setTotalCartItems(response?.data?.findedSingleOrder?.orderCartProducts?.length);
                    singleOrderCartProducts?.forEach((cd) => {
                        cartQuantity += cd.quantity;
                        priceSum += cd.cartProducts.price * cd.quantity;
                        totalDis += cd.cartProducts.discountPrice * cd.quantity;
                    })
                    setCartQuantity(cartQuantity);
                    setTotalPrice(priceSum);
                    setTotalDiscount(totalDis);
                    setTotalAmount(totalPrice - totalDiscount);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getSingleOrder();
    }, [backendURL, orderId, setCartQuantity, setTotalAmount, setTotalDiscount, setTotalPrice, singleOrderCartProducts, totalDiscount, totalPrice]);


    useEffect(() => {
        setLocation(location.pathname);
    }, [location.pathname, setLocation]);

    useEffect(() =>{
            if(!token || token === ""){
                navigate("/")
                setLoginPopup(true)
            }
        }, [token]);

    const handlePayment = async (paymentMethod) => {
        try {
            let payload = {
                orderId,
                paymentMethod,
            }
            switch (paymentMethod) {
                case "cod":
                    let response = await axios.post(`${backendURL}/api/order/payment/cod`, payload, { headers: { "token": token } });
                    if (response.data.success) {
                        // toast.success(response.data.message);
                        navigate(`/singleOrder/${orderId}`)
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                case "easyPaisa":
                    response = await axios.post(`${backendURL}/api/order/payment/easyPaisa`, payload, { headers: { "token": token } });
                    if (response.data.success) {
                        // toast.success(response.data.message);
                        navigate(`/singleOrder/${orderId}`)
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                case "payoneer":
                    response = await axios.post(`${backendURL}/api/order/payment/payoneer`, payload, { headers: { "token": token } });
                    if (response.data.success) {
                        // toast.success(response.data.message);
                        navigate(`/singleOrder/${orderId}`)
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="orderDetailsPage">
                <Header />
                <Navbar />
                <div className="orderDetailsSection">
                    <Progress isDeliveryAddress={isDeliveryAddress} isLogin={isLogin} isPayment={isPayment} isOrderSummary={isOrderSummary} />
                    <button onClick={() => navigate("/checkout")} className="backBtn">BACK</button>
                    <div className="orderDetailsContainer">
                        {/* Customer Details Section (Left) */}
                        <div className="orderUserDetails">
                            <p className="ordererName">
                                <span className="ordererFirstName">{singleOrder?.username}</span>
                                <span className="ordererLastName">{singleOrder?.lastName}</span>
                            </p>
                            <p className="ordererAddress">{singleOrder?.address}</p>
                            <p className="ordererNumberHead">Phone Number</p>
                            <p className="ordererAddress">{singleOrder?.phoneNumber}</p>
                        </div>

                        {/* Cart Items Section (Middle) */}
                        <div className="orderSummaryAndContainerSection">
                            <div className="userAllOrdersData">
                                {singleOrderCartProducts?.length > 0 ? (
                                    singleOrderCartProducts.map((singleOrderProducts) => (
                                        <div key={singleOrderProducts._id} className="singleOrderCartProduct">
                                            <div className="sinOrdCarProImg">
                                                <img src={singleOrderProducts?.cartProducts?.imageUrl} alt={singleOrderProducts?.cartProducts?.title} />
                                            </div>

                                            <div className="sinOrderProductContent">
                                                <h3 className="sinOrderProName">{singleOrderProducts?.cartProducts?.title}</h3>
                                                <div className="sinOrderSizeAndColor">
                                                    <p>Size: {singleOrderProducts?.size}, {singleOrderProducts?.cartProducts?.color}</p>
                                                </div>

                                                <p className="orderBrand">Seller: <span>{singleOrderProducts?.cartProducts?.brand}</span></p>

                                                <div className="singleOrderPriceDiv">
                                                    <p className="sinOrdDis">{currency}{singleOrderProducts?.cartProducts?.price}</p>
                                                    <p className="sinOrdPrice">{currency}{singleOrderProducts?.cartProducts?.discountPrice}</p>
                                                    <p className="sinOrdPrcPer">{singleOrderProducts?.cartProducts?.discountPercentage}% off</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty">No items in this order</div>
                                )}
                            </div>

                            {/* Price Details Section (Right) */}
                            <div className="userordersSummary">
                                <p className="pDetPara">PRICE DETAILS</p>
                                <div className="priceDetailsDiv">
                                    <div className="crtSmallDiv cartPriceDiv">
                                        <p className="cpdPara totalCartItemsPara">Price ({totalCartItems} item{totalCartItems !== 1 ? 's' : ''})</p>
                                        <p className="totalCartPrice">{currency}{totalPrice}</p>
                                    </div>

                                    <div className="crtSmallDiv cartDiscountDiv">
                                        <p className="cpdPara">Discount</p>
                                        <p className="cpdPara green">{currency}-{totalDiscount}</p>
                                    </div>

                                    <div className="crtSmallDiv crtDeliveryChDiv">
                                        <p className="cpdPara">Delivery Charges</p>
                                        <p className="green">{deliveryCharges === 0? <span>Free</span>:<span>{currency}{deliveryCharges}</span>}</p>
                                    </div>
                                </div>

                                <div className="cartTotalAmountDiv">
                                    <div className="totalAmSmDiv">
                                        <p className="toSmDivBold">Total Amount</p>
                                        <p className="boldPlusGreen">{currency}{totalAmount}</p>
                                    </div>

                                    <div className="paymentSection">
                                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} id="paymentSelect">
                                            <option disabled value="">- Select Payment Method -</option>
                                            <option value="cod">Cash On Delivery</option>
                                            <option value="easyPaisa">Easy Paisa</option>
                                            <option value="payoneer">Payoneer</option>
                                        </select>
                                        <button
                                            className="purpleBtn"
                                            onClick={() => handlePayment(paymentMethod)}
                                            disabled={paymentMethod === ""}
                                        >
                                            PAYMENT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}