import "./productCard.css"
import React, {useContext} from "react"
import shopContext from "../../context/shopContext.js"
import { Link } from "react-router-dom"
export default function ProductCard({ 
    imageUrl, 
    brand, 
    title, 
    color, 
    price, 
    discountPrice, 
    discountPercentage, 
    productId 
}) 
{
const {currency} = useContext(shopContext)

    return (
        <>
            <Link className="productCardLink" to={`/single/${productId}`}>
                <div className="productCard">
                    <div className="productCardImageBox">
                        <img src={imageUrl} alt={title} />
                    </div>
                    
                    <div className="productCardContent">
                        <div className="productCardBrand">{brand}</div>
                        <div className="productCardTitle">{title}</div>
                        <div className="productCardColor">{color}</div>
                        
                        <div className="productCardPricing">
                            <div className="currentPrice">{currency}{discountPrice}</div>
                            <div className="originalPrice">{currency}{price}</div>
                            <div className="discountPercentage">{discountPercentage}% off</div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
