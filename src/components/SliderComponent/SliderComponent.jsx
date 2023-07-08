import React from "react";
import Slider from "react-slick"
import styles from './style.module.css'

const SliderComponent = ({arrImage}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return(
        <div className={styles.slider}>
            <Slider {...settings}>
                {arrImage.map((image) => {
                    return <img key={image} src= {image} alt="slider"/>
                })}
            </Slider>
        </div>
    )
}
export default SliderComponent