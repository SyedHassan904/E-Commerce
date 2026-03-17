import "./navbar.css"
import shopContext from "../../context/shopContext.js"
import React, { useState, useEffect, useContext, useRef } from "react"
import assets from "../../assets/assetsFile.js"
import { womenData, navListData, menData, companyData, storesData, navBottomListData } from "./navContent.js"
import { useNavigate, useLocation } from "react-router-dom"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
    const [navState, setNavState] = useState("");
    const [navData, setNavData] = useState([]);
    const [navBottomData, setNavBottomData] = useState([]);
    const [navOpen, setNavOpen] = useState(false);
    const [navMenu, setNavMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isDesktopViewport, setIsDesktopViewport] = useState(false);
    
    const { 
        cartQuantity, 
        profileData, 
        token, 
        setLoginPopup, 
        setToken, 
        searchTerm, 
        setSearchTerm 
    } = useContext(shopContext);
    const navbarRef = useRef(null);
    const navMenuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle click outside to close dropdowns/menus
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setNavOpen(false);
                setNavState("");
                setSearchOpen(false);
            }

            if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
                setNavMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        switch (navState) {
            case "women":
                setNavData(womenData);
                setNavBottomData(navBottomListData.filter((item) => item.topLevelCategory === navState));
                setNavOpen(true);
                break;
            case "men":
                setNavData(menData);
                setNavBottomData(navBottomListData.filter((item) => item.topLevelCategory === navState));
                setNavOpen(true);
                break;
            case "company":
                setNavData(companyData);
                setNavBottomData(navBottomListData.filter((item) => item.topLevelCategory === navState));
                setNavOpen(true);
                break;
            case "stores":
                setNavData(storesData);
                setNavBottomData(navBottomListData.filter((item) => item.category === navState));
                setNavOpen(true);
                break;
            default:
                setNavOpen(false);
                break;
        }
    }, [navState]);

    // FIXED: Only clear search when NOT on product category pages
    useEffect(() => {
        setSearchOpen(false);
        
        // Only clear search term if we're navigating away from product category pages entirely
        if (!location.pathname.includes("/productCategory")) {
            setSearchTerm("");
        }
    }, [location, setSearchTerm]);

    // Close search on ESC
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSearchOpen(false);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    // Track viewport to decide where to render search
    useEffect(() => {
        const setFromWidth = () => setIsDesktopViewport(window.innerWidth >= 1024);
        setFromWidth();
        window.addEventListener('resize', setFromWidth);
        return () => window.removeEventListener('resize', setFromWidth);
    }, []);

    const handleNavClick = (navItem) => {
        if (navState === navItem) {
            setNavState("");
            setNavOpen(false);
        } else {
            setNavState(navItem);
        }
    };

    const navDataHandler = (topLevelCategory, secondLevelCategory, thirdLevelCategory) => {
        setNavOpen(false);
        setNavState("");
        navigate(`/productCategory/${topLevelCategory}/${secondLevelCategory}/${thirdLevelCategory}`);
    }

    const handleSearch = () => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm === "") return;
        
        const encodedSearchTerm = encodeURIComponent(trimmedSearchTerm);
        navigate(`/productCategory/search/${encodedSearchTerm}`);
        setSearchOpen(false);
        // DON'T clear searchTerm here - let the ProductCategory page handle it
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleNavigate = (page) => {
        switch (page) {
            case "profile":
                setNavMenu(false);
                navigate("/");
                break;
            case "filterOrders":
                setNavMenu(false);
                navigate("/filterOrders");
                break;
            default:
                break;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        setNavMenu(false);
        navigate("/");
        setLoginPopup(true)
    }

    return (
        <>
            <nav id="navbar" ref={navbarRef}>
                <div className="navTop">
                    <div className="navLeftSection">
                        <img 
                            src={assets.logo} 
                            alt="no img" 
                            className="logo-img"
                            onClick={() => navigate("/")}
                        />
                        <ul className="navDesktopMenu">
                            {navListData.map((item) =>
                                <li 
                                    onClick={() => handleNavClick(item?.title)} 
                                    key={item._id} 
                                    className={navState === item?.title ? "navListItem underLine" : "navListItem"}
                                >
                                    {item?.title}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="navProfileSection">
                        <button 
                            className="hamburgerMenu" 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={mobileMenuOpen ? "hamburgerLine active" : "hamburgerLine"}></span>
                            <span className={mobileMenuOpen ? "hamburgerLine active" : "hamburgerLine"}></span>
                            <span className={mobileMenuOpen ? "hamburgerLine active" : "hamburgerLine"}></span>
                        </button>
                        
                        <div className="navMenuContainer" ref={navMenuRef}>
                            {token === "" ? (
                                <button onClick={() => setLoginPopup(true)} className="navSignInBtn">Sign in</button>
                            ) : profileData?.profilePic === "" || !profileData?.profilePic ? (
                                <div onClick={() => setNavMenu(true)} className="NavprofilePic">
                                    <p>{profileData?.username?.charAt(0).toUpperCase()}</p>
                                </div>
                            ) : (
                                <div onClick={() => setNavMenu(true)} className="profilePicImgDiv">
                                    <img src={profileData?.profilePic} alt="no img" />
                                </div>
                            )}

                            {navMenu && (
                                <div className="navMenuBox">
                                    <p onClick={() => handleNavigate("profile")} className="menuBoxListItem">Profile</p>
                                    <p onClick={() => handleNavigate("filterOrders")} className="menuBoxListItem">My Orders</p>
                                    <p onClick={() => handleLogout()} className="menuBoxListItem">Logout</p>
                                </div>
                            )}
                        </div>

                        {/* Search Trigger + Desktop inline search */}
                        <div className="searchContainer">
                            <img 
                                src={assets.searchLine} 
                                alt="Search" 
                                className="searchIcon"
                                onClick={() => setSearchOpen((v) => !v)}
                            />
                            {searchOpen && isDesktopViewport && (
                                <div className="searchInlineDesktop" role="search" aria-label="Site search">
                                    <SearchIcon className="searchLeadingIcon" aria-hidden="true" />
                                    <input
                                        type="text"
                                        placeholder="Search for products, categories, brands..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        autoFocus
                                        className="searchInput"
                                        aria-label="Search input"
                                    />
                                    <button onClick={handleSearch} className="searchSubmitBtn" aria-label="Submit search">
                                        <SearchIcon />
                                    </button>
                                    <button onClick={() => setSearchOpen(false)} className="searchCloseBtn" aria-label="Close search">
                                        <CloseIcon />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div onClick={() => navigate("/cart")} className="anvCartDiv">
                            <ShoppingBagOutlinedIcon />
                            <p className="navCartQuantityPara">{cartQuantity}</p>
                        </div>
                    </div>
                </div>

                {/* Inline Search Row below navbar */}
                {!isDesktopViewport && searchOpen && (
                    <div className="searchRowBelow">
                        <div className="searchRowInner">
                            <SearchIcon className="searchLeadingIcon" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search for products, categories, brands..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                autoFocus
                                className="searchInput"
                                aria-label="Search input"
                            />
                            <button onClick={handleSearch} className="searchSubmitBtn" aria-label="Submit search">
                                <SearchIcon />
                            </button>
                            <button onClick={() => setSearchOpen(false)} className="searchCloseBtn" aria-label="Close search">
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className={`mobileMenuOverlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobileMenu" onClick={(e) => e.stopPropagation()}>
                        <ul className="mobileMenuList">
                            {navListData.map((item) => {
                                const categoryData = navBottomListData.find(cat => cat.topLevelCategory === item.title);
                                const isExpanded = navState === item.title;
                                
                                return (
                                    <li key={item._id} className="mobileMenuCategoryItem">
                                        <div
                                            className="mobileMenuItem"
                                            onClick={() => {
                                                if (isExpanded) {
                                                    setNavState("");
                                                } else {
                                                    setNavState(item.title);
                                                }
                                            }}
                                        >
                                            <span>{item.title}</span>
                                            <span className="mobileMenuExpandIcon">{isExpanded ? '−' : '+'}</span>
                                        </div>
                                        
                                        {isExpanded && categoryData && (
                                            <ul className="mobileSubMenuList">
                                                {categoryData.listItemsContainer.map((container) => (
                                                    <li key={container._id} className="mobileSubMenuCategory">
                                                        <span className="mobileSubMenuTitle">{container.secondLevelCategory}</span>
                                                        <ul className="mobileThirdLevelList">
                                                            {container.listItems.map((thirdItem, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="mobileThirdLevelItem"
                                                                    onClick={() => {
                                                                        navDataHandler(item.title, container.secondLevelCategory, container.values[index]);
                                                                        setMobileMenuOpen(false);
                                                                        setNavState("");
                                                                    }}
                                                                >
                                                                    {thirdItem}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Navbar Bottom */}
                <div className="navBottom">
                    {navOpen && (
                        <div className="mainNavDataDiv">
                            <div className="navBottomListContainer">
                                {navBottomData.map((item) =>
                                    item.listItemsContainer.map((ulItems) =>
                                        <ul key={ulItems._id}>
                                            <h4>{ulItems.secondLevelCategory}</h4>
                                            {ulItems.listItems.map((listItem, index) =>
                                                <li onClick={() => navDataHandler(item.topLevelCategory, ulItems.secondLevelCategory, ulItems.values[index])} key={index}>{listItem}</li>
                                            )}
                                        </ul>
                                    )
                                )}
                            </div>

                            <div className="navBottomImgBoxes">
                                {navData.map((item) =>
                                    <div key={item._id} className="navBottomImgBox">
                                        <img src={item.img} alt="no img" />
                                        <h3>{item.title}</h3>
                                        <button id="shopNow">Shop now</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}