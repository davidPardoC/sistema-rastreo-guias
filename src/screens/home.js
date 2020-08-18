import React from "react";
import NavBarComponent from "../components/nav";
//FIrebase imports
import { FirebaseAppProvider, useFirestoreDocData, useFirestore, SuspenseWithPerf } from 'reactfire';
import firebaseConfig from '../assets/firebase-config'
export default function Home() {
  return (
    <FirebaseAppProvider firebaseConfig={ firebaseConfig }>
      <NavBarComponent/>
    </FirebaseAppProvider>
  );
}
