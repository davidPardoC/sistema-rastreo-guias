import React, { useState} from "react";
import { Form, Row, Col, Button, Container, InputGroup } from "react-bootstrap";
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
  const [direccionRemitente, setDireccionRemitente] = useState(props.guide.remitente.direccion);

  //Destinatario
  const [ciDestinatario, setCiDestinatario] = useState(props.guide.destinatario.ci);
  const [nombreDestinatario, setNombreDestinatario] = useState(props.guide.destinatario.nombre)
  const [apellidoDestinatario, setApellidoDestinatario] = useState(props.guide.destinatario.apellido)
  const [emailDestinatario, setemailDestinatario] = useState(props.guide.destinatario.email);
  const [provinciaDestinatario, setprovinciaDestinatario] = useState(props.guide.destinatario.provincia);
  const [cantonDestinatario, setcantonDestinatario] = useState(props.guide.destinatario.canton);
  const [parroquiaDestinatario, setparroquiaDestinatario] = useState(props.guide.destinatario.parroquia);
  const [referenciaDestinatario, setreferenciaDestinatario] = useState(props.guide.destinatario.referencia);
  const [telefonoDestinatario, settelefonoDestinatario] = useState(props.guide.destinatario.telefono);
  const [direccionDestinatario, setDireccionDestinatario] = useState(props.guide.destinatario.direccion);

  //Contenido
  const [descripcionContenido, setDescripcionContenido] = useState(props.guide.contenido.descripcion);
  const [pesoContenido, setPesoContenido] = useState(props.guide.contenido.peso);
  const [valor, setValor] = useState(props.guide.contenido.valorDeclarado);
  const [nroItems, setNroItems] = useState(props.guide.contenido.nroItems);


  //Able and disable inputs colors
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

  //update guide
  const updateGuide = () => {
    db.collection('guias').doc(`${props.guide.id}`).set({
      remitente: {
        apellido: apellidoRemitente,
        canton: cantonRemitente,
        email: emailRemitente,
        id: id,
        nombre: nombreRemitente,
        parroquia: parroquiaRemitente,
        provincia: provinciaRemitente,
        referencia: referenciaRemitente,
        telefono: telefonoRemitente,
        direccion: direccionRemitente
      },
      destinatario: {
        ci: ciDestinatario,
        nombre: nombreDestinatario,
        apellido: apellidoDestinatario,
        provincia: provinciaDestinatario,
        canton: cantonDestinatario,
        parroquia: parroquiaDestinatario,
        email: emailDestinatario,
        referencia: referenciaDestinatario,
        telefono: telefonoDestinatario,
        direccion: direccionDestinatario
      },
      contenido: {
        peso: pesoContenido,
        valorDeclarado: valor,
        descripcion: descripcionContenido,
        nroItems: nroItems
      }
    }).then(() => { props.refresh(); props.close() })
  }
  return (
    <Container>
      <h3>{props.guide.id}</h3>
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
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">C.I</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="CI"
                  disabled={togleEditRemitente}
                  value={id}
                  onChange={(e) => { setid(e.target.value) }}

                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Nombre:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Nombres"
                  disabled={togleEditRemitente}
                  value={nombreRemitente}
                  onChange={(e) => { setNombreRemitente(e.target.value) }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Apellidos:</InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                disabled={togleEditRemitente}
                value={apellidoRemitente}
                onChange={(e) => { setApellidoRemitente(e.target.value) }}
              />
              </InputGroup>
            </Form.Group>
            
            <Form.Group>
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Email:</InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Email"
                disabled={togleEditRemitente}
                value={emailRemitente}
                onChange={(e)=>{setemailRemitente(e.target.value)}}
              />
              </InputGroup>
            </Form.Group>


            <Form.Group>
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Provincia:</InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Provincia"
                disabled={togleEditRemitente}
                value={provinciaRemitente}
                onChange={(e) => { setprovinciaRemitente(e.target.value) }}

              />
              </InputGroup>



            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Canton"
                disabled={togleEditRemitente}
                value={cantonRemitente}
                onChange={(e) => { setcantonRemitente(e.target.value) }}

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Parroquia"
                disabled={togleEditRemitente}
                value={parroquiaRemitente}
                onChange={(e) => { setparroquiaRemitente(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Referencia"
                disabled={togleEditRemitente}
                value={referenciaRemitente}
                onChange={(e) => { setreferenciaRemitente(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Telefono"
                disabled={togleEditRemitente}
                value={telefonoRemitente}
                onChange={(e) => { settelefonoRemitente(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Direccion"
                disabled={togleEditRemitente}
                value={direccionRemitente}
                onChange={(e) => { setDireccionRemitente(e.target.value) }}
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
                value={ciDestinatario}
                onChange={(e) => { setCiDestinatario(e.target.value) }}

              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nombres"
                disabled={togleEditDestinatario}
                value={nombreDestinatario}
                onChange={(e) => { setNombreDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                disabled={togleEditDestinatario}
                value={apellidoDestinatario}
                onChange={(e) => { setApellidoDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Email"
                disabled={togleEditDestinatario}
                value={emailDestinatario}
                onChange={(e) => { setemailDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Provincia"
                disabled={togleEditDestinatario}
                value={provinciaDestinatario}
                onChange={(e) => { setprovinciaDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Canton"
                disabled={togleEditDestinatario}
                value={cantonDestinatario}
                onChange={(e) => { setcantonDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Parroquia"
                disabled={togleEditDestinatario}
                value={parroquiaDestinatario}
                onChange={(e) => { setparroquiaDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Referencia"
                disabled={togleEditDestinatario}
                value={referenciaDestinatario}
                onChange={(e) => { setreferenciaDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Telefono"
                disabled={togleEditDestinatario}
                value={telefonoDestinatario}
                onChange={(e) => { settelefonoDestinatario(e.target.value) }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Direccion"
                disabled={togleEditDestinatario}
                value={direccionDestinatario}
                onChange={(e) => { setDireccionDestinatario(e.target.value) }}
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
              value={descripcionContenido}
              onChange={(e) => { setDescripcionContenido(e.target.value) }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Peso"
              disabled={togleEditContenido}
              value={pesoContenido}
              onChange={(e) => { setPesoContenido(e.target.value) }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Valor"
              disabled={togleEditContenido}
              value={valor}
              onChange={(e) => { setValor(e.target.value) }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nro Items"
              disabled={togleEditContenido}
              value={nroItems}
              onChange={(e) => { setNroItems(e.target.value) }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col></Col>
        <Col><Button variant='outline-primary' onClick={props.close}>Cancelar</Button><Button variant='success' className='ml-2' onClick={updateGuide}>Guardar</Button></Col>
      </Row>
    </Container>
  );
}
