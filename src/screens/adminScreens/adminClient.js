import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { Icon } from "@material-ui/core";
import { db, auth } from "../../assets/firebase";

//Components
import RegisterClientModal from "../../components/adminComponents/register-client-modal";

export default function AdminClients() {
  const [modalRegistroCliente, setmodalRegistroCliente] = useState(false);

  const [userToFind, setuserToFind] = useState("");
  const [userFound, setuserFound] = useState({});
  const [showLoading, setshowLoading] = useState(false);

  const closeModalRegister = () => {
    setmodalRegistroCliente(false);
  };

  //Buscar Usuario
  const SearchUser = () => {
    setshowLoading(true);
    db.collection("users")
      .doc(userToFind)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setuserFound({ id: doc.id, ...doc.data() });
          setshowLoading(false);
        } else {
          setuserFound(false);
          setshowLoading(false);
        }
      })
      .catch();
  };
//Borrar Usuario 
const deleteUser = () => {
  console.log(auth.currentUser)
}

  const checkFound = () => {
    if (Object.keys(userFound).length !== 0) {
      return (
        <ListGroup className="mt-5 d-flex justify-content-between">
          <ListGroup.Item className="d-flex justify-content-between">
            {`${userFound.nombre} ${userFound.apellido}`}
            <div>
              <Button onClick={()=>{}}>
                <Icon>edit</Icon>
              </Button>
              <Button variant="danger" className="ml-3" onClick={deleteUser}>
                <Icon>delete</Icon>
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    if (!userFound) {
      return <Alert variant="danger">Usuario no encontrado.</Alert>;
    }
  };
  return (
    <Container className="mt-3">
      <Modal show={modalRegistroCliente} onHide={closeModalRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Cliente</Modal.Title>
        </Modal.Header>
        <RegisterClientModal hide={closeModalRegister} />
      </Modal>
      <Row>
        <Col sm={6}>
          <Button
            className='d-flex align-items-center"'
            variant="outline-primary"
            onClick={() => {
              setmodalRegistroCliente(true);
            }}
          >
            Nuevo Cliente
            <Icon className="ml-1">person</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Control
              type="text"
              placeholder="CI / RUC"
              className="mr-sm-2"
              onChange={(e) => {
                setuserToFind(e.target.value);
              }}
            />
            <Button onClick={SearchUser}>
              <Icon>search</Icon>
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {showLoading && (
          <Col className="d-flex justify-content-center">
            <img src={require("../../assets/images/loading.gif")} />
          </Col>
        )}
      </Row>
      <Row>
        <Col>{checkFound()}</Col>
      </Row>
    </Container>
  );
}
