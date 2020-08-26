import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/home";
import MisionVision from "./screens/mision-vision";
import AdminView from "./views/adminView";
import ClientView from "./views/clienteView"
import SucursalView from './views/sucursalView';
export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/sucursal" component={SucursalView} />
        <Route path="/client" component={ClientView} />
        <Route path="/admin" component={AdminView} />
        <Route path="/mision-vision" component={MisionVision} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
