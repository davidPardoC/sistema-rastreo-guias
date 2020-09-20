import React, { useState, useEffect } from "react";
import { Modal, Table , Button, FormControl} from "react-bootstrap";
import { db } from "../../assets/firebase";

import Icon from "@material-ui/core/Icon";
export default function ModalEstados(props) {
  const [states, setStates] = useState([]);
  const [showStateIput, setShowStateInput]=useState(false)
  const [descripcion, setDescripcion] = useState('')
  const getStates = () => {
    db.collection("guias")
      .doc(`${props.guide.id}`)
      .collection("estados")
      .onSnapshot((querySnapshot) => {
        var aux = [];
        querySnapshot.forEach((state) => {
          aux.push({ id: state.id, ...state.data() });
        });
        setStates(aux);
      });
  };
  useEffect(
    getStates, [props.show]);

  const updateState= ()=>{
    db.collection('guias').doc(`${props.guide.id}`).collection('estados').add({
      descripcion:descripcion,
      date: new Date()
    }).then(()=>{
      setDescripcion('')
      setShowStateInput(false)
    })
  }
  return (
    <Modal show={props.show} onHide={props.close} size="lg">
      <Modal.Header closeButton>
        <h3>Estados   {props.guide.id}</h3>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Fecha</td>
              <td>Estado</td>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state.id}>
                <td>{`${new Date(state.date.seconds * 1000).getFullYear()}/${new Date(state.date.seconds * 1000).getMonth()}/${new Date(state.date.seconds * 1000).getDate()}  ${new Date(state.date.seconds * 1000).getHours()}:${new Date(state.date.seconds * 1000).getMinutes()}`}</td>
                <td>{state.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant='success' onClick={()=>{setShowStateInput(!showStateIput)}}>Agregar Estado</Button>
        {
            showStateIput && (<div className='d-flex align-items-center'><FormControl placeholder='Estado' className='mt-2' value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}/><Button className='ml-2 d-flex align-items-center' onClick={updateState}><Icon>check</Icon></Button></div>)
        }
      </Modal.Body>
    </Modal>
  );
}
