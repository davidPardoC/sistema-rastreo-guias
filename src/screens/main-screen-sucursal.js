import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import Container from "react-bootstrap/Container";
import {
  Row,
  Col,
  FormControl,
  Dropdown,
  ListGroup,
  Alert,
  Modal
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth, db } from "../assets/firebase";
import EditGuide from '../components/sucursalComponents/modal-edit-guia'
import ModalEstados from '../components/sucursalComponents/modal-estados'
export default function MainSucursal(props) {
  const [showLoading, setshowLoading] = useState(false);
  const [guideToFind, setguideToFind] = useState("");
  const [guideFound, setguideFound] = useState({});
  const [showEditGuide, setshowEditGuide] = useState(false)
  const [showUpdateStates, setshowUpdateStates] = useState(false)
  const [guideToPass, setGuideToPass] = useState({})

  //inicializacion de importaciones
  const history = useHistory();
  //cerrar modal

  const searchGuide = async () => {
    setshowLoading(true);
    await db
      .collection("guias")
      .doc(guideToFind)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setguideFound({ id: doc.id, ...doc.data() });
          setshowLoading(false);
        } else {
          setguideFound(false);
          setshowLoading(false);
        }
      });
  };

  const checkFound = () => {
    if (Object.keys(guideFound).length !== 0) {
      return (
        <ListGroup className="mt-5 ">
          <ListGroup.Item className="d-flex justify-content-between">
            {guideFound.id}
            <div>
              <Button onClick={() => { setshowEditGuide(true); setGuideToPass(guideFound) }}>
                <Icon>visibility</Icon>
              </Button>
              <Button variant="primary" className="ml-1" onClick={() => {
                setshowUpdateStates(true)
              }}>
                <Icon>update</Icon>
              </Button>
              <Button variant="danger" className="ml-1">
                <Icon>delete</Icon>
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    if (!guideFound) {
      return <Alert variant="danger">Guía no encontrado.</Alert>;
    }
  };

  const closeEditGuide = () => {
    setshowEditGuide(false)
  }

  const closUpdateEstados = () => {
    setshowUpdateStates(false)
  }
  return (
    <Container style={{ marginTop: "2rem" }}>
      <ModalEstados show={showUpdateStates} close={closUpdateEstados} guide={guideFound} />
      <Modal show={showEditGuide} onHide={closeEditGuide} size="lg">
        <Modal.Body>
          <EditGuide guide={guideToPass} />
        </Modal.Body>
      </Modal>
      <Row>
        <Col sm={6}>
          <Button
            variant="primary"
            style={{ display: "flex" }}
            onClick={() => { }}
          >
            NUEVO PAQUETE <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              type="text"
              placeholder="BUSCAR GUÍA"
              className="mr-sm-2"
              onChange={(e) => {
                setguideToFind(e.target.value);
              }}
            />
            <Button variant="outline-success" onClick={searchGuide}>
              BUSCAR
            </Button>
            <Dropdown className="ml-2 d-flex align-items-center">
              <Dropdown.Toggle>
                <Icon>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    auth.signOut();
                    history.push("/");
                  }}
                >
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{checkFound()}</Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {showLoading && (
          <Col className="d-flex justify-content-center">
            <img src={require("../assets/images/loading.gif")} alt="Loading" />
          </Col>
        )}
      </Row>
    </Container>
  );
}
