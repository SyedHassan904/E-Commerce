import React from "react";
import "./carousel.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const items = [
        { 
            id: 1, 
            imgSource: "https://mir-cdn.behance.net/v1/rendition/project_modules/max_632_webp/8ed56b213514141.67478c4adb664.png"
           
        },
        { 
            id: 2, 
            imgSource: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/e67f91213514141.67478c4ade992.png"
        },
        { 
            id: 3, 
            imgSource: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9b4bee213514141.67478c4adb018.png"
        },
        { 
            id: 4, 
            imgSource: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2b3b39213514141.67478c4ade213.png"
        },
        { 
            id: 5, 
            imgSource: "https://i.pinimg.com/1200x/d0/78/70/d078705c172a131d88c67bd19986172d.jpg"
        },
        // { 
        //     id: 6, 
        //     imgSource: "https://elements-resized.envatousercontent.com/elements-cover-images/f20de6fb-333d-4dcc-af4e-5f50fb58105e?w=2038&cf_fit=scale-down&q=85&format=auto&s=3a9654408eaf70036c42361b665e85de163b82627c0f2f8fa1e33445bc451575"
        // },
        { 
            id: 6, 
            imgSource: "https://i.pinimg.com/1200x/75/84/9d/75849de90faf33be26a30d389a3e7657.jpg"
        },
        { 
            id: 7, 
            imgSource: "https://i.pinimg.com/1200x/00/1e/dd/001eddfc4ae1cf9b78cd4bb242a8d3b2.jpg"
        },
    ];

    // Slick slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div className="carouselComp">
            <Slider {...settings}>
                {items.map((item) => (
                    <div key={item.id} className="imgDivCaros">
                        <img id="carouselImg" src={item.imgSource} alt={`Carousel Image ${item.id}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}