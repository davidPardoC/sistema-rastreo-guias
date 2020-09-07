import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Alert,
  Col,
} from "react-bootstrap";
import { db, functions } from "../../assets/firebase";
export default function EditClientModal(props) {
  const [institucion, setinstitucion] = useState(props.cliente.institucion);
  const [id, setid] = useState(props.cliente.id);
  const [tipoId, settipoId] = useState(props.cliente.tipoId);
  const [nombre, setNombre] = useState(props.cliente.nombre);
  const [apellido, setApellido] = useState(props.cliente.apellido);
  const [telefono, setTelefono] = useState(props.cliente.telefono);
  const [provincia, setProvincia] = useState(props.cliente.provincia);
  const [canton, setCanton] = useState(props.cliente.canton);
  const [parroquia, setParroquia] = useState(props.cliente.parroquia);
  const [direccion, setdireccion] = useState(props.cliente.direccion)
  const [referencia, setreferencia] = useState(props.cliente.referencia)
  const [email, setemail] = useState(props.cliente.email)
  const [password, setpassword] = useState(props.cliente.password)
  const [confPassword, setConfPassword] = useState(props.cliente.password)
  const [buttonRegister, setButtonRegister] = useState(true);

  const updateCustomer = ()=>{
    const updateUser = functions.httpsCallable('updateUser');
    updateUser({uid:props.cliente.uid, email:email,password:password}).then(()=>{
        db.collection('users').doc(id).set(
            {
                institucion:institucion,
                id:id,
                tipoId:tipoId,
                nombre:nombre,
                apellido:apellido,
                telefono:telefono,
                provincia:provincia,
                canton:canton,
                parroquia:parroquia,
                direccion:direccion,
                referencia:referencia,
                email:email,
                password:password
            }
        )
    })
    props.hide()
  }

  //Habilita el boton de registro
  useEffect(() => {
    if (password === "") {
      setButtonRegister(true);
    } else {
      if (password !== confPassword) {
        setButtonRegister(true);
      } else {
        setButtonRegister(false);
      }
    }
  }, [confPassword,  password]);
  

  const comparePasswords = () => {
    if (password === confPassword) {
      return;
    } else {
      if (password !== "" && confPassword === "") {
        return;
      } else {
        if (password !== confPassword) {
          return <Alert variant="danger">Las contraseñas no coinciden</Alert>;
        }
      }
    }
  };
  return (
    <>
      <Container>
        <Form.Group>
          <Form.Control
            placeholder="Institucion"
            value={institucion}
            onChange={(e) => {
              setinstitucion(e.target.value);
            }}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Institucion"
                value={id}
                onChange={(e) => {
                  setid(e.target.value);
                }}
                disabled={true}
              />
            </Form.Group>
          </Col>
          <Col>
            <select
              style={{
                border: "solid 1px black",
                padding: "0.5rem",
                borderRadius: "1rem",
              }}
              onChange={(e) => settipoId(e.target.value)}
              value={tipoId}
            >
              <option>TIPO</option>
              <option value="RUC">RUC</option>
              <option value="CI">CI</option>
              <option value="RUP">RUP</option>
              <option value="RISE">RISE</option>
            </select>
          </Col>
        </Row>
        <Form.Group>
          <Form.Control
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => {
              setApellido(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);
            }}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Provincia"
                value={provincia}
                onChange={(e) => {
                  setProvincia(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Canton"
                value={canton}
                onChange={(e) => {
                  setCanton(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Parroquia"
                value={parroquia}
                onChange={(e) => {
                  setParroquia(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
              <Form.Control
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => {
                  setdireccion(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Referencia"
                value={referencia}
                onChange={(e) => {
                  setreferencia(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
              type='password'
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
              type='password'
                placeholder="Confirmar Contraseña"
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
              />
            </Form.Group>
            {comparePasswords()}
            <div className='d-flex justify-content-center'>
            <Button variant='outline-primary  mb-4' >CANCELAR</Button>
            <Button className='ml-3 mb-4' onClick={updateCustomer} disabled={buttonRegister}>GUARDAR</Button>
            </div>
            
      </Container>
    </>
  );
}
