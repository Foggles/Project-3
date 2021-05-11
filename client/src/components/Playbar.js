import React from "react";
import * as FCG from "fantasy-content-generator";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

export default function Playbar(props) {

    function generateCharacter() {
        const generatedCharacter = FCG.Names.generate({ seed: props.propsCharacterData.seed });
        console.log(generatedCharacter);

        return generatedCharacter;
    };

    const generatedCharacter = generateCharacter();
    console.log(generatedCharacter);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (props.propsClassAbilities == null) {
        return (
            <div> Loading... </div>
        )
    };

    const disabled = !props.propsTurn || props.propsTurn === 2 || props.propsTurn === 3;

    return (
        <Container>
            <Table variant="dark" size="sm" borderless className="text-center" width="100rem">
                <thead>
                    <tr>
                        <th><ProgressBar animated variant="danger" now={props.propsPlayerHealth} label={`${props.propsPlayerHealth}`} /></th>
                        <td><ProgressBar animated now={props.propsPlayerMana} label={`${props.propsPlayerMana}`} /></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button disabled={disabled} onClick={props.triggerPlayerAction(props.propsClassAbilities[0].effect)} block variant="outline-light">
                                <h5>{props.propsClassAbilities[0].name}</h5>
                                <p>{props.propsClassAbilities[0].effect}</p>
                            </Button>
                        </td>
                        <td>
                            <Button disabled={disabled} onClick={props.triggerPlayerAction(props.propsClassAbilities[1].effect)} block variant="outline-light">
                                <h5>{props.propsClassAbilities[1].name}</h5>
                                <p>{props.propsClassAbilities[1].effect}</p>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button disabled={disabled} onClick={props.triggerPlayerAction(props.propsClassAbilities[2].effect)} block variant="outline-light">
                                <h5>{props.propsClassAbilities[2].name}</h5>
                                <p>{props.propsClassAbilities[2].effect}</p>
                            </Button>
                        </td>
                        <td>
                            <Button disabled={disabled} onClick={props.triggerPlayerAction(props.propsClassAbilities[3].effect)} block variant="outline-light">
                                <h5>{props.propsClassAbilities[3].name}</h5>
                                <p>{props.propsClassAbilities[3].effect}</p>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table variant="dark" size="sm" borderless className="text-center" width="30px">
                <thead>
                    <tr>
                        <th>{generatedCharacter.name}</th>
                    </tr>
                    <tr>
                        <th>Level {props.propsCharacterData.level}</th>
                    </tr>
                    <tr>
                        <td>{props.propsCharacterData.Class.name}</td>
                    </tr>
                    <tr>
                        <td>{capitalizeFirstLetter(generatedCharacter.race)}</td>
                    </tr>
                </thead>
            </Table>
        </Container>
    );

};