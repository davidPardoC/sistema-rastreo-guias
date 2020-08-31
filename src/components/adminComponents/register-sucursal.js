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
export default function RegisterSucursal(props) {
  const [agenciado, setAgenciado] = useState('');
  const [id, setid] = useState('');
  const [tipoId, settipoId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefonoCelular, setTelefonoCelular] = useState('');
  const [telefonoFijo, setTelefonoFijo] = useState('');
  const [provincia, setProvincia] = useState('');
  const [canton, setCanton] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [direccion, setdireccion] = useState('')
  const [referencia, setreferencia] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [buttonRegister, setButtonRegister] = useState(true);

  const addSucursal = ()=>{
    const addUser = functions.httpsCallable('addUser');
    addUser({email:email, password:password, role:'sucursal'}).then((data)=>{
        db.collection('sucursales').doc(id).set(
            {
                agenciado:agenciado,
                id:id,
                tipoId:tipoId,
                nombreResponsable:nombre,
                apellidoResponsable:apellido,
                telefonoFijo:telefonoFijo,
                telefonoCelular:telefonoCelular,
                provincia:provincia,
                canton:canton,
                parroquia:parroquia,
                direccion:direccion,
                referencia:referencia,
                email:email,
                password:password,
                uid:data.data.uid
            }
        ).then().catch((error)=>{alert(error)})
    }).catch((error)=>(alert(error)))
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
            placeholder="Agenciado"
            value={agenciado}
            onChange={(e) => {
              setAgenciado(e.target.value);
            }}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Id"
                value={id}
                onChange={(e) => {
                  setid(e.target.value);
                }}
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
            placeholder="Nombre del Responsable"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Apellido del Responsable"
            value={apellido}
            onChange={(e) => {
              setApellido(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Telefono Celular"
            value={telefonoCelular}
            onChange={(e) => {
              setTelefonoCelular(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Telefono Fijo"
            value={telefonoFijo}
            onChange={(e) => {
              setTelefonoFijo(e.target.value);
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
            <Button variant='outline-primary  mb-4' onClick={props.hide}>CANCELAR</Button>
            <Button className='ml-3 mb-4' onClick={addSucursal} disabled={buttonRegister}>GUARDAR</Button>
            </div>
            
      </Container>
    </>
  );
}
