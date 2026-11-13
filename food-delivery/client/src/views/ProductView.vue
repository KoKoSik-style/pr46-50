<template>
  <div v-if="product" class="product-page">
    <router-link to="/menu" class="back-link">← Назад в меню</router-link>
    <div class="product-details">
      <img :src="product.image_url" alt="Фото" class="main-img">
      <div class="info">
        <h1>{{ product.name }}</h1>
        <h2 class="price">{{ product.price }} ₽</h2>
        <p class="desc">Вкусное блюдо, приготовленное с любовью. Состав: свежие ингредиенты, фирменный соус.</p>
        <button @click="addToCart" class="btn">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref(null)

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/api/products/${route.params.id}`)
  product.value = res.data
})

const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cart.push(product.value)
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Добавлено в корзину!')
  router.push('/cart')
}
</script>

<style scoped>
.back-link { text-decoration: none; color: #666; display: inline-block; margin-bottom: 20px;}
.product-details { display: flex; gap: 50px; margin-top: 20px; flex-wrap: wrap;}
.main-img { width: 100%; max-width: 450px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);}
.info { flex: 1; min-width: 300px;}
.price { color: #E63946; font-size: 32px; margin: 20px 0;}
.desc { color: #666; line-height: 1.6; margin-bottom: 30px;}
.btn { padding: 15px 30px; background: #FF6B35; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: bold;}
</style>