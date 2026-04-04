import type { Product, ProductsResponse } from '../types/product'

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products')

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductsResponse = await response.json()
  return data.products
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }

  const data: Product = await response.json()
  return data
}