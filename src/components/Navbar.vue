<template>
  <nav class="navbar">
    <h2 class="logo">TicketApp</h2>

    <!-- Hamburger Icon for mobile -->
    <div class="hamburger" @click="toggleMenu">
      <span :class="{ 'bar1': true, 'change1': menuOpen }"></span>
      <span :class="{ 'bar2': true, 'change2': menuOpen }"></span>
      <span :class="{ 'bar3': true, 'change3': menuOpen }"></span>
    </div>

    <ul :class="['nav-links', { 'nav-active': menuOpen }]">
      <li><router-link to="/">Home</router-link></li>

      <template v-if="!isAuthenticated">
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
      </template>

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
      isAuthenticated: !!localStorage.getItem("ticketapp_session"),
      menuOpen: false, // controls hamburger menu
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      localStorage.removeItem("ticketapp_session");
      this.isAuthenticated = false;
      this.$router.push("/login");
      this.menuOpen = false; // close menu on logout
    },
  },
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
  position: relative;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}
.hamburger span {
  height: 3px;
  width: 25px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}
.bar1.change1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}
.bar2.change2 {
  opacity: 0;
}
.bar3.change3 {
  transform: rotate(45deg) translate(-5px, -6px);
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
  transition: max-height 0.3s ease;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .nav-links {
    position: absolute;
    top: 70px;
    right: 0;
    background: #2563eb;
    flex-direction: column;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    border-radius: 0 0 12px 12px;
  }
  .nav-links.nav-active {
    max-height: 500px; /* enough to show all items */
  }
  .nav-links li {
    text-align: center;
    margin: 1rem 0;
  }
}

/* Other existing styles */
.logo {
  font-size: 1.5rem;
  font-weight: bold;
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
