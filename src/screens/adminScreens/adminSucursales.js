import React, { useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  ListGroup,
  Modal,
  Form,
  Alert
} from "react-bootstrap";
import Icon from "@material-ui/core/Icon";
import RegisterSucursal from "../../components/adminComponents/register-sucursal";
import EditSucursal from '../../components/adminComponents/edit-sucursal'
import { db, functions } from "../../assets/firebase";
export default function AdminSucursales() {
  const [showNuevaSucursal, setShowNuevaSucursal] = useState(false);
  const [showEditSucursal, setShowEditSucursal] = useState(false)
  const [sucursalToFind, setSucursalToFind] = useState("");
  const [sucursalFound, setSucursalFound] = useState({})
  const [showLoading, setshowLoading] = useState(false);

  const closeModalRegister = () => {
    setShowNuevaSucursal(false);
  };
  const closeModalEdit = ()=>{
    setShowEditSucursal(false)
  }

  const SearchSucursal = () => {
    setshowLoading(true);
    db.collection("sucursales")
      .doc(sucursalToFind)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setSucursalFound({ id: doc.id, ...doc.data() });
          setshowLoading(false);
          console.log(sucursalFound)
        } else {
          setSucursalFound(false);
          setshowLoading(false);
        }
      })
      .catch();
  };
  const deleteUser = () => {
    const deleteUser = functions.httpsCallable('deleteUser');
    deleteUser({uid:sucursalFound.uid}).then((res)=>{
      console.log(res)
      db.collection('sucursales').doc(sucursalFound.id).delete().then(()=>{
        setSucursalFound({})
      })
    })
  };
  const checkFound = () => {
    if (Object.keys(sucursalFound).length !== 0) {
      return (
        <ListGroup className="mt-5 d-flex justify-content-between">
          <ListGroup.Item className="d-flex justify-content-between">
            {`${sucursalFound.agenciado}`}
            <div>
              <Button onClick={() => {setShowEditSucursal(true)}}>
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
    if (!sucursalFound) {
      return <Alert variant="danger">Sucursal  no encontrado.</Alert>;
    }
  };
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col>
            <Button
              style={{ display: "flex" }}
              variant="outline-primary"
              onClick={() => {
                setShowNuevaSucursal(true);
              }}
            >
              Crear Nueva Sucursal
              <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
            </Button>
          </Col>
          <Col sm={6}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Control
              placeholder='CI Resposable'
                className="mr-sm-2"
                type="text"
                onChange={(e) => {
                  setSucursalToFind(e.target.value);
                }}
              />

              <Button onClick={SearchSucursal}>
                <Icon>search</Icon>
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
        {showLoading && (
          <Col className="d-flex justify-content-center">
            <img src={require("../../assets/images/loading.gif")} alt='Loading'/>
          </Col>
        )}
        
      </Row>
      <Row>
        <Col>{checkFound()}</Col>
      </Row>

        {/*Modal nueva sucursa*/}
        <Modal show={showNuevaSucursal} onHide={closeModalRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Registro Sucursal</Modal.Title>
          </Modal.Header>
          <RegisterSucursal hide={closeModalRegister} />
        </Modal>


        {/*Editar sucursa*/}
        <Modal show={showEditSucursal} onHide={closeModalEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Registro Cliente</Modal.Title>
          </Modal.Header>
          <EditSucursal hide={closeModalEdit} sucursal={sucursalFound}/>
        </Modal>
      </Container>
    </div>
  );
}
