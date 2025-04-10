import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ prenom: "", nom: "", age: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/users", form);
      await fetchUsers(); // Refresh the list after successful submission
      setForm({ prenom: "", nom: "", age: "", email: "" });
    } catch (err) {
      setError("Failed to add user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      
      {error && <div style={{ color: "red" }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="prenom"
          placeholder="First Name"
          value={form.prenom}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <input
          type="text"
          name="nom"
          placeholder="Family Name"
          value={form.nom}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <button type="submit" disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>

      {loading && !users.length ? (
        <p>Loading users...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: "10px" }}>
              <strong>{user.prenom} {user.n}</strong> ({user.age}) - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;