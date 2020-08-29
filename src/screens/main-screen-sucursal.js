import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import Container from "react-bootstrap/Container";
import { Row, Col, FormControl,Dropdown } from "react-bootstrap";
import ModalAddOrder from "../components/modal-add-order";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { db, auth } from "../assets/firebase";
export default function MainSucursal(props) {
  //state
  const [guides, setGuides] = useState([]);
  const [show, setShow] = useState(false);

  //inicializacion de importaciones
  const history = useHistory();
  const match = useRouteMatch();

  //cerrar modal
  const handleClose = () => setShow(false);
  

  return (
    <Container style={{ marginTop: "2rem" }}>
      <ModalAddOrder show={show} close={handleClose} />
      <Row>
        <Col sm={6}>
          <Button variant="primary" style={{ display: "flex" }} onClick={()=>{setShow(true)}}>
            NUEVO PAQUETE <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              type="text"
              placeholder="BUSCAR GUÍA"
              className="mr-sm-2"
            />
            <Button variant="outline-success">BUSCAR</Button>
            <Dropdown className='ml-2 d-flex align-items-center'>
              <Dropdown.Toggle>
                <Icon>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{auth.signOut(); history.push('/')}}>
                  Cerras Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
