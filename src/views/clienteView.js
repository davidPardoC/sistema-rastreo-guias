import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import CreateAlert from "../screens/main-screen-client";
import { auth} from "../assets/firebase";
import {useHistory} from 'react-router-dom'
export default function ClientView() {
    const history = useHistory()
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
        if(user){
            user.getIdTokenResult().then((tokenID)=>{
                if(tokenID.claims.role==='client'){
                    return
                }
            })
        }else{
            history.push('/')
        }
    })
  }, []);
  return (
    <Container>
      <CreateAlert />
    </Container>
  );
}
