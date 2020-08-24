import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Alert, Col } from "react-bootstrap";
import NavBarComponent from "../components/nav";
import { auth } from "../assets/firebase";
import { db } from "../assets/firebase";
import {useHistory} from 'react-router-dom'

export default function Register() {
  //passwords
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  //estdo del boton registro
  const [buttonRegister, setButtonRegister] = useState(true);
  //datos para registro
  const [usertoRegister, setUserToRegister] = useState({});
const history = useHistory();
  //Habilita el boton de registro
  useEffect(() => {
    if (password === "") {
      setButtonRegister(true);
    } else {
      if (password !== passwordConf) {
        setButtonRegister(true);
      } else {
        setButtonRegister(false);
      }
    }
  }, [passwordConf]);

  //compara los campos de las Contraseñas
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

  //Registrar nuevo usuario
  const RegisterUser = () => {
    auth
      .createUserWithEmailAndPassword(
        usertoRegister.email,
        usertoRegister.password
      )
      .then((res) => {
        db.collection("users").add({ ...usertoRegister, admin: false, uid:res.user.uid });
        history.push('/')
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      <NavBarComponent />
      <Container className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col sm={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1 className="text-center">REGISTRO</h1>
              <img src={require("../assets/images/logo.svg")} width="200rem" />
            </div>

            <Form
  className='mt-3'
            >
              <Form.Group controlId="nombre">
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      nombre: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="apellido">
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      apellido: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Correo Electronico"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      email: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="telefono">
                <Form.Control
                  type="text"
                  placeholder="Telefono"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      telefono: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setUserToRegister({
                      ...usertoRegister,
                      password: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="confPassword">
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
                  disabled={buttonRegister}
                  onClick={RegisterUser}
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
