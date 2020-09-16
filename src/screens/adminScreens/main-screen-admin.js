import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import Container from "react-bootstrap/Container";
import { db } from "../../assets/firebase";
import {
  Row,
  Col,
  FormControl,
  Modal,
  ListGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import ModalAddGuide from "../../components/adminComponents/modal-add-guide";
import EditGuide from "../../components/adminComponents/modal-edit-guia";
import ModalEstados from "../../components/adminComponents/modal-estados";
import "./style.css";
export default function MainScreenAdmin() {
  //state
  const [showAddGuide, setshowAddGuide] = useState(false);
  const [guideFound, setguideFound] = useState({});
  const [showEditGuide, setshowEditGuide] = useState(false);
  const [showUpdateStates, setshowUpdateStates] = useState(false);
  const [guideToPass, setGuideToPass] = useState({});
  const [showLoading, setshowLoading] = useState(false);
  const [guideToFind, setguideToFind] = useState("");
  //btnSearch
  const [btnSearch, setBtnSearch] = useState(true)
  //inicializacion de importaciones
  const history = useHistory();
  const match = useRouteMatch();

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
    var guideUnformated = guide.replace(/0/g, "");
    return guideUnformated;
  };

  const hideAddGuide = () => {
    setshowAddGuide(false);
  };
  const searchGuide = async () => {
    history.push("/admin");
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
const checkInputs = ()=>{
  if(guideToFind){
    setBtnSearch(false)
  }else{
    setBtnSearch(true)
  }
};
useEffect(() => {
  checkInputs()
}, [guideToFind])
  const checkFound = () => {
    if (Object.keys(guideFound).length !== 0) {
      return (
        <ListGroup className="mt-3 ">
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
  return (
    <Container style={{ marginTop: "2rem" }}>
      {/**Modal Para agregar Guias */}
      <Modal show={showAddGuide} onHide={hideAddGuide} size="lg">
        <Modal.Header closeButton>NUEVA GUIA</Modal.Header>
        <ModalAddGuide close={hideAddGuide} />
      </Modal>

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
      {/** Modal para agregar los estados */}
      <ModalEstados
        show={showUpdateStates}
        close={closUpdateEstados}
        guide={guideFound}
      />
      <Row>
        <Col sm={6}>
          <Button
            variant="primary"
            style={{ display: "flex" }}
            onClick={() => {
              history.push("/admin");
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
            <Button variant="outline-success" onClick={searchGuide} disabled={btnSearch}>
              BUSCAR
            </Button>

            <Icon
              color="primary"
              className="ml-2 settingsIcon"
              onClick={() => {
                history.push(`${match.path}/settings`);
              }}
            >
              settings
            </Icon>
          </div>
        </Col>
      </Row>
      <hr className="mt-5"></hr>
      <Row>
        <Col>{checkFound()}</Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {showLoading && (
          <Col className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </Col>
        )}
      </Row>
    </Container>
  );
}
