import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import './modal-guide.css'
export default function GuideInfo(props) {
    return (
        <Container className='modal-guide'>
            <Button variant='success'>DESCARGAR GUIA DE ENVIOS</Button>
            <diV>
                <Container className='mt-3'>
                    <Row style={{border:'1px solid black'}}><Col>GUIA DE ENVIOS</Col></Row>
                    <Row style={{borderRight:'1px solid black', borderLeft:'1px solid black'}}>
                        <Col style={{borderRight:'1px solid'}} ><img className='mt-3' src={require('../../assets/images/logo.svg')} width='130'/></Col>
                        <Col style={{borderRight:'1px solid'}}><div >Servicio: Corporativo</div><div>Usuario: Victor Lopez</div></Col>
                        <Col style={{borderRight:'1px solid'}}><div >Fecha: mm/ddd/aa </div><div >Orden de trabajo: NA </div></Col>
                        <Col style={{borderRight:'1px solid'}}><div >HORA: 12 AM</div><div >Id: Local</div></Col>
                        <Col style={{border:''}}>RN00000000EC</Col>
                    </Row>
                    <Row style={{border:'1px solid black'}}>
                        <Col style={{borderRight:'1px solid'}}>Remitente</Col>
                        <Col style={{border:''}}>Destinatario</Col>
                    </Row>
                    <Row >
                        <Col>

                            <Row style={{borderRight:'1px solid black', borderLeft:'1px solid black'}} ><Col>Nombre: Ciente Prueba</Col></Row>
                            <Row style={{border:'1px solid black'}}>
                                <Col style={{borderRight:'1px solid'}}>
                                    Numero de identificacion: 095710255
                                </Col>
                                <Col style={{border:''}}>
                                    Tipo de identificacion: RUC
                                </Col>
                            </Row>
                            <Row style={{borderRight:'1px solid black', borderLeft:'1px solid black'}}>
                                <Col style={{borderRight:'1px solid'}}>Provincia: Loja</Col>
                                <Col style={{borderRight:'1px solid'}}>Canton: Loja</Col>
                                <Col style={{border:''}}>Parroquia: Loja</Col>
                            </Row>
                            <Row style={{border:'1px solid black'}}>
                                <Col style={{border:''}}>Direccion</Col>
                            </Row>
                            <Row style={{borderRight:'1px solid black', borderLeft:'1px solid black'}}>
                                <Col style={{border:''}}>Referencia</Col>
                            </Row>
                            <Row style={{border:'1px solid black'}}>
                                <Col style={{border:''}}>Telefono</Col>
                                <Col style={{border:''}}>Email</Col>
                            </Row>
                            <Row style={{borderRight:'1px solid black', borderLeft:'1px solid black', borderBottom:'1px solid black'}}>
                                <Col style={{border:''}} sm={8}><Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}><Col style={{borderRight:'1px solid'}}>Nro. Items</Col><Col style={{border:''}}>Peso en Gramos</Col><Col style={{borderTop:'1px solid'}}>Valor declarado</Col></Row><Row style={{border:''}}><Col style={{borderRight:'1px solid'}}>Descripcion</Col></Row></Col>
                                <Col sm={4}>
                                    Firma
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}><Col style={{border:''}}>Nombre: Destinatario Prueba</Col></Row>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}>
                                <Col style={{borderRight:'1px solid'}}>
                                    Numero de identificacion: 095710255
                                </Col >
                                <Col style={{border:''}}>
                                    Tipo de identificacion: RUC
                                </Col>
                            </Row>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}>
                                <Col style={{borderRight:'1px solid'}}>Provincia: Loja</Col>
                                <Col style={{borderRight:'1px solid'}}>Canton: Loja</Col>
                                <Col style={{border:''}}>Parroquia: Loja</Col>
                            </Row>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}>
                                <Col style={{border:''}}>Direccion</Col>
                            </Row>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}>
                                <Col style={{border:''}}>Referencia</Col>
                            </Row>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}>
                                <Col style={{border:''}}>Telefono</Col>
                                <Col style={{border:''}}>Email</Col>
                            </Row>
                            <Row style={{borderBottom:'1px solid', borderRight:'1px solid'}}>
                                <Col style={{border:''}}><Row style={{borderBottom:'1px solid', borderRight:'1px solid'}} ><Col>Nombres</Col></Row><Row style={{borderRight:'1px solid'}}><Col style={{borderRight:'1px solid'}} >Fecha:</Col><Col style={{border:''}}>Hora:</Col><Col style={{borderTop:'1px solid'}}>CI:</Col></Row></Col>
                                <Col style={{border:''}}>Firma:</Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </diV>
        </Container>
    )
}

const border = { borderBottom: '1px soild', borderRight: '1px solid', borderLeft: '1px solid', borderTop: '1px solid' };
const rowStyle = { borderBottom: 'none', borderRight: '1px solid', borderLeft: '1px solid', borderTop: '1px solid' };
const lastRow = { borderBottom: '1px solid', borderRight: '1px solid', borderLeft: '1px solid', borderTop: '1px solid' };
const innnerRow = {borderBottom: '1px solid', borderRight: 'none', borderLeft: 'none', borderTop: '1px solid'}
const row = {borderBottom: '1px solid', borderRight: 'none', borderLeft: '1px solid', borderTop: '1px solid'}