<template>
  <div class="account">
    <h1>Личный кабинет</h1>
    <p class="greeting">Добро пожаловать, <b>{{ userName }}</b>!</p>
    
    <div class="tabs">
      <button @click="tab = 'profile'" :class="{active: tab === 'profile'}">Профиль</button>
      <button @click="tab = 'orders'" :class="{active: tab === 'orders'}">История заказов</button>
    </div>
    
    <div v-if="tab === 'profile'" class="content">
      <h3>Мои данные</h3>
      <input v-model="userName" class="input" placeholder="Ваше имя">
      <input value="client@mail.ru" class="input" disabled>
      <button class="btn">Сохранить изменения</button>
    </div>
    
    <div v-if="tab === 'orders'" class="content">
      <h3>Мои заказы</h3>
      <div class="order-item">
        <p><b>Заказ №101</b> от 01.11.2023</p>
        <p>Статус: <span class="status done">Доставлен</span></p>
        <p>Сумма: 1200 ₽</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('profile')
const userName = ref(localStorage.getItem('userName') || 'Гость')
</script>

<style scoped>
.greeting { font-size: 18px; margin-bottom: 30px;}
.tabs { display: flex; gap: 10px; margin-bottom: 20px;}
.tabs button { padding: 12px 25px; cursor: pointer; border: none; background: #f0f0f0; border-radius: 8px; font-size: 16px; font-weight: bold;}
.tabs button.active { background: #FF6B35; color: white;}
.content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);}
.input { display: block; width: 100%; max-width: 400px; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px;}
.btn { padding: 12px 25px; background: #FF6B35; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;}
.order-item { border-bottom: 1px solid #eee; padding: 20px 0;}
.status.done { color: green; font-weight: bold;}
</style>