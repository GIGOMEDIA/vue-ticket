<template>
  <div>
    <Navbar />

    <!-- Hero Section -->
    <div style="text-align: center; padding: 50px;">
      <h1 style="font-size: 2.5rem; margin-bottom: 20px; color: #1e40af;">
        Welcome to the Ticket App 🎫
      </h1>
      <p style="color: #555; margin-bottom: 40px;">
        Manage your tickets easily and securely.
      </p>

      <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
        <div
          v-for="(card, index) in cards"
          :key="index"
          style="background: white; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 250px; padding: 20px;"
        >
          <h2 style="color: #2563eb; margin-bottom: 10px;">{{ card.title }}</h2>
          <p style="color: #666;">{{ card.text }}</p>
        </div>
      </div>

      <div style="margin-top: 50px;">
        <router-link to="/signup" style="text-decoration: none; color: white; background: #2563eb; padding: 10px 20px; border-radius: 8px;">
          Get Started →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: { Navbar },
  data() {
    return {
      cards: [
        { title: 'Unified Design', text: 'Experience a clean, consistent UI across all features.' },
        { title: 'Secure-ish Auth', text: 'Login and signup with a touch of safety and simplicity.' },
        { title: 'Ticket CRUD', text: 'Create, Read, Update, and Delete your tickets seamlessly.' }
      ]
    }
  }
}
</script>

