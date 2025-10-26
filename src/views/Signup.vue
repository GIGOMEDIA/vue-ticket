<template>
  <div class="auth-page">
    <section class="form-section">
      <h1>Signup</h1>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    signup() {
      if (!this.email || !this.username || !this.password) {
        return alert("All fields are required");
      }

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

      // Check if username or email exists
      if (users.find(u => u.username === this.username || u.email === this.email)) {
        return alert("Username or email already exists!");
      }

      // Save new user
      users.push({
        email: this.email,
        username: this.username,
        password: this.password
      });
      localStorage.setItem("ticketapp_users", JSON.stringify(users));

      alert("Signup successful! Please login.");
      this.$router.push("/login");
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


