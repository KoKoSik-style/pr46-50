<template>
  <header class="navbar">
    <router-link to="/" class="logo">🍔 БыстроEда</router-link>
    <nav>
      <router-link to="/menu">Меню</router-link>
      <router-link to="/cart">Корзина</router-link>
      <router-link to="/login">Вход</router-link>
      <router-link to="/account">Кабинет</router-link>
    </nav>
  </header>
  
  <main class="container">
    <router-view />
  </main>
</template>

<style>
* { box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
body { margin: 0; background: #fcfcfc; color: #333; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: #2D2D2D; color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.navbar a { color: white; text-decoration: none; margin-left: 20px; font-size: 16px; font-weight: 500; transition: 0.2s;}
.navbar a:hover { color: #FF6B35; }
.logo { font-size: 24px; font-weight: bold; color: #FF6B35 !important; margin-left: 0 !important;}
.container { max-width: 1200px; margin: 0 auto; padding: 30px 20px; }
</style>