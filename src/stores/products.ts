import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchCategories, fetchProducts } from '@/services/api'
import type { Product } from '@/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref('')
  const searchTerm = ref('')
  const selectedCategory = ref('all')
  const selectedSort = ref('featured')

  const loadProducts = async () => {
    if (products.value.length > 0) {
      return
    }

    loading.value = true
    error.value = ''
    try {
      const [productList, categoryList] = await Promise.all([fetchProducts(), fetchCategories()])
      products.value = productList
      categories.value = categoryList
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load products right now.'
      error.value = message
    } finally {
      loading.value = false
    }
  }

  const filteredProducts = computed(() => {
    const normalizedSearch = searchTerm.value.trim().toLowerCase()

    const list = products.value.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch)

      const matchesCategory =
        selectedCategory.value === 'all' || product.category === selectedCategory.value

      return matchesSearch && matchesCategory
    })

    const sortedList = [...list]

    switch (selectedSort.value) {
      case 'price-low':
        sortedList.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sortedList.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sortedList.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        sortedList.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        sortedList.sort((a, b) => b.rating - a.rating)
    }

    return sortedList
  })

  const featuredProducts = computed(() => [...products.value].sort((a, b) => b.rating - a.rating).slice(0, 4))

  return {
    products,
    categories,
    loading,
    error,
    searchTerm,
    selectedCategory,
    selectedSort,
    filteredProducts,
    featuredProducts,
    loadProducts,
  }
})
