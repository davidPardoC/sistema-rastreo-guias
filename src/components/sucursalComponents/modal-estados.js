import React, { useState, useEffect } from "react";
import { Modal, Table , Button, FormControl} from "react-bootstrap";
import { db } from "../../assets/firebase";

import Icon from "@material-ui/core/Icon";
export default function ModalEstados(props) {
  const [states, setStates] = useState([]);
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
  useEffect(() => {
    getStates();
  }, [props.show]);
  return (
    <Modal show={props.show} onHide={props.close} size="lg">
      <Modal.Header closeButton>
        <h3>Estados</h3>
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
                <td>{new Date(state.date.seconds * 1000).toDateString()}</td>
                <td>{state.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant='success'>Agregar Estado</Button>
        {
            true && (<div className='d-flex align-items-center'><FormControl placeholder='Estado' className='mt-2'/><Button className='ml-2 d-flex align-items-center'><Icon>check</Icon></Button></div>)
        }
      </Modal.Body>
    </Modal>
  );
}
