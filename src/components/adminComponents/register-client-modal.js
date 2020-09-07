import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Alert,
  Col
} from "react-bootstrap";
import { db, functions } from "../../assets/firebase";

export default function RegisterClientModal(props) {

  //passwords
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  //estdo del boton registro
  const [buttonRegister, setButtonRegister] = useState(true);
  //datos para registro
  const [usertoRegister, setUserToRegister] = useState({});

  
  const [tipoId, settipoId] = useState("C.I");
  

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
  }, [passwordConf, password]);

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

  //Registrar nuevo usuario con Custom Claim
  const RegisterUser = () => {
    const addUser = functions.httpsCallable("addUser");
    addUser({
      email: usertoRegister.email,
      password: usertoRegister.password,
      role: "client",
    })
      .then((data) => {
          db.collection('users').doc(usertoRegister.id).set({
            ...usertoRegister,
            tipoId: tipoId,
            uid:data.data.uid
          }).catch((err)=>{alert(err)})
      
      })
      .catch((e) => {
        alert(e);
      });
    props.hide()
  };

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
                  type="number"
                  placeholder={tipoId}
                  onChange={(e) => {
                    setUserToRegister(
                      {
                        ...usertoRegister,
                        id:e.target.value
                      }
                    )
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
             <select style={{border:'solid 1px black', padding:'0.5rem' , borderRadius:'1rem'}} onChange={(e)=>settipoId(e.target.value)}>
                <option>TIPO</option>
               <option value='RUC'>RUC</option>
               <option value='CI'>CI</option>
               <option value='RUP'>RUP</option>
               <option value='RISE'>RISE</option>
             </select>
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
            <Form.Group controlId="provincia">
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      provincia: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="canton">
                <Form.Control
                  type="text"
                  placeholder="Canton"
                  onChange={(e) => {
                    setUserToRegister({
                      ...usertoRegister,
                      canton: e.target.value,
                    });
                  }}
                />
              </Form.Group>
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
