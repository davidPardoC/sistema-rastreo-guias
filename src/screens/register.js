import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Alert, Col } from "react-bootstrap";
import NavBarComponent from "../components/nav";
export default function Register() {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [buttonRegister, setButtonRegister] = useState(true);

  useEffect(() => {
    if (password == "") {
      setButtonRegister(true);
    } else {
      if (password !== passwordConf) {
        setButtonRegister(true);
      } else {
        setButtonRegister(false);
      }
    }
  }, [passwordConf]);

  const comparePasswords = () => {
    if (password === passwordConf) {
      return;
    } else {
      if (password !== "" && passwordConf === "") {
        return;
      } else {
        if (password !== passwordConf) {
          return <Alert variant="danger">Las contraseñas no coinciden</Alert>;
        }
      }
    }
  };
  return (
    <>
      <NavBarComponent />
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={4}>
            <Form
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "2rem",
              }}
            >
              <h1 className="text-center">REGISTRO RAPIFAS COURIER</h1>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Nombres" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Apellidos" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Correo Electronico" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Telefono" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirmar Contraseña"
                  onChange={(e) => {
                    setPasswordConf(e.target.value);
                  }}
                />
              </Form.Group>
              {comparePasswords()}
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={buttonRegister}
                >
                  REGISTRARSE
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
