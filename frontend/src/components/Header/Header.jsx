import "./header.css"
import React, { useContext } from "react"
import shopContext from "../../context/shopContext"

export default function Header() {
    const { freeDelivery, currency } = useContext(shopContext);
    return (
        <div className="header-banner">
            <p className="header-text">
                Get free delivery on orders over {freeDelivery}{currency}
            </p>
        </div>
    )
}