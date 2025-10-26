<template>
  <div class="dashboard">
    <!-- Navbar -->
    <Navbar />

    <!-- Dashboard Content -->
    <section class="dashboard-content">
      <h1>Dashboard</h1>
      <p>Welcome back! Here are your ticket statistics:</p>

      <div class="stats">
        <div class="stat-card">
          <h3>Total Tickets</h3>
          <p>{{ totalTickets }}</p>
        </div>
        <div class="stat-card">
          <h3>Open Tickets</h3>
          <p>{{ openTickets }}</p>
        </div>
        <div class="stat-card">
          <h3>Resolved Tickets</h3>
          <p>{{ resolvedTickets }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Dashboard',
  components: { Navbar },
  data() {
    return {
      tickets: [
        { id: 1, status: 'open' },
        { id: 2, status: 'closed' },
        { id: 3, status: 'in_progress' },
      ]
    }
  },
  computed: {
    totalTickets() {
      return this.tickets.length
    },
    openTickets() {
      return this.tickets.filter(t => t.status === 'open').length
    },
    resolvedTickets() {
      return this.tickets.filter(t => t.status === 'closed').length
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
}

.dashboard-content {
  margin-top: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  text-align: center;
}
.stat-card h3 {
  color: #2563eb;
  margin-bottom: 0.5rem;
}
</style>

