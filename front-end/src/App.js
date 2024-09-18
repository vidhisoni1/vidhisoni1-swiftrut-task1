import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/slidebar';
import TaskPage from './pages/Taskpage';
import AdminPage from './pages/Adminpages';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Registerpage';
import { AuthProvider } from './context/Authcontext';
// import ProtectedRoute from './components/ProtectedRoute'; // Protect admin routes

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col md={10}>
                <Routes>
                  <Route path="/tasks" element={<TaskPage />} />
                  {/* <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} /> */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  {/* Other routes */}
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
