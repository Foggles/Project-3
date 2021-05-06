import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

import Playbar from "./Playbar";

export default function Playscreen(props) {
    console.log(props.propsCharacterData);
    return (
        <Container>
            <h1>PlayScreen</h1>
            <Playbar propsCharacterData = {props.propsCharacterData}/>
        </Container>
    )
}