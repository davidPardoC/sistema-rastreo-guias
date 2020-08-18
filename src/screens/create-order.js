import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import Container from "react-bootstrap/Container";
import { Row, Col, FormControl, Card } from "react-bootstrap";
import ModalAddOrder from "../components/modal-add-order";

export default function CreateOrder() {
  const [guides, setGuides] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const renderGuides = () => {
    return guides.map((task) => <Card style={{marginTop:'1rem'}}><Card.Body style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>RN12345678932145EC  <Button>Ver Detalle</Button></Card.Body></Card>);
  };

  const addGuide = () => {
    setShow(true);
    setGuides([...guides, {}]);
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <ModalAddOrder show={show} close={handleClose} />
      <Row>
        <Col sm={6}>
          <Button
            variant="danger"
            style={{ display: "flex" }}
            onClick={addGuide}
          >
            NUEVO PAQUETE <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex" }}>
            <FormControl
              type="text"
              placeholder="BUSCAR GUÍA"
              className="mr-sm-2"
            />
            <Button variant="outline-success">BUSCAR</Button>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: "1rem" }}>{renderGuides()}</div>
    </Container>
  );
}
