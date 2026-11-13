<template>
  <div class="menu">
    <h1>Меню</h1>
    <input v-model="search" @input="fetchProducts" placeholder="Поиск блюда..." class="search-input">
    
    <div class="filters">
      <button @click="setCategory(null)" :class="{active: !currentCategory}">Все</button>
      <button v-for="cat in categories" :key="cat.id" @click="setCategory(cat.id)" :class="{active: currentCategory == cat.id}">
        {{ cat.name }}
      </button>
    </div>

    <div class="products-grid">
      <div v-for="p in products" :key="p.id" class="product-card">
        <img :src="p.image_url" alt="Фото">
        <h3>{{ p.name }}</h3>
        <p class="price">{{ p.price }} ₽</p>
        <router-link :to="`/product/${p.id}`" class="btn">В корзину</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const categories = ref([])
const products = ref([])
const currentCategory = ref(route.query.category || null)
const search = ref('')

const fetchProducts = async () => {
  const res = await axios.get('http://localhost:3000/api/products', {
    params: { category: currentCategory.value, search: search.value }
  })
  products.value = res.data
}

const setCategory = (id) => {
  currentCategory.value = id
  fetchProducts()
}

onMounted(async () => {
  const catRes = await axios.get('http://localhost:3000/api/categories')
  categories.value = catRes.data
  fetchProducts()
})
</script>

<style scoped>
.search-input { padding: 12px; width: 100%; max-width: 400px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;}
.filters { display: flex; gap: 10px; margin-bottom: 30px;}
.filters button { padding: 10px 20px; border: 1px solid #FF6B35; background: white; color: #FF6B35; border-radius: 20px; cursor: pointer; font-weight: bold; transition: 0.2s;}
.filters button.active, .filters button:hover { background: #FF6B35; color: white;}
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 25px;}
.product-card { background: white; border-radius: 12px; padding: 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);}
.product-card img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; }
.price { font-size: 20px; font-weight: bold; color: #E63946; margin: 10px 0; }
.btn { display: inline-block; padding: 10px 20px; background: #FF6B35; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;}
</style>