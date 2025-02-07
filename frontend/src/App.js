import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ prenom: "", nom: "", age: "", email: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users", form)
      .then(() => {
        setUsers([...users, form]);
        setForm({ prenom: "", nom: "", age: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="prenom" placeholder="First Name" value={form.prenom} onChange={handleChange} required />
        <input type="text" name="nom" placeholder="Family Name" value={form.nom} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.prenom} {user.nom} ({user.age}) - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
