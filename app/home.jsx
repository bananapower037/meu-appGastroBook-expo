import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { useEffect, useState } from "react";

import { router } from "expo-router";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../src/services/firebaseConfig";

import CardReceita from "../src/components/CardReceita";

import {
  salvarReceitasLocal,
  buscarReceitasLocal
} from "../src/storage/receitasStorage";

import api from "../src/services/api";

export default function Home() {

  const [receitas, setReceitas] = useState([]);

  const [busca, setBusca] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada]
    = useState("");

  async function buscarReceitas() {

    try {

      const resposta = await api.get(
        "/search.php?s=burger"
      );

      console.log(resposta.data);

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

      await salvarReceitasLocal(lista);

    }

    catch (error) {

      console.log(error);

      const receitasLocal =
        await buscarReceitasLocal();

      setReceitas(receitasLocal);

    }

  }

  useEffect(() => {

    buscarReceitas();

  }, []);

const receitasFiltradas = receitas
  .filter((item) => {

    const nome =
      item.nome?.toLowerCase() || "";

    const categoria =
      item.categoria?.toLowerCase() || "";

    const buscaTexto =
      busca.toLowerCase();

    const buscaNome =
      nome.includes(buscaTexto);

    const filtroCategoria =
      categoriaSelecionada === ""
      ||
      categoria.includes(
        categoriaSelecionada.toLowerCase()
      );

    return buscaNome && filtroCategoria;

  })

  .sort(
    (a, b) =>
      (b.curtidas || 0) -
      (a.curtidas || 0)
  );

  return (

    <View style={styles.container}>

      <View style={styles.topo}>

        <Text style={styles.titulo}>
          Receitas
        </Text>

        <View style={styles.botoesTopo}>

  <TouchableOpacity
    style={styles.botaoPerfil}
    onPress={() =>
      router.push("/explorar")
    }
  >

    <Text style={styles.textoPerfil}>
      Explorar
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={styles.botaoPerfil}
    onPress={() =>
      router.push("/perfil")
    }
  >

    <Text style={styles.textoPerfil}>
      Perfil
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={styles.botaoCriar}
    onPress={() =>
      router.push("/criarReceita")
    }
  >

    <Text style={styles.textoBotao}>
      +
    </Text>

  </TouchableOpacity>

</View>

      </View>

      <TextInput
        placeholder="Buscar receita..."
        placeholderTextColor="#999"
        style={styles.inputBusca}
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.categorias}>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() =>
            setCategoriaSelecionada("")
          }
        >
          <Text style={styles.textoCategoria}>
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() =>
            setCategoriaSelecionada("doce")
          }
        >
          <Text style={styles.textoCategoria}>
            🍰 Doces
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() =>
            setCategoriaSelecionada("massa")
          }
        >
          <Text style={styles.textoCategoria}>
            🍝 Massas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() =>
            setCategoriaSelecionada("bebida")
          }
        >
          <Text style={styles.textoCategoria}>
            🥤 Bebidas
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={receitasFiltradas}
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

  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold"
  },

  botoesTopo: {
    flexDirection: "row",
    alignItems: "center"
  },

  botaoPerfil: {
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10
  },

  textoPerfil: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },

  botaoCriar: {
    backgroundColor: "#FF6B00",
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold"
  },

  inputBusca: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20
  },

  categoria: {
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10
  },

  textoCategoria: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }

});