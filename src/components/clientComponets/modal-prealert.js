import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { db } from "../../assets/firebase";
export default function ModalPreAlert(props) {
  //datos destinatario
  const [ci, setci] = useState();
  const [nombre, setnombre] = useState("");
  const [apellido, setapellido] = useState("");
  const [tipoId, settipoId] = useState("CI");
  const [provincia, setprovincia] = useState("");
  const [canton, setcanton] = useState("");
  const [parroquia, setparroquia] = useState("");
  const [direccion, setdireccion] = useState("");
  const [email, setemail] = useState("");
  const [referencia, setreferencia] = useState("");
  const [telefono, settelefono] = useState("");
  const [nroItems, setnroItems] = useState("");
  const [valor, setvalor] = useState("");
  const [descripcion, setdescripcion] = useState("");

  //cliente
  const [cliente, setcliente] = useState(props.cliente);

  //Boton Registro
  const [btnRegisterGuide, setbtnRegisterGuide] = useState(true);
  const [showAlertEmail, setshowAlertEmail] = useState(false);
  useEffect(() => {
    setcliente(props.cliente);
    delete cliente.password;
    delete cliente.uid;
  }, [props]);

  const registerGuide = () => {
    var countRef = db.collection('stats').doc('guiasRecords');
    db.runTransaction((transaction)=>{
      return transaction.get(countRef).then((count)=>{
        if(!count.exists){
          return
        }else{
          db.collection('guias').doc(`RF${count.data().count}EC`).set({
            createdBy: "Cliente",
            remitente: cliente,
            destinatario: {
              ci: ci,
              nombre: nombre,
              apellido: apellido,
              tipoId: tipoId,
              provincia: provincia,
              canton: canton,
              parroquia: parroquia,
              direccion: direccion,
              email: email,
              referencia: referencia,
              telefono: telefono,
            },
            contenido: {
              nroItems: nroItems,
              peso: 0,
              valorDeclarado: valor,
              descripcion: descripcion,
            }
          })
          props.returnGuideId(`RF${count.data().count}EC`);
          var increment = count.data().count+1;
          transaction.update(countRef, {count:increment});
        }
      }).then(props.close());
    })
  };
  
  const checkDestinataryInputs = () => {
    if (email.includes("@") && email.includes(".")) {
      setshowAlertEmail(false);
      setbtnRegisterGuide(false);
    } else {
      if (email === "") {
        setshowAlertEmail(false);
      } else {
        setshowAlertEmail(true);
      }
    }
    if (
      ci === "" ||
      nombre === "" ||
      apellido === "" ||
      tipoId === "" ||
      provincia === "" ||
      canton === "" ||
      parroquia === "" ||
      direccion === "" ||
      referencia === "" ||
      telefono === "" ||
      nroItems === "" ||
      valor === "" ||
      descripcion === ""
    ) {
      setbtnRegisterGuide(true);
    } else {
      setbtnRegisterGuide(false);
    }
  };
  useEffect(checkDestinataryInputs, [
    ci,
    nombre,
    apellido,
    tipoId,
    provincia,
    canton,
    parroquia,
    direccion,
    email,
    referencia,
    telefono,
    nroItems,
    valor,
    descripcion,
  ]);

  return (
    <Modal
      show={props.show}
      onHide={props.closeNoConfirm}
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Paquete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h3>Remitente</h3>
            <ListGroup.Item>{`${props.cliente.institucion}`}</ListGroup.Item>
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
                  onChange={(e) => {
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
                    placeholder="Cantón"
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
                placeholder="Referencia"
                onChange={(e) => {
                  setreferencia(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Teléfono"
                onChange={(e) => {
                  settelefono(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Group>
            {showAlertEmail && <Alert variant="danger">Email no valido</Alert>}
            <h5>Envío</h5>
            <Form.Group>
              <Form.Control
                placeholder="Descripción"
                onChange={(e) => {
                  setdescripcion(e.target.value);
                }}
              />
            </Form.Group>
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
                placeholder="Valor declarado (USD)"
                type="number"
                onChange={(e) => {
                  setvalor(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeNoConfirm}>
          CANCELAR
        </Button>
        <Button
          variant="primary"
          disabled={btnRegisterGuide}
          onClick={registerGuide}
        >
          CREAR GUIA
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
