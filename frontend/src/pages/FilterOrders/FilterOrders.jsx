import "./filterOrder.css"
import shopContext from "../../context/shopContext.js"
import React, { useContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import StatusDate from "../../components/StatusDate/StatusDate.jsx"
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
export default function FilterOrders() {
    const { backendURL,setLoginPopup, currency, token } = useContext(shopContext);
    let [userFilterOrderData, setUserFilterOrderData] = useState([]);
    let [orderStatus, setOrderStatus] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getUserAllOrders = async () => {
            let payload = { orderStatus };
    
            try {
                let response = await axios.post(`${backendURL}/api/order/filterOrder`, payload, {
                    headers: { token },
                });
                if (response.data.success) {
                    setUserFilterOrderData(response.data.userFilteredOrders);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };
    
        if (token) getUserAllOrders();
    }, [backendURL, token, orderStatus]);

    const handleOrderStatus = (e) => {
        let value = e.target.value;
        let statusSuccess = true;
        for (let i = 0; i < orderStatus.length; i++) {
            if (orderStatus[i] === value) {
                statusSuccess = false;
                break;
            }
        }
        if (statusSuccess === true) {
            setOrderStatus((prev) => [...prev, value]);
        } else {
            setOrderStatus(orderStatus.filter((status) => status !== value));
        }
    }

    useEffect(() =>{
            if(!token || token === ""){
                navigate("/")
                setLoginPopup(true)
            }
        }, [token]);

    return (
        <>
            <div className="filterOrdersPage">
                <Header />
                <Navbar />
                <div className="filterOrderSection">
                    <div className="filterOrdersFilterBox">
                        <h3>Filter</h3>
                        <div className="filterOrderInputFieldContainer">
                        <p className="orderStatusParaHead">Order Status</p>
                            <div className="filterOrderInpFiled">
                                <input onChange={(e) => handleOrderStatus(e)} type="checkbox" value={"shipped"} />
                                <p>On The Way</p>
                            </div>
                            <div className="filterOrderInpFiled">
                                <input onChange={(e) => handleOrderStatus(e)} type="checkbox" value={"delivered"} />
                                <p>Delivered</p>
                            </div>
                            <div className="filterOrderInpFiled">
                                <input onChange={(e) => handleOrderStatus(e)} type="checkbox" value={"cancelled"} />
                                <p>Cancelled</p>
                            </div>
                            <div className="filterOrderInpFiled">
                                <input onChange={(e) => handleOrderStatus(e)} type="checkbox" value={"returned"} />
                                <p>Returned</p>
                            </div>
                        </div>
                    </div>
                        <div className="userAllOrdersContainer">
                            {
                                [...userFilterOrderData]?.reverse().map((filterOrderData) => {
                                    return filterOrderData?.orderCartProducts?.map((order) =>
                                        <Link key={order._id} className="link" to={`/orderDetails/${filterOrderData._id}`}>
                                            <div className="filterOrderSingleOrder">
                                                <div className="filterOrderImgAndContent">
                                                    <div className="filterOrderImg">
                                                        <img src={order?.cartProducts?.imageUrl} alt="no img" />
                                                    </div>

                                                    <div className="filOrContentDiv">
                                                        <p className="filterOrderTitle">
                                                            {order?.cartProducts?.title}
                                                        </p>

                                                        <p className="filterOrderSizes">
                                                            Size:
                                                            {/* {
                                                                order?.cartProducts?.size?.map((sizeItem) =>
                                                                    <span key={sizeItem._id}>{sizeItem.sizeName}</span>
                                                                )
                                                            } */}
                                                            {order?.size}
                                                        </p>
                                                    </div>
                                                </div>


                                                <p className="filterOrderPrice">
                                                    {currency}
                                                    <span>{order?.cartProducts?.price}</span>
                                                </p>

                                                {/* Status Div */}
                                                <StatusDate data={filterOrderData} type={"filterOrdersPage"} status={filterOrderData?.status} />
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                </div>
                <Footer />
            </div>
        </>
    )
}