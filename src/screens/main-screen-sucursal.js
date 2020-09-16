import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth, db } from "../assets/firebase";
import EditGuide from "../components/sucursalComponents/modal-edit-guia";
import ModalEstados from "../components/sucursalComponents/modal-estados";
import ModalAddGuide from "../components/sucursalComponents/modal-add-guide";
import GuideInfo from "../components/sucursalComponents/modal-guide-info";
export default function MainSucursal(props) {
  const [showLoading, setshowLoading] = useState(false);
  const [guideToFind, setguideToFind] = useState("");
  const [guideFound, setguideFound] = useState({});
  const [showEditGuide, setshowEditGuide] = useState(false);
  const [showUpdateStates, setshowUpdateStates] = useState(false);
  const [guideToPass, setGuideToPass] = useState({});
  const [showAddGuide, setshowAddGuide] = useState(false);
  const [sucursal, setSucursal] = useState({});
  const [btnSearch, setBtnSearch] = useState(true);
  const [showLatestGuideModal, setshowLatestGuideModal] = useState(false);
  const [lastAddedGuide, setlastAddedGuide] = useState("");
  //inicializacion de importaciones
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("sucursales")
          .where("uid", "==", user.uid)
          .get()
          .then((users) => {
            users.forEach((user) => {
              setSucursal({ id: user.id, ...user.data() });
              console.log(user.data());
            });
          });
      }
    });
    console.log(sucursal);
  }, []);

  const searchGuide = async () => {
    setshowLoading(true);
    await db
      .collection("guias")
      .doc(unFormatGuide(guideToFind))
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
  const unFormatGuide = (guide) => {
    var guideUnformated = guide.replace(/0/g, "");
    return guideUnformated;
  };
  const formatGuide = (guide) => {
    var guideArray = Array.from(guide);
    var aux = 13 - guideArray.length;
    for (let i = 1; i <= aux; i++) {
      guideArray.splice(2, 0, "0");
    }
    var lastStringGuide = guideArray.join("");
    return lastStringGuide;
  };
  const checkFound = () => {
    if (Object.keys(guideFound).length !== 0) {
      return (
        <ListGroup className="mt-5 ">
          <ListGroup.Item className="d-flex justify-content-between">
            {formatGuide(guideFound.id)}
            <div>
              <Button
                onClick={() => {
                  setshowEditGuide(true);
                  setGuideToPass(guideFound);
                  console.log(guideFound);
                }}
              >
                <Icon>visibility</Icon>
              </Button>
              <Button
                variant="primary"
                className="ml-1"
                onClick={() => {
                  setshowUpdateStates(true);
                }}
              >
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
    setshowEditGuide(false);
  };

  const closUpdateEstados = () => {
    setshowUpdateStates(false);
  };

  const hideAddGuide = () => {
    setshowAddGuide(false);
    setshowLatestGuideModal(true);
  };

  const checkInputs = () => {
    if (guideToFind) {
      setBtnSearch(false);
    } else {
      setBtnSearch(true);
    }
  };
  useEffect(() => {
    checkInputs();
  }, [guideToFind]);

  const closeLatestGuideInfoModal = () => {
    setshowLatestGuideModal(false);
  };
  return (
    <Container style={{ marginTop: "2rem" }}>
      {/**Innfo Guide */}
      <Modal
        show={showLatestGuideModal}
        onHide={closeLatestGuideInfoModal}
        size="lg"
      >
        <Modal.Body>
          <GuideInfo guide={lastAddedGuide} />
        </Modal.Body>
      </Modal>
      {/**Modal Para agregar Guias */}
      <Modal show={showAddGuide} onHide={hideAddGuide} size="lg">
        <Modal.Header closeButton>NUEVA GUIA</Modal.Header>
        <ModalAddGuide
          close={hideAddGuide}
          sucursal={sucursal}
          returnGuideId={setlastAddedGuide}
        />
      </Modal>
      {/** Modal para agregar los estados */}
      <ModalEstados
        show={showUpdateStates}
        close={closUpdateEstados}
        guide={guideFound}
      />

      {/*Modal [ara editar la informacion de la guia */}
      <Modal show={showEditGuide} onHide={closeEditGuide} size="lg">
        <Modal.Body>
          <EditGuide
            guide={guideToPass}
            close={closeEditGuide}
            refresh={searchGuide}
          />
        </Modal.Body>
      </Modal>
      <Row>
        <Col sm={6}>
          <Button
            variant="primary"
            style={{ display: "flex" }}
            onClick={() => {
              setshowAddGuide(true);
            }}
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
