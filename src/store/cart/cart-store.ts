import { ProductInCart } from "@/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: ProductInCart[];
    addProductToCart: (product: ProductInCart) => void;
    getTotalItems: () => number;
    updateProductQuantity: (quantity: number, slug: string, size: string) => void;
    removeProductCart: (slug: string, size: string) => void;
    getSummaryInformation: () => {
        subtotal: number;
        tax: number;
        total: number;
        articlesQuantity: number;
    };
    clearClart: () => void;
}

export const useCartStore = create<State>()(

    persist(

        (set, get) => ({
            cart: [],

            addProductToCart: (product: ProductInCart) => {

                const { cart } = get();
                console.log(cart)
                const productExistInCart = cart.some((item) => item.id === product.id && item.size === product.size);

                if (!productExistInCart) {
                    set({ cart: [...cart, product] })
                    return;
                }

                const updateCartProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item, quantity: item.quantity + product.quantity
                        }
                    }
                    return item;
                })
                set({ cart: updateCartProduct })
            },
            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce((total, item) => total + item.quantity, 0);

            },
            getSummaryInformation: () => {
                const { cart } = get();
                const subtotal = cart.reduce((subtotal, producto) => (producto.quantity * producto.prize) + subtotal, 0)
                const tax = subtotal * 0.15;
                const total = subtotal + tax;
                const articlesQuantity = cart.reduce((total, item) => total + item.quantity, 0)
                return {
                    subtotal,
                    tax,
                    total,
                    articlesQuantity
                }
            },
            updateProductQuantity: (quantity: number, slug: string, size: string,) => {
                const { cart } = get();
                const updateCart = cart.map((item) => {
                    if (item.slug === slug && item.size === size) {
                        return { ...item, quantity: quantity }
                    }
                    return { ...item }
                })
                set({ cart: updateCart })
            },
            removeProductCart: (slug: string, size: string) => {
                const { cart } = get();
                const product = cart.find((p) => p.size === size && p.slug === slug);
                const updateCart = cart.filter((p) => p !== product);
                set({ cart: updateCart })
            },
            clearClart: () => {
                set({ cart: [] })
            }
        })
        ,
        { name: 'Shopping-cart' }
    )

)