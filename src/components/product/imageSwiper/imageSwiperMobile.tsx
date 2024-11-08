"use client"
import React, { } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './imageSwiper.css'

import { FreeMode, Pagination } from 'swiper/modules';

interface Props {
    images: string[],
    title: string,
    className?: string
}
export const ImageSwiperMobile = ({ images, title, className }: Props) => {

    return (
        <div className={className}>

            <Swiper
                style={{ width: '100vw', height: '500px' }}
                navigation={true}
                pagination
                modules={[FreeMode, Pagination]}
                className="mySwiper2"
            >
                {images.map((image) =>

                    <SwiperSlide key={image}>
                        <Image
                            key={image} src={`/products/${image}`} alt={title} width={600} height={500}
                            className=''
                        />
                    </SwiperSlide>
                )}

            </Swiper>

        </div>
    )
}
