import React from "react";
import NavBarComponent from "../components/nav";
import { db } from "../assets/firebase";
import {
  Container,
  Row,
  Form,
  Col,
  FormControl,
  Button,
  ListGroup,
} from "react-bootstrap";
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
        <footer>
          <ListGroup className="mt-5">
            <ListGroup.Item>
              <Row>
                <Col>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="d-flex justify-content-end"
                  >
                    <Form className="ml-3">
                      <FormControl
                        type="text"
                        placeholder="Ingresar número de guía"
                        className="mr-sm-2"
                      />
                    </Form>
                    <Button variant="outline-success" className="ml-2">
                      RASTREAR GUÍA
                    </Button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </footer>
      </Container>
    </>
  );
}
