import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Icon } from "@material-ui/core";
import { db } from '../../assets/firebase'
export default function ModalEditGuide(props) {

  //Toggle to edit
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

  //setGuide
  const [guide, setGuide] = useState(props.guide)
  const [remitente, setRemitente] = useState({})

 //Remitente
 const [id, setid] = useState(props.guide.remitente.id);
 const [nombreRemitente, setNombreRemitente] = useState(props.guide.remitente.nombre)
 const [apellidoRemitente, setApellidoRemitente] = useState(props.guide.remitente.apellido)
const [emailRemitente, setemailRemitente] = useState(props.guide.remitente.email);
const [provinciaRemitente, setprovinciaRemitente] = useState(props.guide.remitente.provincia);
const [cantonRemitente, setcantonRemitente] = useState(props.guide.remitente.canton);
const [parroquiaRemitente, setparroquiaRemitente] = useState(props.guide.remitente.parroquia);
const [referenciaRemitente, setreferenciaRemitente] = useState(props.guide.remitente.referencia);
const [telefonoRemitente, settelefonoRemitente] = useState(props.guide.remitente.telefono);

  //obtrnerRemitente
  const getRemitente = () => {
    db.collection('users').doc(`${guide.remitente}`).get().then((doc) => {
      setRemitente({ id: doc.id, ...doc.data() })
    })
  }


  useEffect(() => {
    getRemitente()
  }, [guide])

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
    <Container>
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
                value={id}
                onChange={(e) => { setid(e.target.value)}}

              />

            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nombres"
                disabled={togleEditRemitente}
                value={nombreRemitente}
                onChange={(e) => { setNombreRemitente(e.target.value)}}
                

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                disabled={togleEditRemitente}
                value={apellidoRemitente}
                onChange={(e) => { setApellidoRemitente(e.target.value)}}

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Email"
                disabled={togleEditRemitente}
                value={emailRemitente}

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Provincia"
                disabled={togleEditRemitente}
                value={provinciaRemitente}

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Canton"
                disabled={togleEditRemitente}
                value={cantonRemitente}

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Parroquia"
                disabled={togleEditRemitente}
                value={parroquiaRemitente}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Referencia"
                disabled={togleEditRemitente}
                value={referenciaRemitente}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Telefono"
                disabled={togleEditRemitente}
                value={telefonoRemitente}
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
                //value={ciDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nombres"
                disabled={togleEditDestinatario}
                value={guide.nombreDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                disabled={togleEditDestinatario}
                value={guide.apellidoDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Email"
                disabled={togleEditDestinatario}
                value={guide.emailDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Provincia"
                disabled={togleEditDestinatario}
                value={guide.provinciaDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Canton"
                disabled={togleEditDestinatario}
                value={guide.cantonDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Parroquia"
                disabled={togleEditDestinatario}
                value={guide.parroquiaDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Referencia"
                disabled={togleEditDestinatario}
                value={guide.referenciaDestinatario}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Telefono"
                disabled={togleEditDestinatario}
                value={guide.telefonoDestinatario}
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
              value={guide.descripcionEnvio}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Peso"
              disabled={togleEditContenido}
              value={guide.pesoEnvio}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Valor"
              disabled={togleEditContenido}
              value={guide.valorDeclarado}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}
