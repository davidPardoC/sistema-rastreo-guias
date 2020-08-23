import React, { useState } from "react";

//Bottstrap import
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
//Icon Imports
import Icon from "@material-ui/core/Icon";

//Navigatin imports
import { useHistory } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

export default function NavBarComponent(props) {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("TIPO DE USUARIO");
  const history = useHistory();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //navegacion
  const navigate = () => {
    setShow(false);
    history.push(`/${userType}`);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
      <img
        alt=""
        src={require('../assets/images/logo.svg')}
        width="50"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      RapifasCourier
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">INICIO</Nav.Link>
            <Nav.Link href="#home">MISION Y VISION</Nav.Link>
          </Nav>

          <Button style={{ display: "flex" }} onClick={handleShow}>
            <Icon>supervisor_account</Icon>INGRESAR
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
              <Form.Control placeholder="Usuario" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {userType}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#"
                  onSelect={() => {
                    setUserType("client");
                  }}
                >
                  CLIENTE
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onSelect={() => {
                    setUserType("admin");
                  }}
                >
                  ADMINISTRADOR
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onSelect={() => {
                    setUserType("sucursal");
                  }}
                >
                  SUCURSAL
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Modal.Body>
        <Container style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <Button ml={2} variant="primary" onClick={navigate}>
                INICIAR SESIÓN
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => {
                  handleClose();
                  history.push("/register");
                }}
              >
                REGISTRARSE
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}
