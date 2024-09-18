import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/api/admin/users');
    setUsers(response.data);
  };

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks/admin');
    setTasks(response.data);
  };

  const changeUserRole = async (userId, role) => {
    await axios.put(`/api/admin/users/${userId}/role`, { role });
    fetchUsers();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Admin Dashboard</h2>
          <h4>Manage Users</h4>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Select
                      value={user.role}
                      onChange={(e) => changeUserRole(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="mt-5">Manage Tasks</h4>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.description}</td>
                  <td>{task.category}</td>
                  <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
