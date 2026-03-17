import "./footer.css"
import React from "react"
import footerData from "./footerData.js"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <footer id="footer">
                <div className="footerTopSection">
                    {
                        footerData.map((footerUl) =>
                            <ul key={footerUl._id} className="footerUl">
                                <h4 className="footerTitle">{footerUl.title}</h4>
                                {
                                    footerUl.footerListItems.map((footerLi, index) =>
                                        <Link
                                            key={index}
                                            to={`/${footerLi.toLowerCase().replace(/\s+/g, "")}`}
                                            className="link"
                                        >
                                            <li className="footerLink">{footerLi}</li>
                                        </Link>
                                    )
                                }
                            </ul>
                        )
                    }
                </div>

                <div className="footerBottomSection">
                    <div className="footerCredits">
                        <p className="copyrightText">© 2023 My Company. All rights reserved.</p>
                        <p className="madeWithLove">Made with love by Me.</p>
                        <p className="iconCredits">Icons made by <span className="underlineLink">Freepik</span> from <span className="underlineLink"><a className="link" href="https://mui.com/">www.mui.com</a></span></p>
                    </div>

                    {/* <div className="footerBranding">
                        <div className="brandLogo">
                            <div className="owlIcon">🦉</div>
                        </div>
                        <div className="brandText">
                            <div className="brandName">CODE WITH ZOSH</div>
                            <div className="brandYear">2024</div>
                        </div>
                    </div> */}
                </div>
            </footer>
        </>
    )
}