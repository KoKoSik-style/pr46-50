<template>
  <div class="admin">
    <h1>Админ-панель</h1>
    <div class="stats">
      <div class="stat-card"><h3>5</h3><p>Новые заказы</p></div>
      <div class="stat-card"><h3>15 000 ₽</h3><p>Выручка</p></div>
      <div class="stat-card"><h3>12</h3><p>Клиенты</p></div>
    </div>

    <h2>Управление заказами</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.created_at }}</td>
            <td>{{ order.total_price }} ₽</td>
            <td>
              <select v-model="order.status" class="status-select">
                <option value="new">Новый</option>
                <option value="processing">Готовится</option>
                <option value="delivering">В пути</option>
                <option value="done">Выполнен</option>
              </select>
            </td>
            <td><button @click="updateStatus(order)" class="save-btn">Сохранить</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const orders = ref([])
const router = useRouter()

onMounted(async () => {
  if (localStorage.getItem('role') !== 'admin') {
    alert('Доступ запрещен')
    return router.push('/login')
  }
  
  const res = await axios.get('http://localhost:3000/api/orders')
  orders.value = res.data
})

const updateStatus = (order) => {
  alert(`Статус заказа #${order.id} изменен на "${order.status}"`)
}
</script>

<style scoped>
.stats { display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;}
.stat-card { background: linear-gradient(135deg, #FF6B35, #E63946); color: white; padding: 25px; border-radius: 12px; flex: 1; min-width: 200px; text-align: center; box-shadow: 0 4px 15px rgba(255,107,53,0.3);}
.stat-card h3 { margin: 0 0 10px 0; font-size: 28px;}
.stat-card p { margin: 0; opacity: 0.9;}
.table-wrap { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);}
table { width: 100%; border-collapse: collapse; }
th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee;}
th { background: #f9f9f9; font-weight: bold;}
.status-select { padding: 8px; border-radius: 6px; border: 1px solid #ddd;}
.save-btn { background: #FF6B35; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;}
</style>