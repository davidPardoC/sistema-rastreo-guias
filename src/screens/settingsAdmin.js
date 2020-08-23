import React from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
export default function AdminSettings() {
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <div className='mt-5'>
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <Button
              onClick={() => {
                history.push(`${match.path}/adminSucursales`);
              }}
            >
              Administrar Sucursales
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
}
