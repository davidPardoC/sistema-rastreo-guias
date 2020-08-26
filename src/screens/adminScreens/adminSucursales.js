import React, { useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import Icon from "@material-ui/core/Icon";

export default function AdminSucursales() {
  const [showNuevaSucursal, setShowNuevaSucursal] = useState(false);
  const [showConfirmarBorrar, setShowConfirmarBorrar] = useState(false);
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col>
            <Button
              style={{ display: "flex" }}
              variant="outline-primary"
              onClick={() => {
                setShowNuevaSucursal(true);
              }}
            >
              Crear Nueva Sucursal
              <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <h2>SUCURSALES</h2>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                Sucursal n1
                <div>
                  <Button onClick={()=>{ setShowNuevaSucursal(true);}}>
                    <Icon>create</Icon>
                  </Button>
                  <Button className="ml-1" variant="danger" onClick={()=>{setShowConfirmarBorrar(true)}}>
                    <Icon>delete</Icon>
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/*Modal nueva sucursa*/}
        <Modal
          show={showNuevaSucursal}
          onHide={() => {
            setShowNuevaSucursal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ingresar Nueva Sucursal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*Formulario NUeva Sucursal*/}
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Usuario" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {}}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => {}}>
              CONFIRMAR
            </Button>
          </Modal.Footer>
        </Modal>

         {/*Modal Confirmar Borrar*/}
         <Modal
          show={showConfirmarBorrar}
          onHide={() => {
            setShowConfirmarBorrar(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ingresar Nueva Sucursal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           ¿Estas seguro de eliminar esta sucursal?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {}}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={() => {}}>
              CONFIRMAR
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
