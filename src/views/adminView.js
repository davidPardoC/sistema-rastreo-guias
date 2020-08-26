import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

//componentes
import CreateOrder from "../screens/create-order";
import AdminSettings from "../screens/adminScreens/settingsAdmin";
import AdminSucursales from "../screens/adminScreens/adminSucursales";
import AdminClients from "../screens/adminScreens/adminClient";

//Router
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

//Firebase Import
import { db } from "../assets/firebase";

export default function AdminView() {
  const [router, setRouter] = useState(false);
  const history = useHistory();
  useEffect(() => {
    var userToken = localStorage.getItem("userToken");
    db.collection("users")
      .where("uid", "==", userToken)
      .get()
      .then((collection) => {
        collection.forEach((doc) => {
          console.log(doc.data());
          if (doc.data().admin === false) {
            history.push("/");
          } else {
            setRouter(true);
          }
        });
      });
  }, []);
  const match = useRouteMatch();
  return (
    <div>
      {router && (
        <Container>
          <CreateOrder />
          <Switch>
            <Route
              path={`${match.path}/settings/adminClients`}
              component={AdminClients}
            />
            <Route
              path={`${match.path}/settings/adminSucursales`}
              component={AdminSucursales}
            />
            <Route path={`${match.path}/settings`} component={AdminSettings} />
          </Switch>
        </Container>
      )}
    </div>
  );
}
