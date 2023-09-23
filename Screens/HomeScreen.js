import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { Button, Card } from 'react-native-paper';
import { dices } from './Dices';
import { MatchResult } from '../Classes/MatchResult';
import { saveMatchHistory, loadMatchHistory } from  '../AsyncStorage';

export const HomeScreen = ({ navigation }) => {
    const diceRoll = () => Math.floor(Math.random() * 6);

    const [firstDice, setFirstDice] = useState(0);
    const [secondDice, setSecondDice] = useState(0);

    const setDiceValues = () => {
        setFirstDice(diceRoll());
        setSecondDice(diceRoll());
    };

    const clickAction = () => {
        setDiceValues();
        console.log('clicou');
      
        const wonThisMatch = (firstDice + 1 + secondDice + 1) === 7 || (firstDice + 1 + secondDice + 1) === 11;
        console.log(wonThisMatch);
      
        const thisMatch = new MatchResult(wonThisMatch, new Date());
      
        loadMatchHistory()
          .then((history) => {
            const updatedHistory = [...history, thisMatch];
            saveMatchHistory(updatedHistory);
          })
          .catch((error) => {
            console.error('Erro ao carregar ou salvar histórico:', error);
          });
      };

    return (
        <SafeAreaView style={styles.safeArea}>
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
