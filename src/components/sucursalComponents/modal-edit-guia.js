import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Icon } from "@material-ui/core";
export default function ModalEditGuide(props) {
  const [togleEditRemitente, setTogleEditRemitente] = useState(true);
  const [togleEditRemitenteColor, setTogleEditRemitenteColor] = useState(
    "primary"
  );
  const [togleEditDestinatario, setTogleEditDestinatario] = useState(true);
  const [togleEditDestinatarioColor, setTogleEditDestinatarioColor] = useState(
    "primary"
  );
  const [togleEditContenido, setTogleEditContenido] = useState(true);
  const [togleEditContenidoColor, settogleEditContenidoColor] = useState(
    "primary"
  );

  const togleRemitente = () => {
    if (togleEditRemitenteColor === "primary") {
      setTogleEditRemitenteColor("danger");
    } else {
      setTogleEditRemitenteColor("primary");
    }
  };
  const togleDestinatario = () => {
    if (togleEditDestinatarioColor === "primary") {
      setTogleEditDestinatarioColor("danger");
    } else {
      setTogleEditDestinatarioColor("primary");
    }
  };
  const togleContenido = () => {
    if (togleEditContenidoColor === "primary") {
      settogleEditContenidoColor("danger");
    } else {
      settogleEditContenidoColor("primary");
    }
  };
  return (
    <Modal show={props.show} onHide={props.close} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>GUIDE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <div className="d-flex">
              <h3>Remitente</h3>
              <Button
                variant={togleEditRemitenteColor}
                className="ml-1"
                onClick={() => {
                  setTogleEditRemitente(!togleEditRemitente);
                  togleRemitente();
                }}
              >
                <Icon>edit</Icon>
              </Button>
            </div>

            <Form className="mt-2 align-items-center">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="CI"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nombres"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Apellidos"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Canton"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Parroquia"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Referencia"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Telefono"
                  disabled={togleEditRemitente}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <div className="d-flex">
              <h3>Destinatario</h3>
              <Button
                variant={togleEditDestinatarioColor}
                className="ml-1"
                onClick={() => {
                  setTogleEditDestinatario(!togleEditDestinatario);
                  togleDestinatario();
                }}
              >
                <Icon>edit</Icon>
              </Button>
            </div>
            <Form className="mt-2 align-items-center">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="CI"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nombres"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Apellidos"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Canton"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Parroquia"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Referencia"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Telefono"
                  disabled={togleEditDestinatario}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <hr></hr>
        <div className="d-flex">
          <h3>Contenido</h3>
          <Button
          variant={togleEditContenidoColor}
            className="ml-1"
            onClick={() => {
              setTogleEditContenido(!togleEditContenido);
              togleContenido();
            }}
          >
            <Icon>edit</Icon>
          </Button>
        </div>
        <Row className="mt-2">
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Descripción"
                disabled={togleEditContenido}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Peso"
                disabled={togleEditContenido}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Valor"
                disabled={togleEditContenido}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary">Cancelar</Button>
        <Button disabled={true}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}
