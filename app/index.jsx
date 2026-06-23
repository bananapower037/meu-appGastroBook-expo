import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Index() {

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        GastroBook
      </Text>

      <Text style={styles.subtitulo}>
        Crie, salve e compartilhe receitas incríveis
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.textoBotao}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCadastro}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.textoBotao}>
          Criar Conta
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
    alignItems: "center",
    padding: 20
  },

  logo: {
    color: "#FF6B00",
    fontSize: 40,
    fontWeight: "bold"
  },

  subtitulo: {
    color: "#FFFFFF",
    marginTop: 10,
    marginBottom: 40
  },

  botao: {
    backgroundColor: "#FF6B00",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  botaoCadastro: {
    borderWidth: 1,
    borderColor: "#FF6B00",
    width: "100%",
    padding: 15,
    borderRadius: 10
  },

  textoBotao: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold"
  }

});