import "./App.css"
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import shopContext from "./context/shopContext.js";
import Home from "./pages/Home/Home.jsx";
import ProductCategory from "./pages/ProductCategory/ProductCategory.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/CheckOutPage/Checkout.jsx"
import OrderSummary from "./pages/OrderSummary/OrderSummary.jsx";
import SingleOrder from "./pages/SingleOrder/SingleOrder.jsx";
import FilterOrders from "./pages/FilterOrders/FilterOrders.jsx";
import OrderDetails from "./pages/OrderDetails/OrderDetails.jsx";
import RatePage from "./pages/RatePage/RatePage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
// Footer Pages
import About from "./footerPages/About/About.jsx";
import Blog from "./footerPages/Blog/Blog.jsx";
import Jobs from "./footerPages/Jobs/Jobs.jsx";
import Press from "./footerPages/Press/Press.jsx"
import Partners from "./footerPages/Partners/Partners.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Marketing from "./footerPages/Marketing/Marketing.jsx";
import Analytics from "./footerPages/Analytics/Analytics.jsx";
import Commerce from "./footerPages/Commerce/Commerce.jsx";
import Insights from "./footerPages/Insights/Insights.jsx";
import Support from "./footerPages/Support/Support.jsx";
import ApiStatus from "./footerPages/ApiStatus/ApiStatus.jsx";
import Claim from "./footerPages/Claim/Claim.jsx"
import Privacy from "./footerPages/Privacy/Privacy.jsx"
import Terms from "./footerPages/Terms/Terms.jsx";
import Protected from "./pages/Protected/Protected.jsx";
import Guides from "./footerPages/Guides/Guides.jsx";
export default function App() {
    const { loginPopup, loginState } = useContext(shopContext)
    return (
        <BrowserRouter>
            {
                loginPopup === true ? (
                    loginState === "register" ?
                        <Register />
                        :
                        <Login />
                )
                    :
                    ""
            }
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/single/:productId" element={<SingleProduct />} />
                <Route path="/productCategory/:topLevelCategory" element={<ProductCategory />} />
                <Route path="/productCategory/:topLevelCategory/:secondLevelCategory" element={<ProductCategory />} />
                <Route path="/productCategory/:topLevelCategory/:secondLevelCategory/:thirdLevelCategory" element={<ProductCategory />} />
                <Route path="/productCategory/search/:searchTerm" element={<ProductCategory />} />
                <Route element={<Protected />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/filterOrders" element={<FilterOrders />} />
                    <Route path="/orderSummary/:orderId" element={<OrderSummary />} />
                    <Route path="orderDetails/:orderId" element={<OrderDetails />} />
                    <Route path="/singleOrder/:orderId" element={<SingleOrder />} />
                    <Route path="/rate/:productId" element={<RatePage />} />
                </Route>
                {/* Footer Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/press" element={<Press />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/marketing" element={<Marketing />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="/commerce" element={<Commerce />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/support" element={<Support />} />
                <Route path="/apiStatus" element={<ApiStatus />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/guides" element={<Guides />} />
            </Routes>
        </BrowserRouter>
    )
}