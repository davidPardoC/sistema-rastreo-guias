import { Icon } from "@material-ui/core";
import React from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import { auth } from "../../assets/firebase";
export default function AdminSettings() {
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <div className='mt-5'>
      <Container>
      <Button variant="outline-dark" className='d-flex align-items-center' onClick={()=>{history.goBack()}}><Icon >arrow_back</Icon></Button>
        
        <ListGroup className="mt-2">
          <ListGroup.Item >
            <Button
              onClick={() => {
                history.push(`${match.path}/adminSucursales`);
              }}
            >
              Administrar Sucursales
            </Button>
          </ListGroup.Item>
          <ListGroup.Item >
            <Button
              onClick={() => {
                history.push(`${match.path}/adminClients`);
              }}
            >
              Administrar Clientes
            </Button>
          </ListGroup.Item>
          <ListGroup.Item >
            <Button
            variant='danger'
            onClick={()=>{auth.signOut(); history.push('/')}}
            >
              Cerrar Sesión
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Container>
      <img src={require('../../assets/images/background.svg')} width='100%' style={{position:'fixed', bottom:0, zIndex:-1}} alt=""/>
    </div>
  );
}
