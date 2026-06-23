import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { router } from "expo-router";

export default function CardReceita({
  id,
  nome,
  categoria,
  tempo,
  dificuldade,
  usuarioEmail,
  curtidas,
  nota
}) {

  function abrirReceita() {

    router.push({
      pathname: "/detalhes",
      params: { id }
    });

  }

  return (

    <TouchableOpacity
      style={styles.card}
      onPress={abrirReceita}
    >

      <Text style={styles.nome}>
        {nome}
      </Text>

      <Text style={styles.autor}>
        👨‍🍳 {usuarioEmail || "Usuário"}
      </Text>

      <Text style={styles.categoria}>
        {categoria}
      </Text>

      <View style={styles.linhaInfo}>

        <Text style={styles.info}>
          ⏱ {tempo}
        </Text>

        <Text style={styles.info}>
          📖 {dificuldade}
        </Text>

      </View>

      <View style={styles.linhaInfo}>

        <Text style={styles.info}>
          ⭐ {nota || 0}
        </Text>

        <Text style={styles.info}>
          ❤️ {curtidas || 0}
        </Text>

      </View>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },

  autor: {
    color: "#999999",
    fontSize: 12,
    marginTop: 4
  },

  categoria: {
    color: "#CCCCCC",
    marginTop: 8
  },

  linhaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  info: {
    color: "#FF6B00",
    fontWeight: "bold"
  }

});