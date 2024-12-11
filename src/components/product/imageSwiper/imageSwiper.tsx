"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperObject } from 'swiper'
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './imageSwiper.css'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductImage } from '../product-image/product-image'

interface Props {
    images: string[],
    title: string,
    className?: string
}
export const ImageSwiper = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 lg:min-h-[1200px]"
            >
                {images.map((image, index) =>

                    <SwiperSlide key={index}>
                        <ProductImage key={image} src={`${image}`} alt={title}
                            width={1028}
                            height={800}
                            className='rounded-lg lg:max-w-[1228px] object-contain '
                        />

                    </SwiperSlide>
                )}

            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) =>

                    <SwiperSlide key={index}>
                        <ProductImage key={index} src={image} alt={title} width={300} height={300}
                            className='rounded-lg object-fill'
                        />
                    </SwiperSlide>
                )
                }
            </Swiper>

        </div>
    )
}
