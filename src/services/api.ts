import type { AuthUser, LoginPayload } from '@/types/auth'
import type { Product, ProductsResponse } from '@/types/product'

const BASE_URL = 'https://dummyjson.com'

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return (await response.json()) as T
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await request<ProductsResponse>('/products?limit=100')
  return data.products
}

export async function fetchProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`)
}

export async function fetchCategories(): Promise<string[]> {
  const categories = await request<Array<{ slug: string; name: string; url: string }>>('/products/categories')
  return categories.map((category) => category.slug)
}

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  return request<AuthUser>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
      expiresInMins: payload.expiresInMins ?? 60,
    }),
  })
}
