<template>
  <div class="auth-page">
    <section class="form-section">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <router-link to="/signup">Signup here</router-link>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      // Validate fields
      if (!this.username || !this.password) {
        return alert("All fields are required");
      }

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

      // Check credentials
      const user = users.find(
        u => u.username === this.username && u.password === this.password
      );

      if (!user) {
        return alert("Invalid username or password");
      }

      // Set session token
      localStorage.setItem("ticketapp_session", this.username);

      alert("Login successful!");

      // Redirect to Home page
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>


