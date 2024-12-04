export interface UserAddress {
    firstName: string,
    lastName: string,
    address: string,
    address2?: string,
    postalCode: string,
    city: string,
    country: string,
    phone: string
}
export interface UserAddressWithUserId {
    id: string,
    userId: string,
    firstName: string,
    lastName: string,
    address: string,
    address2?: string,
    postalCode: string,
    city: string,
    country: string,
    phone: string
}