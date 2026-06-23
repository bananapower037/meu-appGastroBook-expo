import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default function Favoritos() {

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Receitas Favoritas
      </Text>

      <Text style={styles.texto}>
        Você ainda não salvou nenhuma receita.
      </Text>

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

  titulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },

  texto: {
    color: "#AAAAAA",
    fontSize: 16
  }

});