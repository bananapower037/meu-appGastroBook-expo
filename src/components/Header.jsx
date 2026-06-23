import { View, Text, StyleSheet } from "react-native";

export default function Header() {

  return (

    <View style={styles.header}>

      <Text style={styles.logo}>
        GastroBook
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#1E1E1E",
    marginBottom: 20
  },

  logo: {
    color: "#FF6B00",
    fontSize: 24,
    fontWeight: "bold"
  }

});