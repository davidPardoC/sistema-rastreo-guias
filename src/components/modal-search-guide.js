import React from "react";
import { Container, Table } from "react-bootstrap";

export default function GuideInfo(props) {
  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Remitente:</td>
            <td>
              {`${props.guide.remitente.nombre} ${props.guide.remitente.apellido}`}
            </td>
          </tr>

          <tr>
            <td>Destinatario:</td>
            <td>
              {`${props.guide.destinatario.nombre} ${props.guide.destinatario.apellido}`}
            </td>
            <td>Destino:</td>
            <td>
              {`${props.guide.destinatario.provincia}, ${props.guide.destinatario.canton}, ${props.guide.destinatario.parroquia}`}
            </td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>FECHA</td>
            <td>ESTADO</td>
          </tr>
          {props.estados.map((estado) => (
            <tr key={estado.date}>
              <td>{`${new Date(estado.date.seconds * 1000).getFullYear()}/${new Date(estado.date.seconds * 1000).getMonth()}/${new Date(estado.date.seconds * 1000).getDate()}  ${new Date(estado.date.seconds * 1000).getHours()}:${new Date(estado.date.seconds * 1000).getMinutes()}`}</td>
              <td>{estado.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
