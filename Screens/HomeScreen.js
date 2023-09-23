import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { Button, Card } from 'react-native-paper';
import { dices } from './Dices';

export const HomeScreen = ({ navigation }) => {
    const diceRoll = () => Math.floor(Math.random() * 6);

    const [firstDice, setFirstDice] = useState(0);
    const [secondDice, setSecondDice] = useState(0);

    const setDiceValues = () => {
        setFirstDice(diceRoll());
        setSecondDice(diceRoll());
        console.log(diceRoll())
    };

    const clickAction = () => {
        setDiceValues();
        console.log("clicou");
        console.log(firstDice);
        console.log(secondDice);
    }

    return (
        <SafeAreaView style = {styles.safeArea}>
            <View style={styles.container}>
                < Image
                    style={styles.image}
                    source={dices[`dice${firstDice + 1}`]}
                />
                < Image
                    style={styles.image}
                    source={dices[`dice${secondDice + 1}`]}
                />
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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        padding: 8,
        height: 200,
        gap: 25
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 50,
        height: 50
    },
    safeArea: {
        gap: 25
    }
});
