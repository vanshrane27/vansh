export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: "tools" | "seeds" | "fertilizers" | "pesticides"
    stock: number
  }
  
  export interface CartItem extends Product {
    quantity: number
  }
  
  export interface DeliveryAddress {
    fullName: string
    phoneNumber: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
  }
  
  