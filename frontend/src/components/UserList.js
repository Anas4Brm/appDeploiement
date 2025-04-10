import React, { useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("❌ Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("🗑️ User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("❌ Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h2 className="fw-bold text-primary mb-3">👥 User Management</h2>
        <p className="text-muted">Add, edit, or delete users easily.</p>
      </div>

      <UserForm
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        fetchUsers={fetchUsers}
      />

      <div className="card shadow-sm rounded-4 border-0 mt-5">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-3">📋 User List</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-muted">{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setEditingUser(user)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
