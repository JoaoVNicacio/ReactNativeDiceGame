import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button, Card } from 'react-native-paper';

export const HomeScreen = ({ navigation }) => {
    const diceRoll = () => { Math.floor(Math.random() * 6) };

    const diceSides = [
        require("../assets/Images/dice-six-faces-one.png"),
        require("../assets/Images/dice-six-faces-two.png"),
        require("../assets/Images/dice-six-faces-three.png"),
        require("../assets/Images/dice-six-faces-four.png"),
        require("../assets/Images/dice-six-faces-five.png"),
        require("../assets/Images/dice-six-faces-six.png"),
    ];

    const [firstDice, setFirstDice] = useState(null);
    const [secondDice, setSecondDice] = useState(null);

    const setDiceValues = () => {
        setFirstDice(diceRoll());
        setSecondDice(diceRoll());
    };

    const clickAction = () => {
        setDiceValues();
        console.log("clicou");
    }

    return (
        <SafeAreaView>
            <View>
                {firstDice != null &&
                    (< Image source={diceSides[firstDice]} />)
                }

                {secondDice != null &&
                    (< Image source={diceSides[secondDice]} />)
                }
            </View>
            <Button mode="contained" onPress={clickAction}>
                Role os dados!
            </Button>
            <Button mode="contained" onPress={() => {
                navigation.navigate("Historic", {
                    itemId: 86,
                    otherParam: "anything you want here",
                });
            }}>
                Ver histórico
            </Button>
        </SafeAreaView>
    );
};
