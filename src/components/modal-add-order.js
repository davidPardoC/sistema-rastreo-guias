import React, {  useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
export default function ModalAddOrder(props) {
  const [tipoRemitente, setTipoRemitente] = useState("TIPO");
  const [tipoDestinatario, setTipoDestinatario] = useState("TIPO");
  return (
    <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Paquete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h3>Remitente</h3>
            <Form>
              <Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder="C.I Remitente" />
                  <Dropdown style={{ marginLeft: "1rem" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {tipoRemitente}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() => {
                          setTipoRemitente("RUC");
                        }}
                      >
                        RUC
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => {
                          setTipoRemitente("CEDULA");
                        }}
                      >
                        CEDULA
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Form.Group>
              <Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder="Nombres" />
                  <Form.Control
                    style={{ marginLeft: "1rem" }}
                    type="text"
                    placeholder="Apellidos"
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Dirección" />
              </Form.Group>

              <div style={{ display: "flex" }}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Peso en Gramos" />
                </Form.Group>
                <Form.Group style={{marginLeft:'1rem'}}>
                  <Form.Control
                    type="number"
                    placeholder="Valor declarado (USD)"
                  />
                </Form.Group>
              </div>

              <div style={{ display: "flex" }}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Provincia" />
                </Form.Group>
                <Form.Group style={{marginLeft:'1rem'}}>
                  <Form.Control
                    type="text"
                    placeholder="Canton"
                  />
                </Form.Group>
                <Form.Group style={{marginLeft:'1rem'}}>
                  <Form.Control
                    type="text"
                    placeholder="Parroquia"
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Control type="text" placeholder="Email" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Descripción" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Referencia" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Teléfono" />
              </Form.Group>
            </Form>
          </Col>

          <Col>
            <h3>Destinatario</h3>
            <Form>
              <Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder="C.I Destinatario" />
                  <Dropdown style={{ marginLeft: "1rem" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {tipoDestinatario}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() => {
                          setTipoDestinatario("RUC");
                        }}
                      >
                        RUC
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => {
                          setTipoDestinatario("CEDULA");
                        }}
                      >
                        CEDULA
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Form.Group>

              <Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder="Nombres" />
                  <Form.Control
                    style={{ marginLeft: "1rem" }}
                    type="text"
                    placeholder="Apellidos"
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Control type="text" placeholder="Dirección" />
              </Form.Group>
              <div style={{ display: "flex" }}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Peso en Gramos" />
                </Form.Group>
                <Form.Group style={{marginLeft:'1rem'}}>
                  <Form.Control
                    type="number"
                    placeholder="Valor declarado (USD)"
                  />
                </Form.Group>
              </div>
              <div style={{ display: "flex" }}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Provincia" />
                </Form.Group>
                <Form.Group style={{marginLeft:'1rem'}}>
                  <Form.Control
                    type="text"
                    placeholder="Canton"
                  />
                </Form.Group>
                <Form.Group style={{marginLeft:'1rem'}}>
                  <Form.Control
                    type="text"
                    placeholder="Parroquia"
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Control type="text" placeholder="Email" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Descripción" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Referencia" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Teléfono" />
              </Form.Group>
            </Form>
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
