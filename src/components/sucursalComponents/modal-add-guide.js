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
  const [cliente, setcliente] = useState({nombre:'',apellido:''});

  //check
  const [showAlertEmail, setshowAlertEmail] = useState(false);
  const [charging, setCharging] = useState(false);
  const [charged, setCharged] = useState(false);
  const [userNotFoundAlert, setUserNotFoundAlert] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(true);

  const registerGuide = () => {
    delete cliente.password;
    delete cliente.uid;
    db.collection("stats")
      .doc("guiasRecords")
      .get()
      .then((doc) => {
        db.collection("guias")
          .doc(`RF${doc.data().count}EC`)
          .set({
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
            },
          })
          .then((res) => {
            //props.returnGuideId(`RF${doc.data().count}EC`);
            db.collection("guias")
              .doc(`RF${doc.data().count}EC`)
              .collection("estados")
              .add({
                descripcion: "prealertado",
                date: new Date(),
              });
            db.collection("stats")
              .doc("guiasRecords")
              .set({
                count: doc.data().count + 1,
              });
          });
      });
  };

  const searchUser = () => {
      setCharging(true)
    db.collection("users")
      .doc(customerToFind)
      .get()
      .then((user) => {
        if(user.exists){
            setUserNotFoundAlert(false)
            setcliente(user.data());
            setCharging(false)
            setCharged(true)
        }else{
            setUserNotFoundAlert(true)
            setCharging(false)
        }
        
      });
  };
  const checkDestinataryInputs = () => {
    if(customerToFind==''){
      setToggleSearch(true)
    }else{
      setToggleSearch(false)
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
    if(!charged){
        setbtnRegisterGuide(true)
    }else{
        setbtnRegisterGuide(false)
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
      email === "" ||
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
  useEffect(() => {
    checkDestinataryInputs();
  }, [
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
    customerToFind
  ]);
  return (
    <Container>
      <Row>
        <Col className="mt-1">
        <h3>Remitente</h3>
          <div className="d-flex align-items-center">
            <FormControl
              placeholder="CI Cliente"
              onChange={(e) => {
                setCustomerToFind(e.target.value);
              }}
            />
            <Button className="ml-1" onClick={searchUser} disabled={toggleSearch}>
              <Icon>search</Icon>
            </Button>
          </div>
          {userNotFoundAlert && <Alert variant='danger'>Usuario no encontrado</Alert>}
         {charging && <div className='d-flex justify-content-center mt-2'>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>}
          {charged && <ListGroup className='mt-3'>
              <ListGroup.Item>
                {`${cliente.nombre} ${cliente.apellido}`}
              </ListGroup.Item>
              <ListGroup.Item>
              {`${cliente.provincia}, ${cliente.canton}, ${cliente.parroquia}`}
              </ListGroup.Item>
              <ListGroup.Item>
              {`${cliente.telefono}`}
              </ListGroup.Item>
              <ListGroup.Item>
              {`${cliente.email}`}
              </ListGroup.Item>
          </ListGroup>}
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
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Form.Group>
          {showAlertEmail && <Alert variant="danger">Email no valido</Alert>}
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
          <Button variant="secondary" onClick={props.close}>
            CANCELAR
          </Button>
        </div>
      </div>
    </Container>
  );
}
