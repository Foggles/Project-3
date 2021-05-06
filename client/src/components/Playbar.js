import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export default function Playbar(props) {
    const [error, setError] = useState("");

    function generateCharacter() {
        const generatedCharacter = FCG.Names.generate({ seed: props.propsCharacterData.seed });
        console.log(generatedCharacter);

        return generatedCharacter;
    };

    const generatedCharacter = generateCharacter();
    console.log(generatedCharacter);

    return (
        <Container>
            <Table variant="dark" size="sm" borderless hover className="text-center" width="80px">
                <thead>
                    <tr>
                        <th>{generatedCharacter.name}</th>
                        <th>Level {props.propsCharacterData.level}</th>
                    </tr>

                    <tr>
                        <td>{props.propsCharacterData.Class.name}</td>
                        <td>{generatedCharacter.race}</td>
                    </tr>

                    <tr>
                        <td>{props.propsCharacterData.health}</td>
                        <td>{props.propsCharacterData.mana}</td>
                    </tr>
                </thead>
            </Table>
        </Container>


    )
};