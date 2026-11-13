<template>
  <div class="home">
    <div class="banner">🔥 Акция! Скидка 20% на первый заказ по промокоду WELCOME</div>
    
    <h2 class="section-title">Категории</h2>
    <div class="categories">
      <router-link v-for="cat in categories" :key="cat.id" :to="`/menu?category=${cat.id}`" class="cat-card">
        {{ cat.name }}
      </router-link>
    </div>

    <h2 class="section-title">Популярные блюда</h2>
    <div class="products-grid">
      <div v-for="p in products" :key="p.id" class="product-card">
        <img :src="p.image_url" alt="Фото">
        <h3>{{ p.name }}</h3>
        <p class="price">{{ p.price }} ₽</p>
        <router-link :to="`/product/${p.id}`" class="btn">Подробнее</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const products = ref([])

onMounted(async () => {
  const catRes = await axios.get('http://localhost:3000/api/categories')
  categories.value = catRes.data
  
  const prodRes = await axios.get('http://localhost:3000/api/products')
  products.value = prodRes.data.filter(p => p.is_popular) 
})
</script>

<style scoped>
.banner { background: linear-gradient(90deg, #FF6B35, #E63946); color: white; padding: 25px; text-align: center; font-size: 22px; border-radius: 12px; margin-bottom: 40px; font-weight: bold;}
.section-title { margin-bottom: 20px; font-size: 24px; }
.categories { display: flex; gap: 15px; margin-bottom: 40px;}
.cat-card { padding: 12px 25px; background: #fff; border: 2px solid #FF6B35; border-radius: 30px; text-decoration: none; color: #333; font-weight: bold; transition: 0.3s;}
.cat-card:hover { background: #FF6B35; color: white; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 25px; }
.product-card { background: white; border-radius: 12px; padding: 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.3s;}
.product-card:hover { transform: translateY(-5px); }
.product-card img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; }
.price { font-size: 20px; font-weight: bold; color: #E63946; margin: 10px 0; }
.btn { display: inline-block; padding: 10px 20px; background: #FF6B35; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;}
</style>