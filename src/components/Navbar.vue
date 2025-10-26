<template>
  <nav class="navbar">
    <h2 class="logo">TicketApp</h2>
    <ul class="nav-links">
      <!-- Home link always visible -->
      <li><router-link to="/">Home</router-link></li>

      <!-- Show these only if NOT logged in -->
      <template v-if="!isAuthenticated">
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
      </template>

      <!-- Show these only if logged in -->
      <template v-else>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/tickets">Tickets</router-link></li>
        <li><button @click="logout" class="logout-btn">Logout</button></li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isAuthenticated: !!localStorage.getItem("ticketapp_session")
    };
  },
  watch: {
    // Watch localStorage for changes (e.g., login/logout)
    isAuthenticated() {
      this.isAuthenticated = !!localStorage.getItem("ticketapp_session");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("ticketapp_session");
      this.isAuthenticated = false;
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2563eb;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid white;
}

.logout-btn {
  background: #ef4444;
  border: none;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}
.logout-btn:hover {
  background: #dc2626;
}
</style>
