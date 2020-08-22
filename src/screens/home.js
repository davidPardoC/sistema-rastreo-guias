import React, { Suspense } from "react";
import NavBarComponent from "../components/nav";
//FIrebase imports
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "../assets/firebase-config";
export default function Home() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<p>Cargando</p>}>
        <NavBarComponent />
      </Suspense>
    </FirebaseAppProvider>
  );
}
