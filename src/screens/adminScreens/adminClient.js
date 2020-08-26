import React, { useState } from "react";
import { Button, Container, Form, Row, Col, Modal, ListGroup } from "react-bootstrap";
import { Icon } from "@material-ui/core";

//Components
import RegisterClientModal from "../../components/adminComponents/register-client-modal";

export default function AdminClients() {
  const [modalRegistroCliente, setmodalRegistroCliente] = useState(false);

  const closeModalRegister = () => {
    setmodalRegistroCliente(false);
  };
  return (
    <Container className="mt-3">
      <Modal show={modalRegistroCliente} onHide={closeModalRegister}>
      <Modal.Header closeButton>
          <Modal.Title>Registro Cliente</Modal.Title>
        </Modal.Header>
        <RegisterClientModal />
      </Modal>
      <Row>
        <Col sm={6}>
          <Button
            className='d-flex align-items-center"'
            variant="outline-primary"
            onClick={() => {
              setmodalRegistroCliente(true);
            }}
          >
            Nuevo Cliente
            <Icon className="ml-1">person</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Control
              type="text"
              placeholder="CI / RUC"
              className="mr-sm-2"
            />
            <Button>
              <Icon>search</Icon>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
          <Col>
          {
              //Mostrar Cliente Encontrado
          }
          </Col>
      </Row>
    </Container>
  );
}
