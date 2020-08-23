import React, {useEffect} from "react";
import { Container} from "react-bootstrap";

//componentes
import CreateOrder from "../screens/create-order";
import AdminSettings from "../screens/settingsAdmin";
import AdminSucursales from '../screens/administrarSucursales';

//Router
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom";

export default function AdminView() {
  const history = useHistory();
  
  useEffect(() => {}, [])
  const match = useRouteMatch();
  return (
    <Container>
      <CreateOrder/>
      <Switch>
        <Route path={`${match.path}/settings/adminSucursales`} component={AdminSucursales}/>
        <Route path={`${match.path}/settings`} component={AdminSettings} />
      </Switch>
    </Container>
  );
}
