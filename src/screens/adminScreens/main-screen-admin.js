import React from "react";
import Button from "react-bootstrap/Button";
import Icon from "@material-ui/core/Icon";
import Container from "react-bootstrap/Container";
import { Row, Col, FormControl } from "react-bootstrap";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
export default function MainScreenAdmin() {
  //state
 

  //inicializacion de importaciones
  const history = useHistory();
  const match = useRouteMatch();


  

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row>
        <Col sm={6}>
          <Button variant="primary" style={{ display: "flex" }} onClick={()=>{history.push('/admin')}}>
            NUEVO PAQUETE <Icon style={{ marginLeft: "1rem" }}>add_circle</Icon>
          </Button>
        </Col>
        <Col sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              type="text"
              placeholder="BUSCAR GUÍA"
              className="mr-sm-2"
            />
            <Button variant="outline-success">BUSCAR</Button>

            <Link to={`${match.path}/settings`}>
              <Icon color="primary" className='ml-2'>
                settings
              </Icon>
            </Link>
          </div>
        </Col>
      </Row>
      <hr className='mt-5'></hr>
    </Container>
  );
}
