import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "../src/services/firebaseConfig";

import {
  useLocalSearchParams,
  router
} from "expo-router";

export default function EditarReceita() {

  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState("");

  const [categoria, setCategoria] = useState("");

  const [ingredientes, setIngredientes] = useState("");

  const [preparo, setPreparo] = useState("");

  const [tempo, setTempo] = useState("");

  const [dificuldade, setDificuldade] = useState("");

  async function buscarReceita() {

    const receitaRef = doc(db, "receitas", id);

    const receitaSnap = await getDoc(receitaRef);

    if (receitaSnap.exists()) {

      const dados = receitaSnap.data();

      setNome(dados.nome);

      setCategoria(dados.categoria);

      setIngredientes(dados.ingredientes);

      setPreparo(dados.preparo);

      setTempo(dados.tempo);

      setDificuldade(dados.dificuldade);

    }

  }

  async function editarReceita() {

    try {

      await updateDoc(
        doc(db, "receitas", id),
        {
          nome,
          categoria,
          ingredientes,
          preparo,
          tempo,
          dificuldade
        }
      );

      alert("Receita atualizada!");

      router.replace("/home");

    }

    catch (error) {

      alert(error.message);

    }

  }

  useEffect(() => {

    buscarReceita();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Editar Receita
      </Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Categoria"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={tempo}
        onChangeText={setTempo}
        placeholder="Tempo"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={dificuldade}
        onChangeText={setDificuldade}
        placeholder="Dificuldade"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={ingredientes}
        onChangeText={setIngredientes}
        placeholder="Ingredientes"
        placeholderTextColor="#999"
        multiline
      />

      <TextInput
        style={styles.inputGrande}
        value={preparo}
        onChangeText={setPreparo}
        placeholder="Modo de preparo"
        placeholderTextColor="#999"
        multiline
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={editarReceita}
      >

        <Text style={styles.textoBotao}>
          Salvar Alterações
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: 50
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  inputGrande: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 120,
    textAlignVertical: "top"
  },

  botao: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 10
  },

  textoBotao: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold"
  }

});