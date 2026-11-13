<template>
  <div class="login">
    <h1>Вход в систему</h1>
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required class="input">
      <input v-model="password" type="password" placeholder="Пароль" required class="input">
      <button type="submit" class="btn">Войти</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <div class="hint">
      <p><b>Тестовые аккаунты:</b></p>
      <p>Админ: admin@mail.ru / 123456</p>
      <p>Клиент: client@mail.ru / 123456</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('userName', res.data.name)
    
    if (res.data.role === 'admin') router.push('/admin')
    else router.push('/account')
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка входа'
  }
}
</script>

<style scoped>
.login { max-width: 400px; margin: 50px auto; text-align: center; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);}
.input { display: block; width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;}
.btn { width: 100%; padding: 15px; background: #FF6B35; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;}
.error { color: #E63946; margin-top: 15px; font-weight: bold;}
.hint { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;}
</style>