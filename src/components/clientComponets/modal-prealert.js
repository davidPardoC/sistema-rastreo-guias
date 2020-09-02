import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import { db } from "../../assets/firebase";
export default function ModalPreAlert(props) {

  //datos destinatario
  const [ci, setci] = useState();
  const [nombre, setnombre] = useState()
  const [apellido, setapellido] = useState()
  const [tipoId, settipoId] = useState("CI");
  const [provincia, setprovincia] = useState();
  const [canton, setcanton] = useState();
  const [parroquia, setparroquia] = useState();
  const [direccion, setdireccion] = useState();
  const [email, setemail] = useState();
  const [referencia, setreferencia] = useState();
  const [telefono, settelefono] = useState();
  const [nroItems, setnroItems] = useState();
  const [peso, setpeso] = useState();
  const [valor, setvalor] = useState();
  const [descripcion, setdescripcion] = useState();

  const registerGuide = () => {
    db.collection("stats")
      .doc("guiasRecords")
      .get()
      .then((doc) => {
        db.collection("guias")
          .doc(`RN${doc.data().count}EC`)
          .set({
            remitente: props.cliente,
            destinatario:{
              ci: ci,
              nombre:nombre,
              apellido:apellido,
              tipoId: tipoId,
              provincia: provincia,
              canton: canton,
              parroquia: parroquia,
              direccion: direccion,
              email: email,
              referencia: referencia,
              telefono: telefono,
            },
            contenido:{
              nroItems: nroItems,
              peso: peso,
              valorDeclarado: valor,
              descripcion: descripcion,
            }
          })
          .then((e) => {
            db.collection("guias")
              .doc(`RN${doc.data().count}EC`)
              .collection("estados")
              .add({
                descripcion: "prealertado",
                date: new Date()
              });

              db.collection('stats').doc('guiasRecords').set({
                count:doc.data().count+1
              })
          });
      });
    props.close();
  };
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
                  <Form.Control
                    placeholder="CI Destinatario"
                    onChange={(e) => {
                      setci(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col>
                <select
                  placeholder="TIPO"
                  defaultValue="CI"
                  onSelect={(e) => {
                    settipoId(e.target.value);
                  }}
                >
                  <option value="RUC">RUC</option>
                  <option value="RUP">RUP</option>
                  <option value="CI">CI</option>
                  <option value="RISE">RISE</option>
                </select>
              </Col>
            </Row>
            <Form.Group>
                  <Form.Control
                    placeholder="Nombre"
                    onChange={(e) => {
                      setnombre(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    placeholder="Apellido"
                    onChange={(e) => {
                      setapellido(e.target.value);
                    }}
                  />
                </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    placeholder="Provincia"
                    onChange={(e) => {
                      setprovincia(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    placeholder="Canton"
                    onChange={(e) => {
                      setcanton(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    placeholder="Parroquia"
                    onChange={(e) => {
                      setparroquia(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Control
                placeholder="Dirección"
                onChange={(e) => {
                  setdireccion(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Referencia"
                onChange={(e) => {
                  setreferencia(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Telefono"
                onChange={(e) => {
                  settelefono(e.target.value);
                }}
              />
            </Form.Group>
            <hr></hr>
            <Form.Group>
              <Form.Control
                placeholder="Nro Items"
                type="number"
                onChange={(e) => {
                  setnroItems(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Peso (Gramos)"
                type="number"
                onChange={(e) => {
                  setpeso(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Valor declarado (USD)"
                type="number"
                onChange={(e) => {
                  setvalor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Descripcion"
                onChange={(e) => {
                  setdescripcion(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          CANCELAR
        </Button>
        <Button variant="primary" onClick={registerGuide}>
          CREAR GUIA
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
