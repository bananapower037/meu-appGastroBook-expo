import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";

import { useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../src/services/firebaseConfig";

import CardReceita from "../src/components/CardReceita";

export default function PerfilUsuario() {

  const { usuarioId } =
    useLocalSearchParams();

  const [receitas, setReceitas] =
    useState([]);

  const [email, setEmail] =
    useState("");

  async function carregar() {

    const querySnapshot =
      await getDocs(
        collection(db, "receitas")
      );

    const lista = [];

    querySnapshot.forEach((doc) => {

      const dados = doc.data();

      if (
        dados.usuarioId === usuarioId
      ) {

        lista.push({
          id: doc.id,
          ...dados
        });

        setEmail(
          dados.usuarioEmail
        );

      }

    });

    setReceitas(lista);

  }

  useEffect(() => {

    carregar();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.nome}>
        👨‍🍳 {email}
      </Text>

      <Text style={styles.total}>
        Receitas criadas:
        {" "}
        {receitas.length}
      </Text>

      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <CardReceita
            id={item.id}
            nome={item.nome}
            categoria={item.categoria}
            tempo={item.tempo}
            dificuldade={item.dificuldade}
          />

        )}
      />

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

  nome: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  total: {
    color: "#AAAAAA",
    marginBottom: 20
  }

});