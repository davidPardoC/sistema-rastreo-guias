import React, {useState, useEffect} from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import {db} from '../../assets/firebase'

export default function ModalViewStates(props) {
  const [states, setstates] = useState([])

  const getStates =  () =>{
    db.collection('guias').doc(`${props.guide.id}`).collection('estados').onSnapshot((snapshot)=>{
      var aux = []
      snapshot.forEach((doc)=>{
        aux.push({id:doc.id, ...doc.data()})
      })
      setstates(aux)
    })
  }
  useEffect(getStates,[props.show]);
  
  return (
    <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Paquete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Table striped bordered hover key={0}>
              <tbody>
                <tr key={1}>
                  <td>
                    Nombres
                   
                  </td>
                  <td>
                  {`  ${props.guide.destinatario.nombre}`}
                  </td>
                </tr>
                <tr>
                  <td><strong>Apellidos</strong></td>
                 <td>
{ `  ${props.guide.destinatario.apellido}`}
                  </td>
                </tr>
                <tr key={2}>
                  <td>CI</td>
                  <td>{`${props.guide.destinatario.ci}`}</td>
                </tr>
               
                <tr key={3}>
                  <td>{`Descripcion: ${props.guide.contenido.descripcion}`}</td>
                  <td>
                    {`Valor declarado: USD ${props.guide.contenido.valorDeclarado}`}
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
                  states.map((state)=>(
                    <tr key={state.id}>
                      <td>{`${new Date(state.date.seconds * 1000).getFullYear()}/${new Date(state.date.seconds * 1000).getMonth()}/${new Date(state.date.seconds * 1000).getDate()}  ${new Date(state.date.seconds * 1000).getHours()}:${new Date(state.date.seconds * 1000).getMinutes()}`}</td>
                      <td>{state.descripcion}</td>
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
