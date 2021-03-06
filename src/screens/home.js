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

  const searchGuide = async () => {
    let guide = unFormatGuide(guideToFind);
    await db
      .collection("guias")
      .doc(guide)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setGuideFound({ id: doc.id, ...doc.data() });
          db.collection("guias")
            .doc(doc.id)
            .collection("estados")
            .get()
            .then((collection) => {
              let aux = [];
              collection.forEach((doc) => {
                aux.push(doc.data());
              });
              setEstados(aux);
            })
            .then(() => {
              setShowModalFound(true);
            });
        } else {
          return;
        }
      });
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

      <img
        src={require("../assets/images/main.jpg")}
        style={{ width: "100%" }}
      ></img>
      <img
        src={require("../assets/images/artboard.jpg")}
        style={{ width: "100%" }}
      ></img>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <img
                src={require("../assets/images/facebook.svg")}
                alt=""
                style={{ width: "5rem" }}
                className="ml-5 social"
                onClick={() => {
                  window.location.href =
                    "https://www.facebook.com/Rapifas-Courier-101854448344615/";
                }}
              />
              <img
                src={require("../assets/images/instagram.svg")}
                alt=""
                style={{ width: "5rem" }}
                className="ml-5 social"
                onClick={() => {
                  window.location.href =
                    "https://www.instagram.com/invites/contact/?i=zkg9h47j6bmb&utm_content=c12rell";
                }}
              />
              <img
                src={require("../assets/images/twitter.svg")}
                alt=""
                style={{ width: "5rem" }}
                className="ml-5 social"
                onClick={() => {
                  window.location.href = "https://twitter.com/RapifasCourier";
                }}
              />
            </div>
            <div className="d-flex justify-content-center mt-2">
              <a style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
                RAPIFAS COURIER CIA. LTDA.
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "33rem",
          backgroundColor: "rgba(56,79,119,0.50)",
          paddingTop: "0.5rem",
          borderTopRightRadius: "1rem",
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
                    value={guideToFind}
                    onChange={(e) => {
                      setGuideToFind(e.target.value);
                    }}
                  />
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
