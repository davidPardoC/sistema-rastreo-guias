import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import {
  Row,
  Col,
  FormControl,
  Button,
  Container,
  ListGroup,
} from "react-bootstrap";
import ModalAddOrder from "../components/modal-add-order";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function CreateAlert() {
  //state
  const [guides, setGuides] = useState([]);
  const [show, setShow] = useState(false);

  //cerrar modal
  const handleClose = () => setShow(false);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <ModalAddOrder show={show} close={handleClose} />
      <Row>
        <Col sm={6}>
          <Button
            variant="primary"
            style={{ display: "flex" }}
            onClick={() => {
              setShow(true);
            }}
          >
            NUEVO ALERTA DE ENVIO{" "}
            <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
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
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className="mt-5">
            <ListGroup.Item
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              RN00000000EC
              <Button
                onClick={() => {
                  setShow(true);
                }}
              >
                Ver Detalles
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
