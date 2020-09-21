import React, { useEffect } from "react";
import NavBarComponent from "../components/nav";
import './styles/home.css'

export default function MisionVision(props) {
  useEffect(()=>{window.scroll({top:700, behavior:'smooth'})})
  
  return (
    <div>
      <NavBarComponent />
    <img src={require('../assets/images/servicio1.jpg')} alt="logo" style={{width:'100%'}}/>
    <img src={require('../assets/images/servicio2.jpg')} alt="logo" style={{width:'100%', marginLeft:'auto', marginRight:'auto'}} id='contact'/>
          
    </div>
  );
}
