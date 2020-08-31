import React from "react";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import Container from "react-bootstrap/Container";
import { Row, Col, FormControl,Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {  auth } from "../assets/firebase";
export default function MainSucursal(props) {
 
 

  //inicializacion de importaciones
  const history = useHistory();
  //cerrar modal

  

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row>
        <Col sm={6}>
          <Button variant="primary" style={{ display: "flex" }} onClick={()=>{}}>
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
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
