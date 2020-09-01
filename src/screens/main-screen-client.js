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
import ModalPreAlert from "../components/clientComponets/modal-prealert";
import ModalViewStates from "../components/clientComponets/modal-view-state";
import { db, auth } from "../assets/firebase";
import { useHistory } from "react-router-dom";

export default function MainScreensCustomer() {
  const history = useHistory();
  //state
  const [showAlert, setshowAlert] = useState(false);
  const [showGuideList, setshowGuideList] = useState(true);
  const [show, setShow] = useState(false);
  const [showGuideInfo, setshowGuideInfo] = useState(false);
  const [guideToFind, setGuideToFind] = useState("");
  const [guideFound, setGuideFound] = useState([]);
  const [cliente, setCliente] = useState({});
  const [guideToPass, setguideToPass] = useState({
    destinatario: { nombre: "" },
    contenido: { descripcion: "" },
  });
  const [currentGuideStates, setcurrentGuideStates] = useState([]);
  const [guides, setguides] = useState([]);

  const getUserGuides = async () => {
    db.collection("guias")
      .onSnapshot((querySnapshot) => {
        var aux = []
        querySnapshot.forEach((doc) => {
          
          aux.push({ id: doc.id, ...doc.data() });
        });
        setguides(aux)
      });
  };
  useEffect(() => {
    getUserGuides();
  },[]);
  useEffect(() => {
    if (guideToFind === "") {
      setshowAlert(false);
    }
  }, [guideToFind]);
  //cargarUsuario
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((users) => {
            users.forEach((user) => {
              setCliente({ id: user.id, ...user.data() });
            });
          });
      }
    });
  }, []);

  const searchGuide = () => {
    var guideF = guides.filter((guide) => guide.id === guideToFind);
    if (guideF.length !== 0) {
      setGuideFound(guideF);
      setshowAlert(false);
      setshowGuideList(false);
    } else {
      setshowAlert(true);
      setshowGuideList(true);
    }
  };

  //cerrar modal
  const handleClose = () => setShow(false);
  const closeInfoModal = () => setshowGuideInfo(false);

  return (
    <Container style={{ marginTop: "2rem" }}>
      {/*Modales*/}
      <ModalViewStates
        show={showGuideInfo}
        close={closeInfoModal}
        guide={guideToPass}
      />
      <ModalPreAlert show={show} close={handleClose} cliente={cliente} />
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
      {showAlert && <Alert variant="danger">Guia no encontrada</Alert>}
      <Row>
        <Col>
          {showGuideList && (
            <ListGroup className="mt-5">
              {guides.map((guide) => (
                <ListGroup.Item
                  className="d-flex justify-content-between"
                  key={guide.id}
                >
                  <Col sm={6}>
                    {`Destinatario:  ${guide.destinatario.nombre} ${guide.destinatario.apellido}`}
                  </Col>
                  <Col sm={4}>{`Guía: ${guide.id}`}</Col>

                  <Button
                    onClick={() => {
                      setguideToPass(guide);
                      setshowGuideInfo(true);
                    }}
                  >
                    <Icon>visibility</Icon>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {!showGuideList && (
            <ListGroup className="mt-5">
              {guideFound.map((guide) => (
                <ListGroup.Item
                  className="d-flex justify-content-between"
                  key={guide.id}
                >
                  <Col sm={6}>
                    {`Destinatario:  ${guide.destinatario.nombre} ${guide.destinatario.apellido}`}
                  </Col>
                  <Col sm={4}>{`Guía: ${guide.id}`}</Col>

                  <Button
                    onClick={() => {
                      setguideToPass(guide);
                      setshowGuideInfo(true);
                    }}
                  >
                    <Icon>visibility</Icon>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
