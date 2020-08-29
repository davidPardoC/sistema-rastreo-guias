import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
export default function ModalAddOrder(props) {
  //datos destinatario
  const [ci, setci] = useState()
  const [tipoId, settipoId] = useState()
  const [provincia, setprovincia] = useState()
  const [canton, setcanton] = useState()
  const [parroquia, setparroquia] = useState()
  const [direccion, setdireccion] = useState()
  const [email, setemail] = useState()
  const [referencia, setreferencia] = useState()
  const [telefono, settelefono] = useState()
  const [nroItems, setnroItems] = useState()
  const [peso, setpeso] = useState()
  const [descripcion, setdescripcion] = useState()
  

  return (
    <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Paquete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h3>Remitente</h3>
            <ListGroup>
              <ListGroup.Item>
                {`${props.cliente.nombre} ${props.cliente.apellido}`}
              </ListGroup.Item>
              <ListGroup.Item>
                {`${props.cliente.tipoId}: ${props.cliente.id}`}
              </ListGroup.Item>
              <ListGroup.Item>
                {`Direccion: ${props.cliente.direccion}`}
              </ListGroup.Item>
              <ListGroup.Item>
                {`Provincia: ${props.cliente.provincia}`}
              </ListGroup.Item>
              <ListGroup.Item>
                {`Canton: ${props.cliente.canton}`}
              </ListGroup.Item>
              <ListGroup.Item>
                {`Parroquia: ${props.cliente.parroquia}`}
              </ListGroup.Item>
              <ListGroup.Item>{`Email: ${props.cliente.email}`}</ListGroup.Item>
              <ListGroup.Item>
                {`Telefono: ${props.cliente.telefono}`}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col>
            <h3>Destinatario</h3>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="CI Remitente" />
                </Form.Group>
              </Col>

              <Col>
                <select>
                  <option>RUC</option>
                  <option>RUP</option>
                  <option>CI</option>
                  <option>RISE</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="Provincia" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="Canton" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="Parroquia" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
                  <Form.Control placeholder="Dirección" />
                </Form.Group>
                <Form.Group>
                  <Form.Control placeholder="Email" />
                </Form.Group>
                <Form.Group>
                  <Form.Control placeholder="Referencia" />
                </Form.Group>
                <Form.Group>
                  <Form.Control placeholder="Telefono" />
                </Form.Group>
                <hr></hr>
                <Form.Group>
                  <Form.Control placeholder="Nro Items" type='number'/>
                </Form.Group>
                <Form.Group>
                  <Form.Control placeholder="Peso (Gramos)" type='number' />
                </Form.Group>
                <Form.Group>
                  <Form.Control placeholder="Valor declarado (USD)" type='number' />
                </Form.Group>
                <Form.Group>
                  <Form.Control placeholder="Descripcion" />
                </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          CANCELAR
        </Button>
        <Button variant="primary" onClick={props.close}>
          CREAR GUIA
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
