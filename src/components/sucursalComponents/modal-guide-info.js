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
  const [hiddenGuides, sethiddenGuides] = useState(false);

  const formatGuide = (guide) => {
    var guideArray = Array.from(guide);
    var aux = 13 - guideArray.length;
    for (let i = 1; i <= aux; i++) {
      guideArray.splice(2, 0, "0");
    }
    var lastStringGuide = guideArray.join("");
    return lastStringGuide;
  };

  const times = [{}, {}, {}];
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
          <Pdf targetRef={ref} filename={formatGuide(guide.id)} scale={0.82}>
            {({ toPdf }) => (
              <Button variant="success" className="d-flex" onClick={toPdf}>
                DESCARGAR <Icon className="ml-2"> save_alt</Icon>
              </Button>
            )}
          </Pdf>
          <div ref={ref}>
            {times.map(() => (
              <Container className="mt-3 modal-guide">
                <Row style={{ border: "1px solid black" }}>
                  <Col>GUÍA DE ENVIOS</Col>
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
                      src={require("../../assets/images/banner.svg")}
                      width="130"
                    />
                  </Col>
                  <Col style={{ borderRight: "1px solid" }}>
                    <div>
                      <p>Servicio: Corporativo</p>
                    </div>
                    <div>
                      Usuario:{" "}
                      {`${guide.remitente.nombre} ${guide.remitente.apellido}`}
                    </div>
                  </Col>
                  <Col style={{ borderRight: "1px solid" }}>
                    <div>Fecha: {new Date().toLocaleDateString()} </div>
                  </Col>
                  <Col style={{ borderRight: "1px solid" }}>
                    <div>
                      HORA:{" "}
                      {`${new Date().getHours()}:${new Date().getMinutes()}`}
                    </div>
                    {/* <div>Id: Local</div> */}
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
                      <Col>Nombre: {`${guide.remitente.institucion}`}</Col>
                    </Row>
                    <Row style={{ border: "1px solid black" }}>
                      <Col style={{ borderRight: "1px solid" }}>
                        Identificación: {`${guide.remitente.id}`}
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
                    </Row>
                    <Row  style={{
                        borderBottom: "1px solid",
                        borderRight: "1px solid",
                        borderLeft:'1px solid',
                        padding:'0.25rem'}}>
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
                            Peso(g): {`${guide.contenido.peso}`}
                          </Col>
                          <Col style={{ borderTop: "1px solid" }}>
                            Valor declarado:{" "}
                            {`${guide.contenido.valorDeclarado}`}
                          </Col>
                        </Row>
                        <Row style={{ border: "" }}>
                          <Col style={{ borderRight: "1px solid" }}>
                            Descripcion: {`${guide.contenido.descripcion}`}
                          </Col>
                        </Row>
                      </Col>
                      <Col sm={4}>Firma Responsable:</Col>
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
                        Identificación: {`${guide.destinatario.ci}`}
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
                        borderBottom: "1px solid",
                        borderBottom: "1px solid",
                        padding:'0.25rem'
                      }}
                    >
                      <Col >
                        Email: {`${guide.destinatario.email}`}
                      </Col>
                    </Row>
                    <Row style={{
                        borderBottom: "1px solid",
                        borderRight: "1px solid",
                      }}>
                    <Col style={{ border: "" }}>
                        Telefono: {`${guide.destinatario.telefono}`}
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
                            borderRight: "1px solid"
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
                            borderRight: "1px solid"
                          }}
                        >
                          <Col>Fecha:</Col>
                        </Row>
                        <Row
                          style={{
                            borderRight: "1px solid",
                            padding:'0.30rem'
                          }}
                        >
                          <Col>Hora:</Col>
                        </Row>
                      </Col>
                      <Col style={{ border: "", height: "1rem" }}>Firma:</Col>
                    </Row>
                  </Col>
                </Row>
                <p style={{ fontSize: "0.5rem" }}>
                  RAPIFAS COURIER no se responsabiliza por el envío de dinero,
                  cheques, títulos de crédito, joyas entre otros artículos o que
                  sean de prohibida distribución y que no hayan sido descritos
                  en la respectiva guía de remisión y viajen en el interior de
                  sobres, paquetes, cartones etc.
                </p>
              </Container>
            ))}
          </div>{" "}
        </>
      )}
    </Container>
  );
}

const border = { fontWeigth: "900" };
