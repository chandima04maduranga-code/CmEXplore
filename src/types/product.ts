export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  sku?: string
  availabilityStatus?: string
  shippingInformation?: string
  returnPolicy?: string
  warrantyInformation?: string
  minimumOrderQuantity?: number
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
