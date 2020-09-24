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
  Modal,
} from "react-bootstrap";
import GuideInfo from "../components/clientComponets/modal-guide-info";
import ModalPreAlert from "../components/clientComponets/modal-prealert";
import ModalViewStates from "../components/clientComponets/modal-view-state";
import { db, auth } from "../assets/firebase";
import { useHistory } from "react-router-dom";
import "../components/clientComponets/modal-guide.css";
import './main.css'
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

  const [guides, setguides] = useState([]);
  const [lastAddedGuide, setlastAddedGuide] = useState("");
  const [showLatestGuideModal, setshowLatestGuideModal] = useState(false);
  const [btnSearch, setBtnSearch] = useState(true);

  const getUserGuides = async () => {
    db.collection("guias")
      .where("remitente.id", "==", `${cliente.id}`)
      .onSnapshot((querySnapshot) => {
        var aux = [];
        querySnapshot.forEach((doc) => {
          aux.push({ id: doc.id, ...doc.data() });
        });
        setguides(aux);
      });
  };

  useEffect(() => {}, []);
  useEffect(() => {
    getUserGuides();
  }, [cliente]);

  const checkInputs = () => {
    console.log(guideToFind.length);
    if (guideToFind.length < 13) {
      setBtnSearch(true);
    } else {
      setBtnSearch(false);
      if (guideToFind.length > 13) {
        setGuideToFind(guideToFind.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    checkInputs();
  }, [guideToFind]);
  const formatGuide = (guide) => {
    var guideArray = Array.from(guide);
    var aux = 13 - guideArray.length;
    for (let i = 1; i <= aux; i++) {
      guideArray.splice(2, 0, "0");
    }
    var lastStringGuide = guideArray.join("");
    return lastStringGuide;
  };

  const unFormatGuide = (guide) => {
    var res = guide.split("");
    var aux = res.slice(2, 11);
    let finalNumber;
    for (let index = 0; index < 9; index++) {
      if (aux[index] !== "0") {
        finalNumber = aux.splice(index, 9);
        break;
      }
    }
    return `RF${finalNumber.join("")}EC`;
  };

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
    var guideUnformated = unFormatGuide(guideToFind);
    console.log(guideUnformated)
    var guideF = guides.filter((guide) => guide.id === guideUnformated);
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
  const handleClose = () => {
    setShow(false);
    setshowLatestGuideModal(true);
  };
  const closeInfoModal = () => setshowGuideInfo(false);
  const closeLatestGuideInfoModal = () => {
    setshowLatestGuideModal(false);
  };

  const handleCloseNoConfirm = () => {
    setShow(false);
  };

  return (
    <>
    <Container style={{ marginTop: "2rem" }}>
      {/*Modales*/}
      <ModalViewStates
        show={showGuideInfo}
        close={closeInfoModal}
        guide={guideToPass}
      />
      {/**Modal pre alerta */}
      <ModalPreAlert
        show={show}
        close={handleClose}
        closeNoConfirm={handleCloseNoConfirm}
        cliente={cliente}
        returnGuideId={setlastAddedGuide}
      />

      
      {/**Modal Info Latest Guide */}
      <Modal
        show={showLatestGuideModal}
        onHide={closeLatestGuideInfoModal}
        size="lg"
        dialogClassName="custom-dialog"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <GuideInfo guide={lastAddedGuide} />
        </Modal.Body>
      </Modal>


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
              value={guideToFind}
              onChange={(e) => {
                setGuideToFind(e.target.value);
              }}
            />
            <Button
              variant="outline-success"
              onClick={searchGuide}
              disabled={btnSearch}
            >
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
                  <Col sm={4}>Guia: {formatGuide(guide.id)}</Col>

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
                  <Col sm={4}>Guia: {formatGuide(guide.id)}</Col>

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
    <img src={require('../assets/images/background.svg')} width='100%' style={{position:'fixed', bottom:0, zIndex:-1}} alt=""/>
    </>
  );
}
