import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { Icon } from "@material-ui/core";
import { db } from "../../assets/firebase";
import NewNaturalCustomer from "../shared/form-new-customer";
export default function ModalAddGuide(props) {
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
  const [peso, setpeso] = useState(0);
  const [valor, setvalor] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [btnRegisterGuide, setbtnRegisterGuide] = useState(true);

  //customer to find
  const [customerToFind, setCustomerToFind] = useState("");
  const [cliente, setcliente] = useState({ nombre: "", apellido: "" });

  //check
  const [showAlertEmail, setshowAlertEmail] = useState(false);
  const [charging, setCharging] = useState(false);
  const [charged, setCharged] = useState(false);
  const [userNotFoundAlert, setUserNotFoundAlert] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(true);

  //new cliente
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const registerGuide = () => {
    delete cliente.password;
    delete cliente.uid;
    var countRef = db.collection("stats").doc("guiasRecords");
    db.runTransaction((transaction) => {
      return transaction
        .get(countRef)
        .then((count) => {
          if (!count.exists) {
            return;
          } else {
            db.collection("guias")
              .doc(`RF${count.data().count}EC`)
              .set({
                createdBy: props.sucursal,
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
                  peso: peso,
                  valorDeclarado: valor,
                  descripcion: descripcion,
                },
              });
            props.returnGuideId(`RF${count.data().count}EC`);
            var increment = count.data().count + 1;
            transaction.update(countRef, { count: increment });
          }
        })
        .then(props.close());
    });
  };

  const searchUser = (guideOp) => {
    setCharging(true);
    db.collection("users")
      .doc(guideOp)
      .get()
      .then((user) => {
        if (user.exists) {
          setUserNotFoundAlert(false);
          setcliente(user.data());
          setCharging(false);
          setCharged(true);
        } else {
          setUserNotFoundAlert(true);
          setCharging(false);
        }
      });
  };
  const checkDestinataryInputs = () => {
    if (customerToFind === "") {
      setToggleSearch(true);
    } else {
      setToggleSearch(false);
    }
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
      nombre === "" ||
      apellido === "" ||
      tipoId === "" ||
      provincia === "" ||
      canton === "" ||
      parroquia === "" ||
      direccion === "" ||
      referencia === "" ||
      telefono === "" ||
      descripcion === ""
    ) {
      setbtnRegisterGuide(true);
    } else {
      setbtnRegisterGuide(false);
    }
    if (!charged) {
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
    charged,
    customerToFind,
  ]);
  return (
    <Container>
      <Row>
        <Col className="mt-1">
          <h3>Remitente</h3>
          <div className="d-flex align-items-center">
            <FormControl
              placeholder="CI Cliente"
              value={customerToFind}
              onChange={(e) => {
                setCustomerToFind(e.target.value);
              }}
            />
            <Button
              className="ml-1"
              onClick={()=>{searchUser(customerToFind)}}
              disabled={toggleSearch}
            >
              <Icon>search</Icon>
            </Button>
          </div>
          {userNotFoundAlert && (
            <Alert variant="danger">Usuario no encontrado</Alert>
          )}
          {charging && (
            <div className="d-flex justify-content-center mt-2">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          {charged && (
            <ListGroup className="mt-3">
              <ListGroup.Item>
                {`${cliente.nombre} ${cliente.apellido}`}
              </ListGroup.Item>
              <ListGroup.Item>
                {`${cliente.provincia}, ${cliente.canton}, ${cliente.parroquia}`}
              </ListGroup.Item>
              <ListGroup.Item>{`${cliente.telefono}`}</ListGroup.Item>
              <ListGroup.Item>{`${cliente.email}`}</ListGroup.Item>
            </ListGroup>
          )}

          <Button
            className="mt-2"
            onClick={() => {
              setShowNewCustomerForm(!showNewCustomerForm);
            }}
          >
            Nuevo Cliente
          </Button>

          {showNewCustomerForm && (
            <NewNaturalCustomer
              show={setShowNewCustomerForm}
              search={searchUser}
              setCi={setCustomerToFind}
            />
          )}
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
              placeholder="Nombre o Razon Social*"
              onChange={(e) => {
                setnombre(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Apellido*"
              onChange={(e) => {
                setapellido(e.target.value);
              }}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  placeholder="Provincia*"
                  onChange={(e) => {
                    setprovincia(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  placeholder="Cantón*"
                  onChange={(e) => {
                    setcanton(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  placeholder="Parroquia*"
                  onChange={(e) => {
                    setparroquia(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Control
              placeholder="Dirección*"
              onChange={(e) => {
                setdireccion(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              placeholder="Referencia*"
              onChange={(e) => {
                setreferencia(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              placeholder="Teléfono*"
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
              placeholder="Descripción*"
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
          <Form.Group>
            <Form.Control
              placeholder="Peso"
              type="number"
              onChange={(e) => {
                setpeso(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex flex-row-reverse bd-highlight">
        <div className="p-2 bd-highlight">
          <Button
            className="ml-2"
            variant="primary"
            disabled={btnRegisterGuide}
            onClick={registerGuide}
          >
            CREAR GUIA
          </Button>
        </div>
        <div className="p-2 bd-highlight">
          <Button variant="secondary" onClick={props.closeNoConfirm}>
            CANCELAR
          </Button>
        </div>
      </div>
    </Container>
  );
}
