import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiceRoller } from 'rpg-dice-roller';
import { DiceRoll } from 'rpg-dice-roller';


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import Playbar from "./Playbar";
import Enemy from "./Enemy";

export default function Playscreen() {
    let { id } = useParams();

    const [error, setError] = useState("");
    const [turn, setTurn] = useState(null);
    const [damage, setDamage] = useState(null);

    const [characterData, setCharacterData] = useState(null);
    const [currentEnemy, setCurrentEnemy] = useState(null);
    const [enemyAbilities, setEnemyAbilities] = useState(null);
    const [classAbilities, setClassAbilities] = useState(null);
    const [playerHealth, setPlayerHealth] = useState(null);
    const [playerMana, setPlayerMana] = useState(null);
    const [enemyHealth, setEnemyHealth] = useState(null);
    const [enemyMessage, setEnemyMessage] = useState("");

    useEffect(() => {
        const fetchEnemy = fetch("/api/enemies", {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.status !== 200) {
                throw resp.statusText;
            }
            return resp.json();
        });

        const fetchPlayer = fetch("/api/characters/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.status !== 200) {
                throw resp.statusText;
            }
            return resp.json();
        });

        const fetchEnemyAbilities = fetch("/api/enemy-abilities/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.status !== 200) {
                throw resp.statusText;
            }
            return resp.json();
        });

        const fetchClassAbilities = fetch("/api/class-abilities/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.status !== 200) {
                throw resp.statusText;
            }
            return resp.json();
        });

        Promise.all([fetchEnemy, fetchPlayer, fetchEnemyAbilities, fetchClassAbilities])
            .then(([dataEnemy, dataPlayer, dataEnemyAbilities, dataClassAbilities]) => {
                const enemy = dataEnemy[0];
                setCurrentEnemy(enemy);
                setEnemyHealth(enemy.health);
                setCharacterData(dataPlayer);
                setEnemyAbilities(dataEnemyAbilities);
                console.log(dataClassAbilities);
                setClassAbilities(dataClassAbilities);
                setPlayerHealth(dataPlayer.health);
                setPlayerMana(dataPlayer.mana);
            })
            .catch((error) => {
                setError(error);
            });
    }, [id]);

    useEffect(() => {
        if (turn == null) {
            return;
        } else if (turn == 1) {
            setEnemyMessage("");

            triggerPlayerAction();

        } else if (turn == 2) {
            setEnemyMessage("Preparing to Attack!");

            setTimeout(function () {
                let potentialAbilities = enemyAbilities;
                let randomAbility = potentialAbilities[Math.floor(potentialAbilities.length * Math.random())];
                console.log(randomAbility);
                let damageRoll = new DiceRoll(randomAbility.effect);
                console.log(damageRoll.total);

                setPlayerHealth(playerHealth - damageRoll.total);
                setTurn(1);
            }, 1000);

        }
    }, [turn])

    const triggerPlayerAction = (abilityEffect) => () => {
        console.log("Which does " + abilityEffect);

        let damageRoll = new DiceRoll(abilityEffect);
        console.log(damageRoll.total);

        setEnemyHealth(enemyHealth - damageRoll.total);

        setTurn(2);
    }

    function randomStartTurn() {
        const randomTurn = Math.floor(Math.random() * 2) + 1;
        console.log(randomTurn);

        setTurn(randomTurn);
    }

    function turnName(data) {
        if (data == 1) {
            return ("Player Turn");
        } else if (data == 2) {
            return ("Enemy Turn");
        }
    }

    if (currentEnemy == null || enemyAbilities == null || enemyHealth == null || characterData == null || classAbilities == null || playerHealth == null || playerMana == null) {
        return (
            <div>
                ... Loading ...
            </div>
        )
    }

    return (
        <>
            <Jumbotron>
                <Container>
                    <Row>
                        <Enemy propsCurrentEnemy={currentEnemy} propsEnemyAbilities={enemyAbilities}
                            propsEnemyHealth={enemyHealth}
                            propsTurn={turn} propsDamage={damage} message={enemyMessage} />
                    </Row>
                    {!turn && <Row>
                        <Button variant="outline-success" style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                        }} onClick={randomStartTurn}><h2>START GAME</h2></Button>
                    </Row>}
                </Container>
            </Jumbotron>
            <Row className="text-center">
                <Col></Col>
                <Col><h6>{turnName(turn)}</h6></Col>
                <Col></Col>

            </Row>

            <Container>
                <Playbar propsCharacterData={characterData} propsClassAbilities={classAbilities}
                    propsPlayerHealth={playerHealth} propsPlayerMana={playerMana}
                    propsTurn={turn} propsDamage={damage} triggerPlayerAction={triggerPlayerAction} />
            </Container>
        </>
    )
}