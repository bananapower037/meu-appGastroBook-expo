import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../src/services/firebaseConfig";

import CardReceita from "../src/components/CardReceita";

export default function Explorar() {

  const [receitas, setReceitas] = useState([]);

  const [tipoFeed, setTipoFeed]
    = useState("populares");

  async function buscarReceitas() {

    try {

      const querySnapshot = await getDocs(
        collection(db, "receitas")
      );

      const lista = [];

      querySnapshot.forEach((item) => {

        lista.push({
          id: item.id,
          ...item.data()
        });

      });

      setReceitas(lista);

    }

    catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    buscarReceitas();

  }, []);

  function organizarFeed() {

    if (tipoFeed === "populares") {

      return [...receitas].sort(
        (a, b) =>
          (b.curtidas || 0)
          -
          (a.curtidas || 0)
      );

    }

    if (tipoFeed === "melhores") {

      return [...receitas].sort(
        (a, b) =>
          (b.nota || 0)
          -
          (a.nota || 0)
      );

    }

    return receitas.reverse();

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Explorar
      </Text>

      <View style={styles.menu}>

        <TouchableOpacity
          style={[
            styles.botao,
            tipoFeed === "populares"
            &&
            styles.botaoAtivo
          ]}
          onPress={() =>
            setTipoFeed("populares")
          }
        >

          <Text style={styles.textoBotao}>
            🔥 Populares
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botao,
            tipoFeed === "melhores"
            &&
            styles.botaoAtivo
          ]}
          onPress={() =>
            setTipoFeed("melhores")
          }
        >

          <Text style={styles.textoBotao}>
            ⭐ Melhores
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botao,
            tipoFeed === "recentes"
            &&
            styles.botaoAtivo
          ]}
          onPress={() =>
            setTipoFeed("recentes")
          }
        >

          <Text style={styles.textoBotao}>
            🆕 Recentes
          </Text>

        </TouchableOpacity>

      </View>

      <FlatList
        data={organizarFeed()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <CardReceita
            id={item.id}
            nome={item.nome}
            categoria={item.categoria}
            tempo={item.tempo}
            dificuldade={item.dificuldade}
            usuarioEmail={item.usuarioEmail}
            curtidas={item.curtidas}
            nota={item.nota}
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
    fontWeight: "bold",
    marginBottom: 20
  },

  menu: {
    flexDirection: "row",
    marginBottom: 20
  },

  botao: {
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10
  },

  botaoAtivo: {
    backgroundColor: "#FF6B00"
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }

});