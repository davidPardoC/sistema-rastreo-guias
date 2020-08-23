import React from "react";
import NavBarComponent from "../components/nav";
import { db } from "../assets/firebase";
import { Container, Row, Form, Col, FormControl, Button } from "react-bootstrap";
export default function Home() {
  return (
    <>
      <NavBarComponent />
      <Container>
        <Row>
          <img
            className="mt-5"
            alt="Banner"
            src={require("../assets/images/banner.svg")}
            width="100%"
          />
        </Row>
        <Row>
          <Col>
          <div style={{display:'flex', width:'100%'}}>
          <Form>
              <FormControl
                type="text"
                placeholder="BUSCAR GUÍA"
                className="mr-sm-2"
              />
            </Form>
            <Button variant="outline-success">BUSCAR</Button>
          </div>
            
          </Col>
        </Row>
      </Container>
    </>
  );
}
