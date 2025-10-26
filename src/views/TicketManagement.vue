<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">TicketApp</div>
      <ul class="nav-links">
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/tickets">Tickets</router-link></li>
        <li><button @click="logout">Logout</button></li>
      </ul>
    </nav>

    <!-- Ticket Management Section -->
    <div class="tickets">
      <h1>Ticket Management</h1>

      <!-- Create / Edit Ticket Form -->
      <form @submit.prevent="handleSubmit" class="ticket-form">
        <input v-model="form.title" type="text" placeholder="Ticket Title" required />
        <textarea v-model="form.description" placeholder="Ticket Description"></textarea>
        <select v-model="form.status" required>
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit">{{ editIndex !== null ? 'Update Ticket' : 'Create Ticket' }}</button>
        <p class="error" v-if="error">{{ error }}</p>
        <p class="success" v-if="success">{{ success }}</p>
      </form>

      <!-- Ticket List -->
      <div v-if="tickets.length" class="ticket-list">
        <div v-for="(ticket, index) in tickets" :key="index" class="ticket-card">
          <h3>{{ ticket.title }}</h3>
          <p>{{ ticket.description }}</p>
          <span :class="['status', ticket.status]">{{ ticket.status }}</span>

          <div class="actions">
            <button @click="editTicket(index)">Edit</button>
            <button @click="deleteTicket(index)">Delete</button>
          </div>
        </div>
      </div>

      <p v-else>No tickets yet. Create one above!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketManagement',
  data() {
    return {
      tickets: [],
      form: {
        title: '',
        description: '',
        status: ''
      },
      editIndex: null,
      error: '',
      success: ''
    }
  },
  created() {
    const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets')) || []
    this.tickets = storedTickets
  },
  methods: {
    saveTickets() {
      localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
    },
    handleSubmit() {
      this.error = ''
      this.success = ''

      if (!this.form.title || !this.form.status) {
        this.error = 'Title and Status are required.'
        return
      }

      if (this.editIndex !== null) {
        this.tickets[this.editIndex] = { ...this.form }
        this.success = 'Ticket updated successfully.'
        this.editIndex = null
      } else {
        this.tickets.push({ ...this.form })
        this.success = 'Ticket created successfully.'
      }

      this.saveTickets()
      this.resetForm()
    },
    resetForm() {
      this.form = { title: '', description: '', status: '' }
    },
    editTicket(index) {
      this.form = { ...this.tickets[index] }
      this.editIndex = index
    },
    deleteTicket(index) {
      if (confirm('Are you sure you want to delete this ticket?')) {
        this.tickets.splice(index, 1)
        this.saveTickets()
      }
    },
    logout() {
      localStorage.removeItem('ticketapp_session')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2563eb;
  padding: 1rem 2rem;
  color: white;
}

.navbar .logo {
  font-weight: bold;
  font-size: 1.3rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.nav-links li a,
.nav-links li button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.nav-links li button:hover,
.nav-links li a:hover {
  text-decoration: underline;
}

/* Ticket Section */
.tickets {
  max-width: 900px;
  margin: 60px auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.ticket-form input,
.ticket-form textarea,
.ticket-form select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.ticket-list {
  display: grid;
  gap: 1rem;
}

.ticket-card {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  text-transform: capitalize;
  font-size: 0.9rem;
}

.status.open {
  background: #16a34a;
}

.status.in_progress {
  background: #f59e0b;
}

.status.closed {
  background: #6b7280;
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: #2563eb;
  color: white;
}

button:hover {
  background: #1e40af;
}
</style>


