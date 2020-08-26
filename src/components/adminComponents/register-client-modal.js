import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Alert,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { auth } from "../../assets/firebase";
import { db } from "../../assets/firebase";
import { useHistory } from "react-router-dom";
import provincias from "../../assets/provinciasv2";
export default function RegisterClientModal() {
  //passwords
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  //estdo del boton registro
  const [buttonRegister, setButtonRegister] = useState(true);
  //datos para registro
  const [usertoRegister, setUserToRegister] = useState({});
  const history = useHistory();
  const [provinciasArray, setprovincias] = useState(provincias);
  const [cantones, setCantones] = useState([]);
  const [selectedProvice, setSelectedProvince] = useState({
    provincia: "Provincia",
  });
  const [selectedCanton, setSelectedCanton] = useState({ nombre: "Canton" });
  const [tipoId, settipoId] = useState("TIPO DE IDENTIFICACIÓN");
  const tiposIdArray = ["C.I", "RUC", "RUP", "RISE"];
  const fillCantones = (index) => {
    setCantones(provinciasArray[index].cantones);
  };

  //Habilita el boton de registro
  useEffect(() => {
    if (password === "") {
      setButtonRegister(true);
    } else {
      if (password !== passwordConf) {
        setButtonRegister(true);
      } else {
        setButtonRegister(false);
      }
    }
  }, [passwordConf]);

  //compara los campos de las Contraseñas
  const comparePasswords = () => {
    if (password === passwordConf) {
      return;
    } else {
      if (password !== "" && passwordConf === "") {
        return;
      } else {
        if (password !== passwordConf) {
          return <Alert variant="danger">Las contraseñas no coinciden</Alert>;
        }
      }
    }
  };

  //Registrar nuevo usuario
  const RegisterUser = () => {
    auth
      .createUserWithEmailAndPassword(
        usertoRegister.email,
        usertoRegister.password
      )
      .then((res) => {
        db.collection("users").add({
          ...usertoRegister,
          admin: false,
          uid: res.user.uid,
          provincia: selectedProvice.provincia,
          canton: selectedCanton.nombre,
          tipoId: tipoId,
        });
        history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  //Buscar Usuario
  const SearchUser = () => {};
  return (
    <>
      <Container>
        <Form className="mt-3">
          <Form.Group controlId="institucion">
            <Form.Control
              type="text"
              placeholder="Institución"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  institucion: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="id">
                <Form.Control
                  type="text"
                  placeholder="CI"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      id: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <DropdownButton id="tipoId" title={tipoId}>
                {tiposIdArray.map((tipo) => (
                  <Dropdown.Item
                    onSelect={() => {
                      settipoId(tipo);
                    }}
                  >
                    {tipo}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>

          <Form.Group controlId="nombre">
            <Form.Control
              type="text"
              placeholder="Nombre"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  nombre: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="apellido">
            <Form.Control
              type="text"
              placeholder="Apellido"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  apellido: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group controlId="telefono">
            <Form.Control
              type="text"
              placeholder="Telefono"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  telefono: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <DropdownButton id="Provincia" title={selectedProvice.provincia}>
                {provinciasArray.map((provincia) => (
                  <Dropdown.Item
                    key={provincia.key}
                    onSelect={() => {
                      setSelectedProvince(provincia);
                      fillCantones(provincia.key);
                    }}
                    onClick={() => {
                      setSelectedCanton({ nombre: "Canton" });
                    }}
                  >
                    {provincia.provincia}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton id="Canton" title={selectedCanton.nombre}>
                {cantones.map((canton) => (
                  <Dropdown.Item
                    key={canton.key}
                    onSelect={() => {
                      setSelectedCanton(canton);
                    }}
                  >
                    {canton.nombre}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col>
              <Form.Group controlId="parroquia">
                <Form.Control
                  type="text"
                  placeholder="Parroquia"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      parroquia: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="direccion">
            <Form.Control
              type="text"
              placeholder="Dirección"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  direccion: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="referencia">
            <Form.Control
              type="text"
              placeholder="Referencia"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  referencia: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Correo Electronico"
              onChange={(e) => {
                setUserToRegister({
                  ...usertoRegister,
                  email: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={(e) => {
                setPassword(e.target.value);
                setUserToRegister({
                  ...usertoRegister,
                  password: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group controlId="confPassword">
            <Form.Control
              type="password"
              placeholder="Confirmar Contraseña"
              onChange={(e) => {
                setPasswordConf(e.target.value);
              }}
            />
          </Form.Group>
          {comparePasswords()}
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              disabled={buttonRegister}
              onClick={RegisterUser}
              className="mb-3"
            >
              REGISTRAR
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
