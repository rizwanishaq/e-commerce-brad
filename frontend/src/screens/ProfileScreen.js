import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../contexts/authContext";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfileScreen = ({ history }) => {
  const {
    getUserDetail,
    userDetail,
    userInfo,
    authError,
    authLoading,
  } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetail.name) {
        getUserDetail("profile");
      } else {
        setName(userDetail.name);
        setEmail(userDetail.email);
      }
    }
    // eslint-disable-next-line
  }, [userInfo, userDetail]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not matched");
    } else {
      // UPDATE PROFILE
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {authError && <Message variant="danger">{authError}</Message>}
        {authLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>MY Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
