import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/slidebar';
import TaskPage from './pages/Taskpage';
import AdminPage from './pages/Adminpages';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Registerpage';
import { AuthProvider } from './context/Authcontext';
import NotFoundPage from './components/NotFoundPage';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebaseConfig';
import socket from './socket';


const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await requestFirebaseNotificationPermission();
        if (token) {
          console.log('Firebase Token: ', token);
          // Optionally, save the token to your backend for push notifications
        }
      } catch (error) {
        console.error('Error getting Firebase token', error);
      }
    };

    setupNotifications();

    onMessageListener()
      .then(payload => {
        console.log('Notification received: ', payload);
        // Optionally, display an in-app alert/notification
      })
      .catch(err => console.error('Error with message listener: ', err));
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex">
          
          <Sidebar />

        
          <Container fluid className="p-4">
            <Row className="justify-content-md-center">
              <Col md={10}>
                <Routes>
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                   <Route path="/admin" element={<AdminPage />} /> 
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                 
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
