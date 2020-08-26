import React, { useState } from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import MainSucursal from '../screens/main-screen-sucursal'
import { Icon } from '@material-ui/core'
import ModalAddOrder from "../components/modal-add-order";
export default function SucursalView(){
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
  
    return(
        <Container>
            <ModalAddOrder show={showModal} close={handleClose}/>
            <MainSucursal/>
            <ListGroup className="mt-3">
                <ListGroup.Item className='d-flex justify-content-between d-flex align-items-center'>
                    RN000000000EC
                    <Button onClick={()=>{setShowModal(!showModal)}}><Icon>create</Icon></Button>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}