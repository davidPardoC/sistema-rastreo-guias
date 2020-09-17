import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import "./modal-guide.css";
import Icon from "@material-ui/core/Icon";
import Barcode from "react-barcode";
import { db } from "../../assets/firebase";
import Pdf from "react-to-pdf";
const ref = React.createRef();
export default function GuideInfo(props) {
  const [guide, setguide] = useState({});
  const [charging, setcharging] = useState(true);
  const [charged, setcharged] = useState(false);

  const formatGuide = (guide) => {
    var guideArray = Array.from(guide);
    var aux = 13 - guideArray.length;
    for (let i = 1; i <= aux; i++) {
      guideArray.splice(2, 0, "0");
    }
    var lastStringGuide = guideArray.join("");
    return lastStringGuide;
  };

  const getGuideData = async (guideToGet) => {
    await db
      .collection("guias")
      .doc(guideToGet)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setguide({ id: doc.id, ...doc.data() });
          console.log(guide);
        } else {
          console.log("nop");
        }
        setcharging(false);
        setcharged(true);
      });
  };
  useEffect(() => {
    if (props.guide !== "") {
      console.log(props.guide);
      getGuideData(props.guide);
    }
  }, [props]);

  return (
    <Container className="modal-guide">
      {charging && <Spinner animation="border" variant="primary" />}
      {charged && (
        <>
          <Pdf targetRef={ref} filename={formatGuide(guide.id)}>
            {({ toPdf }) => (
              <Button variant="success" className="d-flex" onClick={toPdf}>
                DESCARGAR <Icon className="ml-2"> save_alt</Icon>
              </Button>
            )}
          </Pdf>
          <div>
            <Container className="mt-3" ref={ref}>
              <Row style={{ border: "1px solid black" }}>
                <Col>GUIA DE ENVIOS</Col>
              </Row>
              <Row
                style={{
                  borderRight: "1px solid black",
                  borderLeft: "1px solid black",
                }}
              >
                <Col style={{ borderRight: "1px solid" }}>
                  <img
                    className="mt-3"
                    src={require("../../assets/images/logo.svg")}
                    width="130"
                  />
                </Col>
                <Col style={{ borderRight: "1px solid" }}>
                  <div>
                    <p style={{ fontWeight: "900" }}>Servicio:</p> Corporativo
                  </div>
                  <div>Usuario: Victor Lopez</div>
                </Col>
                <Col style={{ borderRight: "1px solid" }}>
                  <div>Fecha: {new Date().toLocaleDateString()} </div>
                  <div>Orden de trabajo: NA </div>
                </Col>
                <Col style={{ borderRight: "1px solid" }}>
                  <div>
                    HORA:{" "}
                    {`${new Date().getHours()}:${new Date().getMinutes()}`}
                  </div>
                  <div>Id: Local</div>
                </Col>
                <Col style={{ border: "" }}>
                  <Barcode
                    value={formatGuide(guide.id)}
                    height={20}
                    width={1}
                    format="CODE128"
                  />
                </Col>
              </Row>
              <Row style={{ border: "1px solid black" }}>
                <Col style={{ borderRight: "1px solid" }}>Remitente</Col>
                <Col style={{ border: "" }}>Destinatario</Col>
              </Row>
              <Row>
                <Col>
                  <Row
                    style={{
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Col>
                      Nombre:{" "}
                      {`${guide.remitente.nombre} ${guide.remitente.apellido}`}
                    </Col>
                  </Row>
                  <Row style={{ border: "1px solid black" }}>
                    <Col style={{ borderRight: "1px solid" }}>
                      Numero de identificacion: {`${guide.remitente.id}`}
                    </Col>
                    <Col style={{ border: "" }}>
                      Tipo de identificacion: {`${guide.remitente.tipoId}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Col style={{ borderRight: "1px solid" }}>
                      Provincia:{`${guide.remitente.provincia}`}
                    </Col>
                    <Col style={{ borderRight: "1px solid" }}>
                      Canton: {`${guide.remitente.canton}`}
                    </Col>
                    <Col style={{ border: "" }}>
                      Parroquia: {`${guide.remitente.parroquia}`}
                    </Col>
                  </Row>
                  <Row style={{ border: "1px solid black" }}>
                    <Col style={{ border: "" }}>
                      Direccion: {`${guide.remitente.direccion}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Col style={{ border: "" }}>
                      Referencia: {`${guide.remitente.referencia}`}
                    </Col>
                  </Row>
                  <Row style={{ border: "1px solid black" }}>
                    <Col style={{ border: "" }}>
                      Telefono: {`${guide.remitente.telefono}`}
                    </Col>
                    <Col style={{ border: "" }}>
                      Email: {`${guide.remitente.email}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <Col style={{ border: "" }} sm={8}>
                      <Row
                        style={{
                          borderBottom: "1px solid",
                          borderRight: "1px solid",
                        }}
                      >
                        <Col style={{ borderRight: "1px solid" }}>
                          Nro. Items: {`${guide.contenido.nroItems}`}
                        </Col>
                        <Col style={{ border: "" }}>
                          Peso en Gramos: {`${guide.contenido.peso}`}
                        </Col>
                        <Col style={{ borderTop: "1px solid" }}>
                          Valor declarado: {`${guide.contenido.valorDeclarado}`}
                        </Col>
                      </Row>
                      <Row style={{ border: "" }}>
                        <Col style={{ borderRight: "1px solid" }}>
                          Descripcion: {`${guide.contenido.descripcion}`}
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={4}>Firma</Col>
                  </Row>
                </Col>
                <Col>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col style={{ border: "" }}>
                      Nombre:{" "}
                      {`${guide.destinatario.nombre} ${guide.destinatario.apellido}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col style={{ borderRight: "1px solid" }}>
                      Numero de identificacion: {`${guide.destinatario.ci}`}
                    </Col>
                    <Col style={{ border: "" }}>
                      Tipo de identificacion: {`${guide.destinatario.tipoId}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col style={{ borderRight: "1px solid" }}>
                      Provincia: {`${guide.destinatario.provincia}`}
                    </Col>
                    <Col style={{ borderRight: "1px solid" }}>
                      Canton: {`${guide.destinatario.canton}`}
                    </Col>
                    <Col style={{ border: "" }}>
                      Parroquia: {`${guide.destinatario.parroquia}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col style={{ border: "" }}>
                      Direccion: {`${guide.destinatario.direccion}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col style={{ border: "" }}>
                      Referencia: {`${guide.destinatario.referencia}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col style={{ border: "" }}>
                      Telefono: {`${guide.destinatario.telefono}`}
                    </Col>
                    <Col style={{ border: "" }}>
                      Email: {`${guide.destinatario.email}`}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    <Col>
                      <Row
                        style={{
                          borderBottom: "1px solid",
                          borderRight: "1px solid",
                          padding: "0.3rem",
                        }}
                      >
                        <Col>Nombres:</Col>
                      </Row>
                      <Row
                        style={{
                          borderBottom: "1px solid",
                          borderRight: "1px solid",
                        }}
                      >
                        <Col>CI:</Col>
                      </Row>
                      <Row
                        style={{
                          borderBottom: "1px solid",
                          borderRight: "1px solid",
                          padding: "0.3rem",
                        }}
                      >
                        <Col>Fecha:</Col>
                      </Row>
                      <Row
                        style={{
                          borderRight: "1px solid",
                        }}
                      >
                        <Col>Hora:</Col>
                      </Row>
                    </Col>
                    <Col style={{ border: "", height: "1rem" }}>Firma:</Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>{" "}
        </>
      )}
    </Container>
  );
}

const border = { fontWeigth: "900" };
