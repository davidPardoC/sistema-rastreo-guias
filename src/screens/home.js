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
export default function Home() {
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
                <h3>Second slide label</h3>
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
        <footer
          style={{ position: "fixed", left: 0, bottom: 20, width: "100%" }}
        >
          <ListGroup className="mt-5">
            <ListGroup.Item>
              <Row>
                <Col>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="d-flex justify-content-end"
                  >
                    <Form className="ml-3">
                      <FormControl
                        type="text"
                        placeholder="Ingresar número de guía"
                        className="mr-sm-2"
                      />
                    </Form>
                    <Button variant="outline-success" className="ml-2">
                      RASTREAR GUÍA
                    </Button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </footer>
      </Container>
    </>
  );
}
