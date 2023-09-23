import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar histórico de partidas
export const saveMatchHistory = async (history) => {
  try {
    await AsyncStorage.setItem('matchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar histórico de partidas:', error);
  }
};

// Função para carregar histórico de partidas
export const loadMatchHistory = async () => {
  try {
    const historyString = await AsyncStorage.getItem('matchHistory');
    if (historyString !== null) {
      return JSON.parse(historyString);
    }
  } catch (error) {
    console.error('Erro ao carregar histórico de partidas:', error);
  }
  return [];
};
