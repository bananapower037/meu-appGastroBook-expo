import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "@gastrobook_receitas";

export async function salvarReceitasLocal(receitas) {

  await AsyncStorage.setItem(
    CHAVE,
    JSON.stringify(receitas)
  );

}

export async function buscarReceitasLocal() {

  const dados = await AsyncStorage.getItem(CHAVE);

  return dados ? JSON.parse(dados) : [];

}