import React, { useState} from "react";

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

//Firebase Imports
import { useFirebaseApp, useFirestoreCollection} from "reactfire";
import 'firebase/firestore';

export default function NavBarComponent(props) {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("TIPO DE USUARIO");
  const history = useHistory();

  //firebase
  const firebaseApp = useFirebaseApp();
  const ref = firebaseApp.firestore().collection('guias');
  const users = useFirestoreCollection(ref).docs.map(d => ({id: d.id}) );
  console.log(users)

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Guías</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">INICIO</Nav.Link>
          </Nav>
          <Button style={{ display: "flex" }} onClick={handleShow}>
            <Icon>supervisor_account</Icon>INGRESAR
          </Button>
        </Navbar.Collapse>
      </Navbar>

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
                    setUserType("CLIENTE");
                  }}
                >
                  CLIENTE
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onSelect={() => {
                    setUserType("ADMINISTRADOR");
                  }}
                >
                  ADMINISTRADOR
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              history.push("/createOrder");
            }}
          >
            INICIAR SESIÓN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
