import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Playbar from "./Playbar";

export default function Playscreen(props) {
    console.log(props.propsCharacterData);
    return (
        <Container>
            <Card style={{ height: '40rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                <Playbar propsCharacterData={props.propsCharacterData} />
            </Card>
        </Container>
    )
}