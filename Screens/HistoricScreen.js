import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { loadMatchHistory } from '../AsyncStorage';

export const HistoricScreen = ({ navigation }) => {
    const [matchHistory, setMatchHistory] = useState([]);

    useEffect(() => {
        // Carregue o histórico de partidas quando a tela for montada
        loadMatchHistory()
            .then((history) => {
                setMatchHistory(history);
            })
            .catch((error) => {
                console.error('Erro ao carregar histórico:', error);
            });
    }, []);

    const createSections = () => {
        const sections = [];

        matchHistory.forEach((match) => {
            const matchDate = new Date(match.date);
            const monthYear = `${matchDate.getMonth() + 1}/${matchDate.getFullYear()}`;

            // Verifique se a seção já existe ou crie uma nova
            const sectionIndex = sections.findIndex((section) => section.title === monthYear);

            if (sectionIndex === -1) {
                sections.push({
                    title: monthYear,
                    data: [match],
                });
            } 
            else {
                sections[sectionIndex].data.push(match);
            }
        });
        return sections;
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text>{item.won ? 'Vitória' : 'Derrota'}</Text>
                <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
            </View>
        );
    };

    const renderSectionHeader = ({ section: { title } }) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={createSections()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionHeader: {
        backgroundColor: '#f2f2f2',
        padding: 8,
    },
    sectionHeaderText: {
        fontWeight: 'bold',
    },
});
