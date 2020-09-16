import React, {useState, useEffect} from "react";
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
  Modal
} from "react-bootstrap";
import {db} from '../assets/firebase'
import GuideInfo from '../components/modal-search-guide'
export default function Home() {
const [guideToFind, setGuideToFind] = useState('');
const [guideFound, setGuideFound] = useState({id:''});
const [showModalFound, setShowModalFound] = useState(false);
const [estados, setEstados] = useState([]);
 //btnSearch
 const [btnSearch, setBtnSearch] = useState(true)

  const searchGuide = () =>{
    var guide = unFormatGuide(guideToFind)
    db.collection('guias').doc(guide).get().then((doc)=>{
      setGuideFound({id:doc.id, ...doc.data()})
    }).then(()=>{
      db.collection('guias').doc(guide).collection('estados').get().then((collection)=>{
        var aux = []
        collection.forEach(
          (doc)=>{
            aux.push(doc.data())
          }
        )
        setEstados(aux);
      }).then(()=>{setShowModalFound(true)})
    })
  }
  const unFormatGuide = (guide) => {
    var guideUnformated = guide.replace(/0/g, '')
    return guideUnformated;
  }
  const formatGuide = (guide) => {
    var guideArray = Array.from(guide);
    var aux = 13-guideArray.length 
    for (let i = 1; i <= aux; i++) {
        guideArray.splice(2,0,'0')
    }
    var lastStringGuide = guideArray.join('')
    return lastStringGuide;
  }
  const checkInputs = ()=>{
    if(guideToFind){
      setBtnSearch(false)
    }else{
      setBtnSearch(true)
    }
  };
  useEffect(() => {
    checkInputs()
  }, [guideToFind])
  return (
    <>
    <Modal show={showModalFound} onHide={()=>{setShowModalFound(false)}} size="lg">
    <Modal.Header closeButton>
  <h2>{formatGuide(guideFound.id)} </h2>
    </Modal.Header>
    <Modal.Body>
    <GuideInfo guide={guideFound} estados={estados}/>
    </Modal.Body>
    </Modal>
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
                        onChange={(e)=>{setGuideToFind(e.target.value)}}
                      />
                    </Form>
                    <Button variant="outline-success" className="ml-2" onClick={searchGuide} disabled={btnSearch}>
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
