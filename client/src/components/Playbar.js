import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as FCG from "fantasy-content-generator";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

export default function Playbar(props) {
    const [error, setError] = useState("");
    const [classAbilities, setClassAbilities] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        fetch("/api/class-abilities/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setClassAbilities(data);
            })
            .catch((error) => {
                setError(error);
            })
    }, []);

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

    function testClick(abilityName, abilityEffect) {
        console.log("You clicked the " + abilityName + " button.");
        console.log("Which does " + abilityEffect);
    };

    if (classAbilities == null) {
        return (
            <div> Loading... </div>
        )
    };

    return (
        <Container>
            <Table variant="dark" size="sm" borderless className="text-center" width="100rem">
                <thead>
                    <tr>
                        <th><ProgressBar animated variant="danger" now={props.propsCharacterData.health} label={`${props.propsCharacterData.health}`} /></th>
                        <td><ProgressBar animated now={props.propsCharacterData.mana} label={`${props.propsCharacterData.mana}`} /></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button onClick={testClick(classAbilities[0].name, classAbilities[0].effect)} block variant="outline-light">
                                <h5>{classAbilities[0].name}</h5>
                                <p>{classAbilities[0].effect}</p>
                            </Button>
                        </td>
                        <td>
                            <Button onClick={testClick(classAbilities[1].name, classAbilities[1].effect)} block variant="outline-light">
                                <h5>{classAbilities[1].name}</h5>
                                <p>{classAbilities[1].effect}</p>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button onClick={testClick(classAbilities[2].name, classAbilities[2].effect)} block variant="outline-light">
                                <h5>{classAbilities[2].name}</h5>
                                <p>{classAbilities[2].effect}</p>
                            </Button>
                        </td>
                        <td>
                            <Button onClick={testClick(classAbilities[3].name, classAbilities[3].effect)} block variant="outline-light">
                                <h5>{classAbilities[3].name}</h5>
                                <p>{classAbilities[3].effect}</p>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table variant="dark" size="sm" borderless className="text-center" width="80px">
                <thead>

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