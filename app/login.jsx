import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../src/services/firebaseConfig";

import { router } from "expo-router";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function login() {

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {

        alert("Login realizado!");

        router.push("/home");

      })

      .catch((error) => {

        alert(error.message);

      });

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={login}
      >

        <Text style={styles.textoBotao}>
          Entrar
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20
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