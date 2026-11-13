<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="cartItems.length === 0" class="empty">Ваша корзина пуста </div>
    <div v-else class="cart-content">
      <div class="cart-list">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <span>{{ item.name }}</span>
          <span class="item-price">{{ item.price }} ₽</span>
          <button @click="removeItem(index)" class="delete-btn">✖</button>
        </div>
        <h3 class="total">Итого: {{ totalPrice }} ₽</h3>
      </div>
      
      <div class="checkout-form">
        <h3>Оформление заказа</h3>
        <input v-model="address" placeholder="Адрес доставки" class="input">
        <select v-model="payment" class="input">
          <option value="card">Оплата картой</option>
          <option value="cash">Наличными курьеру</option>
        </select>
        <button @click="checkout" class="btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartItems = ref([])
const address = ref('')
const payment = ref('card')

onMounted(() => {
  cartItems.value = JSON.parse(localStorage.getItem('cart') || '[]')
})

// ИСПРАВЛЕНО: используем cartItems вместо items
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + Number(item.price), 0)
})

const removeItem = (index) => {
  cartItems.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const checkout = async () => {
  if (!address.value) return alert('Пожалуйста, введите адрес')
  
  await axios.post('http://localhost:3000/api/orders', {
    items: cartItems.value,
    address: address.value,
    payment_method: payment.value,
    total_price: totalPrice.value
  })
  
  alert('Заказ успешно оформлен!')
  localStorage.removeItem('cart')
  cartItems.value = []
  router.push('/')
}
</script>

<style scoped>
.cart-content { display: flex; gap: 40px; flex-wrap: wrap;}
.cart-list { flex: 2; min-width: 300px;}
.cart-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #eee; background: white; border-radius: 8px; margin-bottom: 10px;}
.item-price { font-weight: bold; color: #E63946;}
.delete-btn { background: none; border: none; color: #999; cursor: pointer; font-size: 18px;}
.delete-btn:hover { color: red; }
.total { margin-top: 20px; font-size: 24px;}
.checkout-form { flex: 1; min-width: 300px; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);}
.input { display: block; width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px;}
.btn { width: 100%; padding: 15px; background: #FF6B35; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;}
.empty { text-align: center; font-size: 20px; color: #666; margin-top: 50px;}
</style>