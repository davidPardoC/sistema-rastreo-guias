import React, { useState, useEffect } from "react";

//Bottstrap import
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//Icon Imports
import Icon from "@material-ui/core/Icon";

//Navigatin imports
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container, Alert } from "react-bootstrap";

//Firebase Imports
import { auth } from "../assets/firebase";

export default function NavBarComponent() {
  //Alerta Credenciales
  const [alert, setAlert] = useState(false);
  //estado Modal
  const [show, setShow] = useState(false);
  //inputs SignIn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //signIn button
  const [signInButton, setSignInButton] = useState(true);

  //Inicializacion Navegacion
  const history = useHistory();

  //init
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((tokenResult) => {
          if (tokenResult.claims.role === "admin") {
            history.push("/admin");
          } else {
            if (tokenResult.claims.role === "client") {
              history.push("/client");
            } else {
              if (tokenResult.claims.role === "sucursal") {
                history.push("/sucursal");
              }
            }
          }
        });
      } else {
      }
    });
  },[]);

  const CheckInputs = () => {
    if (email && password) {
      setSignInButton(false);
    } else {
      setSignInButton(true);
    }
  };
  //Checck Inputs
  useEffect(CheckInputs, [email, password]);
  //Modal
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //signIN
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((e) => {
        console.log(e);
        setAlert(true);
      });
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className='ml-3'><Link style={{color:'#384F77'}} to='/'>INICIO</Link></div>
            <div  className='ml-3'><Link style={{color:'#384F77'}}  to='/servicio'>SERVICIO</Link></div>
            <div  className='ml-3'><Link style={{color:'#384F77'}}  to='/empresa'>LA EMPRESA</Link></div>
          </Nav>

          <Button style={{ display: "flex", backgroundColor:'#384F77'}} onClick={handleShow}>
            MODO EMPRESA
          </Button>
          <Button className='ml-1' style={{backgroundColor:'#384F77', fontSize:'0.6rem'}} onClick={handleShow}>
            <div>CLIENTES</div> CORPORATIVOS
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/*Modal*/}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          {alert && <Alert variant="danger">Credenciales Incorrectas</Alert>}
        </Modal.Body>
        <Container style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <Button
                ml={2}
                variant="primary"
                onClick={signIn}
                disabled={signInButton}
              >
                INICIAR SESIÓN
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}
