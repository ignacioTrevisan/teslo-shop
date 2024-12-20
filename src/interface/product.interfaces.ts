export interface Product {
    id: string
    description: string | null;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    categoryId: string
    gender: 'men' | 'women' | 'kid' | 'unisex'
}

export interface ProductInCart {
    id: string,
    slug: string,
    title: string,
    image: string,
    size: ValidSizes;
    quantity: number;
    prize: number;
}

export interface ProductInOrder {
    id: string,
    title: string,
    image: string,
    size: ValidSizes,
    quantity: number,
    prize: number
}

export type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
