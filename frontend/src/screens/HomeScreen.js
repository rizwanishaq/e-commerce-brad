import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import Product from "../components/Product";
import { ProductContext } from "../contexts/productContext";

const HomeScreen = () => {
  const { products, loading, error } = useContext(ProductContext);
  console.log(error);

  if (loading) return <ReactLoading type={"balls"} color={"green"} />;

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default HomeScreen;
