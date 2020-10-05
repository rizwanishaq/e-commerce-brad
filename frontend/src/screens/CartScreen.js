import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { CartContext } from "../contexts/cartContext";

const CartScreen = ({ match, location, history }) => {
  const { cartItems, addItems } = useContext(CartContext);

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      addItems(productId, qty);
    }
  }, [productId, qty]);

  return <div>{JSON.stringify(cartItems)}</div>;
};

export default CartScreen;
