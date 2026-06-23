import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useState } from "react";
import { auth } from "../src/services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/services/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
export default function CriarReceita() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");

  const [ingredientes, setIngredientes] = useState("");

  const [preparo, setPreparo] = useState("");

  const [tempo, setTempo] = useState("");

  const [dificuldade, setDificuldade] = useState("");

  async function criarReceita() {

    try {

      await addDoc(collection(db, "receitas"), {

  nome,
  categoria,
  ingredientes,
  preparo,
  tempo,
  dificuldade,
  nota: 0,

  usuarioId: auth.currentUser.uid,

  usuarioEmail: auth.currentUser.email

});

      console.log("Receita salva");

      alert("Receita criada!");

      router.replace("/home");

    }

    catch (error) {

      alert(error.message);

      console.log(error);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Nova Receita
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Categoria"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setCategoria}
      />

      <TextInput
        placeholder="Tempo"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setTempo}
      />

      <TextInput
        placeholder="Dificuldade"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setDificuldade}
      />

      <TextInput
        placeholder="Ingredientes"
        placeholderTextColor="#999"
        style={styles.input}
        multiline
        onChangeText={setIngredientes}
      />

      <TextInput
        placeholder="Modo de preparo"
        placeholderTextColor="#999"
        style={styles.inputGrande}
        multiline
        onChangeText={setPreparo}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={criarReceita}
      >

        <Text style={styles.textoBotao}>
          Salvar Receita
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