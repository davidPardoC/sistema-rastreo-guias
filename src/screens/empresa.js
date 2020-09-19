import React from "react";
import NavBarComponent from "../components/nav";
import './styles/home.css'
import {
  Container,
  Row,
  Form,
  Col,
  FormControl,
  Button,
  ListGroup,
  Carousel,
} from "react-bootstrap";
export default function Empresa() {
  return (
    <>
      <NavBarComponent />
    <img src={require('../assets/images/empresa1.jpg')} alt="logo" style={{width:'100%'}}/>
    <img src={require('../assets/images/empresa2.jpg')} alt="logo" style={{width:'100%'}}/>
          
    </>
  );
}
