import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  db,
  auth
} from "../src/services/firebaseConfig";

import CardReceita from "../src/components/CardReceita";

export default function Perfil() {

  const [receitas, setReceitas] = useState([]);

  async function buscarMinhasReceitas() {

    try {

      const querySnapshot = await getDocs(
        collection(db, "receitas")
      );

      const lista = [];

      querySnapshot.forEach((item) => {

        const dados = item.data();

        console.log(dados);

        if (
          dados.usuarioId === auth.currentUser.uid
        ) {

          lista.push({
            id: item.id,
            ...dados
          });

        }

      });

      setReceitas(lista);

    }

    catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    buscarMinhasReceitas();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Meu Perfil
      </Text>

      <Text style={styles.email}>
        {auth.currentUser?.email}
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

  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold"
  },

  email: {
    color: "#FF6B00",
    marginTop: 10,
    marginBottom: 20
  }

});