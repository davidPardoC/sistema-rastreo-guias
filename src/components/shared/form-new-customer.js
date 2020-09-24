import React, { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { db } from "../../assets/firebase";
export default function NewNaturalCustomer(props) {
  const [tipoId, settipoId] = useState("CI");
  const [ci, setci] = useState();
  const [nombre, setnombre] = useState("");
  const [provincia, setprovincia] = useState("");
  const [canton, setcanton] = useState("");
  const [parroquia, setparroquia] = useState("");
  const [email, setemail] = useState("");
  const [telefono, settelefono] = useState("");
  const [apellido, setapellido] = useState("");
  const [showErrorAlreadyExist, setshowErrorAlreadyExist] = useState(false);

  const addUser = () => {
    db.collection("users")
      .doc(ci)
      .get()
      .then((user) => {
        if (user.exists) {
          setshowErrorAlreadyExist(true);
        } else {
          db.collection("users")
            .doc(ci)
            .set({
              tipoUsuario: "natural",
              apellido: apellido,
              tipoId: tipoId,
              ci: ci,
              nombre: nombre,
              provincia: provincia,
              canton: canton,
              parroquia: parroquia,
              email: email,
              telefono: telefono,
            })
            .then(() => {
              props.search(ci);
              props.show(false);
            })
        }
      });
  };
  return (
    <div>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Control
              placeholder="CI"
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
      {showErrorAlreadyExist && (
        <Alert variant="danger">El usuario ya se encuentra registrado</Alert>
      )}
      <Button
        variant="dark"
        onClick={() => {
          props.show(false);
        }}
      >
        Cancelar
      </Button>
      <Button className="ml-2" onClick={addUser}>
        Agregar
      </Button>
    </div>
  );
}
