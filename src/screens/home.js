import React, { useState, useEffect } from "react";
import NavBarComponent from "../components/nav";
import "./styles/home.css";
import {
  Container,
  Row,
  Form,
  Col,
  FormControl,
  Button,
  ListGroup,
  Carousel,
  Modal,
} from "react-bootstrap";
import { db } from "../assets/firebase";
import GuideInfo from "../components/modal-search-guide";
export default function Home() {
  const [guideToFind, setGuideToFind] = useState("");
  const [guideFound, setGuideFound] = useState({ id: "" });
  const [showModalFound, setShowModalFound] = useState(false);
  const [estados, setEstados] = useState([]);
  //btnSearch
  const [btnSearch, setBtnSearch] = useState(true);

  const searchGuide = () => {
    var guide = unFormatGuide(guideToFind);
    db.collection("guias")
      .doc(guide)
      .get()
      .then((doc) => {
        setGuideFound({ id: doc.id, ...doc.data() });
      })
      .then(() => {
        db.collection("guias")
          .doc(guide)
          .collection("estados")
          .get()
          .then((collection) => {
            var aux = [];
            collection.forEach((doc) => {
              aux.push(doc.data());
            });
            setEstados(aux);
          })
          .then(() => {
            setShowModalFound(true);
          });
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
  return (
    <>
      <Modal
        show={showModalFound}
        onHide={() => {
          setShowModalFound(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <h2>{formatGuide(guideFound.id)} </h2>
        </Modal.Header>
        <Modal.Body>
          <GuideInfo guide={guideFound} estados={estados} />
        </Modal.Body>
      </Modal>
      <NavBarComponent />
     
        <img src={require("../assets/images/main.svg")} style={{width:'100%'}}></img>
        <img src={require('../assets/images/artboard.jpg')} style={{width:'100%', marginBottom:'4.3rem'}}></img>
        <footer
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            backgroundColor: "#384F77",
            padding:'1rem'
          }}
        >
           <Container fluid>
          <Row>
            <Col>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  style={{
                    backgroundColor: "#384F77",
                    borderRadius: "0px",
                    border: "none",
                    borderRight: "4px solid white",
                  }}
                  className="ml-2"
                  onClick={searchGuide}
                  disabled={btnSearch}
                >
                  <a style={{ color: "white" }}>RASTREAR GUÍA</a>
                </Button>

                <Form className="ml-3">
                  <FormControl
                    style={{ width: "17rem" }}
                    type="text"
                    placeholder="INGRESAR NÚMERO DE GUÍA"
                    className="mr-sm-2"
                    onChange={(e) => {
                      setGuideToFind(e.target.value);
                    }}
                  />
                </Form>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <h2 style={{ color: "#fff" }}>Fácil, Rápido y Seguro</h2>
            </Col>
          </Row>
          </Container>
        </footer>
     
    </>
  );
}
