import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form, Pagination } from 'react-bootstrap';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    dueDate: '',
    assignedUser: '',
    sortBy: 'dueDate',
    order: 'asc'
  });

  const limit = 10; // Number of tasks per page

  useEffect(() => {
    fetchTasks(currentPage);
  }, [filters, currentPage]);

  const fetchTasks = async (page) => {
    try {
      const { status, priority, dueDate, assignedUser, sortBy, order } = filters;
      const response = await axios.get('/api/tasks', {
        params: { status, priority, dueDate, assignedUser, sortBy, order, page, limit }
      });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.name,
      order: e.target.value
    });
  };

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Task Management</h2>

      {/* Filter Form */}
      <Form className="mb-4">
        <Row>
          <Col sm={3}>
            <Form.Group controlId="filterStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {/* Add more filters */}
        </Row>
      </Form>

      {/* Tasks Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <Button variant="warning" className="me-2">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default TaskPage;
