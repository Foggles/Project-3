import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Playbar(props) {
    const [error, setError] = useState("");

    function generateCharacter() {
        const generatedCharacter = FCG.Names.generate({ seed: props.propsCharacterData.seed });
        console.log(generatedCharacter);

        return generatedCharacter;
    };

    const generatedCharacter = generateCharacter();
    console.log(generatedCharacter);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Container>
            <Table variant="dark" size="sm" borderless hover className="text-center" width="80px">
                <thead>
                    <tr>
                        <th><ProgressBar animated variant="danger" now={props.propsCharacterData.health} label={`${props.propsCharacterData.health}`} /></th>
                        <td><ProgressBar animated now={props.propsCharacterData.mana} label={`${props.propsCharacterData.mana}`} /></td>
                    </tr>
                    <tr>
                        <th>{generatedCharacter.name}</th>
                        <th>Level {props.propsCharacterData.level}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.propsCharacterData.Class.name}</td>
                        <td>{capitalizeFirstLetter(generatedCharacter.race)}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>


    )
};