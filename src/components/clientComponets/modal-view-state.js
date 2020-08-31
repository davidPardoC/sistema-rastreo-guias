import React, {useState, useEffect} from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";

export default function ModalViewStates(props) {
  console.log(props.states)
  return (
    <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Paquete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    Nombres y apellidos:
                    {` ${props.guide.destinatario.nombre}  ${props.guide.destinatario.apellido}`}{" "}
                  </td>
                </tr>
                <tr>
                  <td>CI:{`${props.guide.destinatario.ci}`}</td>
                </tr>
                <tr>
                  <td>{`Descripcion: ${props.guide.contenido.descripcion}`}</td>
                  <td>
                    {`Valor declarado: USD ${props.guide.contenido.valor}`}
                  </td>
                  <td>{`Peso: ${props.guide.contenido.peso}g`}</td>
                </tr>
              </tbody>
            </Table>
            <br></br>
            <Table striped bordered hover>
              <thead className="thead-light">
                <tr>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
              {
                props.states.map((e)=>(
                  <tr>
                    <td>{new Date(e.date.seconds*1000).toISOString().substr(0, 19)}</td>
                    <td>{e.descripcion}</td>
                  </tr>
                ))
              }
              
              </tbody>
            </Table>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
