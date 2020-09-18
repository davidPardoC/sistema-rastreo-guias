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
export default function MisionVision() {
  return (
    <>
      <NavBarComponent />
      <Container>
        <Row>
          <Carousel className='mt-2'>
            <Carousel.Item>
              <img
                className="d-block carouselImage"
                src={require('../assets/images/slide1.jpg')}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Nice D br</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block carouselImage"
                src={require('../assets/images/slide2.jpg')}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block carouselImage"
                src={require('../assets/images/slide3.jpg')}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
    </>
  );
}
