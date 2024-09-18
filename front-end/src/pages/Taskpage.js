import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  };

  const createTask = async () => {
    if (newTask && category) {
      await axios.post('/api/tasks', { description: newTask, category });
      fetchTasks();
      setNewTask('');
      setCategory('');
    }
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    fetchTasks();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Your Tasks</h2>
          <Form>
            <Row className="align-items-center">
              <Col sm={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Task description"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Button variant="primary" onClick={createTask}>
                  Add Task
                </Button>
              </Col>
            </Row>
          </Form>
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
                    <Button variant="danger" onClick={() => deleteTask(task._id)}>
                      Delete
                    </Button>
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

export default TaskPage;
