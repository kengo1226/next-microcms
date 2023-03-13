import React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Hero from '../components/Hero';
import utilStyles from '../styles/utils.module.css';
// import swiper
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Pagination, Navigation} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Pagination, Navigation]);

// Slider images
const images = [
    '/images/blog_bg.jpg',
    '/images/home_bg.jpg',
    '/images/bg.jpg',
]

function gallery() {
  return (
    <Layout>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <Hero />
        <div>
            <h2>Our Farm</h2>
            <Swiper
                sliderPerView={2}
                pagination={{
                    clickable: true,
                }}
                navigation
                loop={true}
            >
                {images.map((src, index) => {
                    return(
                        <SwiperSlide key={`${index}`}>
                            <Image
                                src={src}
                                layout="responsive"
                                width={440}
                                height={300}
                                alt="test-slide"
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    </Layout>
  )
}

export default gallery