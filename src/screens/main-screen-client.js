import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import {
  Row,
  Col,
  FormControl,
  Button,
  Container,
  ListGroup,
  Alert,
  Dropdown,
} from "react-bootstrap";
import ModalAddOrder from "../components/modal-add-order";
import { db, auth } from "../assets/firebase";
import {useHistory} from 'react-router-dom'

export default function CreateAlert() {
  const history = useHistory();
  //state
  const [show, setShow] = useState(false);
  const [guideToFind, setGuideToFind] = useState("");
  const [guideFound, setGuideFound] = useState({});
  const [cliente, setCliente] = useState({})

  //cargarUsuario
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        db.collection('users').where('uid','==',user.uid).get().then((users)=>{
          users.forEach(
            (user)=>{
              setCliente({id:user.id, ...user.data()})
            }
          )
        })
      }
    })
  }, [])

  const searchGuia = () => {
    db.collection("guias")
      .doc(guideToFind)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setGuideFound(doc.data());
        }else{
          setGuideFound(false)
        }
      });
  };

  const checkFound = () => {
    if (Object.keys(guideFound).length !== 0) {
      return (
        <ListGroup.Item className='d-flex justify-content-between'>
          {guideFound.cliente}
          <Button>
            <Icon>edit</Icon>
          </Button>
        </ListGroup.Item>
      );
    } 
    if(!guideFound){
      return (
        <Alert variant='danger'>Guia no encontrada</Alert>
      )
    }
  };
  //cerrar modal
  const handleClose = () => setShow(false);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <ModalAddOrder show={show} close={handleClose} cliente={cliente}/>
      <Row>
        <Col sm={6}>
          <Button
            variant="primary"
            style={{ display: "flex" }}
            onClick={() => {
              setShow(true);
            }}
          >
            NUEVO ALERTA DE ENVIO{" "}
            <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              type="text"
              placeholder="BUSCAR GUÍA"
              className="mr-sm-2"
              onChange={(e) => {
                setGuideToFind(e.target.value);
              }}
            />
            <Button variant="outline-success" onClick={searchGuia}>
              BUSCAR
            </Button>
            <Dropdown className='ml-2 d-flex align-items-center'>
              <Dropdown.Toggle>
                <Icon>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{auth.signOut(); history.push('/')}}>
                  Cerras Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className="mt-5">{checkFound()}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
