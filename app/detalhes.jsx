import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";

import { useEffect, useState } from "react";


import {
  useLocalSearchParams,
  router
} from "expo-router";

import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import {
  db,
  auth
} from "../src/services/firebaseConfig";


export default function Detalhes() {

  const { id } = useLocalSearchParams();

  const [receita, setReceita] = useState(null);

  const [comentario, setComentario] = useState("");

const [comentarios, setComentarios] = useState([]);

  async function buscarReceita() {

    const docRef = doc(db, "receitas", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      setReceita(docSnap.data());

    }

  }

  async function avaliarReceita(valor) {

    try {

      await updateDoc(
        doc(db, "receitas", id),
        {
          nota: valor
        }
      );

      setReceita({
        ...receita,
        nota: valor
      });

    }

    catch (error) {

      alert(error.message);

    }

  }


  async function buscarComentarios() {

  const q = query(
    collection(db, "comentarios"),
    where("receitaId", "==", id)
  );

  const querySnapshot = await getDocs(q);

  const lista = [];

  console.log("ID RECEBIDO:", id);

  querySnapshot.forEach((doc) => {

     console.log("COMENTARIO:", doc.data());

    lista.push({
      id: doc.id,
      ...doc.data()
    });

  });

  setComentarios(lista);


}

async function enviarComentario() {
  if (!comentario.trim()) return;

  try {
    await addDoc(collection(db, "comentarios"), {
  receitaId: id,
  usuarioId: auth.currentUser.uid,
  usuarioEmail: auth.currentUser.email,
  texto: comentario
});
    setComentario("");

    await buscarComentarios();
  } catch (error) {
    alert(error.message);
  }
}


  async function curtirReceita() {
  try {
    const userId = auth.currentUser.uid;

    const receitaRef = doc(db, "receitas", id);
    const receitaSnap = await getDoc(receitaRef);

    if (!receitaSnap.exists()) return;

    const data = receitaSnap.data();

    const likes = data.likes || {};

    const jaCurtiu = !!likes[userId];
if (jaCurtiu) {
  // 🔴 DESLIKE
  delete likes[userId];

  await updateDoc(receitaRef, {
    likes,
    curtidas: increment(-1)
  });

  setReceita((prev) => ({
    ...prev,
    curtidas: (prev.curtidas || 1) - 1,
    likes
  }));

} else {
  // 🟢 LIKE
  likes[userId] = true;

  await updateDoc(receitaRef, {
    likes,
    curtidas: increment(1)
  });

  setReceita((prev) => ({
    ...prev,
    curtidas: (prev.curtidas || 0) + 1,
    likes
  }));
}

  } catch (error) {
    alert(error.message);
  }
}

async function excluirComentario(idComentario) {
  try {
    await deleteDoc(
      doc(db, "comentarios", idComentario)
    );

    buscarComentarios();

  } catch (error) {
    alert(error.message);
  }
}

  

  async function excluirReceita() {

  if (
    auth.currentUser?.uid !== receita.usuarioId
  ) {

    alert(
      "Você só pode excluir receitas criadas por você."
    );

    return;

  }

  Alert.alert(
    "Excluir",
    "Deseja excluir esta receita?",
    [
      {
        text: "Cancelar",
        style: "cancel"
      },

      {
        text: "Excluir",

        onPress: async () => {

          try {

            await deleteDoc(
              doc(db, "receitas", id)
            );

            alert("Receita excluída!");

            router.replace("/home");

          }

          catch (error) {

            alert(error.message);

          }

        }

      }

    ]
  );

}

  useEffect(() => {

  buscarReceita();

  buscarComentarios();

}, []);

  if (!receita) {

  return (

    <View style={styles.container}>
      <Text style={styles.loading}>
        Carregando...
      </Text>
    </View>

  );

}

console.log("TOTAL:", comentarios.length);

const jaCurtiu =
  receita?.likes?.[auth.currentUser?.uid] || false;

return (

  <ScrollView
  style={styles.container}
  contentContainerStyle={{
    paddingBottom: 200
  }}
>
<TouchableOpacity
  onPress={() =>
    router.push({
      pathname: "/perfilUsuario",
      params: {
        usuarioId: receita.usuarioId
      }
    })
  }
>

  <Text style={styles.autor}>
    👨‍🍳 {receita.usuarioEmail || "Usuário"}
  </Text>

</TouchableOpacity>
    <Text style={styles.info}>
      ⏱ {receita.tempo}
    </Text>

    <View style={styles.linhaInfo}>
  <Text style={styles.info}>
    ⭐ Nota: {receita.nota || 0}
  </Text>

  <View style={styles.areaCurtidas}>
    <Text style={styles.info}>
      {receita.curtidas || 0} curtidas
    </Text>

    <TouchableOpacity onPress={curtirReceita}>
      <Text style={styles.coracao}>
        {jaCurtiu ? "❤️" : "🤍"}
      </Text>
    </TouchableOpacity>
  </View>
</View>

<Text style={styles.subtitulo}>
  Ingredientes
</Text>

    <Text style={styles.texto}>
      {receita.ingredientes}
    </Text>

    <Text style={styles.subtitulo}>
      Modo de preparo
    </Text>

    <Text style={styles.texto}>
      {receita.preparo}
    </Text>

    <Text style={styles.subtitulo}>
      Avalie esta receita
    </Text>

    <View style={styles.estrelas}>

      {[1, 2, 3, 4, 5].map((item) => (

        <TouchableOpacity
          key={item}
          onPress={() => avaliarReceita(item)}
        >

          <Text style={styles.estrela}>
            {item <= (receita.nota || 0)
              ? "⭐"
              : "☆"}
          </Text>

        </TouchableOpacity>

      ))}

    </View>


<Text style={styles.subtitulo}>
  💬 
</Text>

<TextInput
  style={styles.inputComentario}
  placeholder="Escreva um comentário..."
  placeholderTextColor="#999"
  value={comentario}
  onChangeText={setComentario}
/>

<TouchableOpacity
  style={styles.botaoComentar}
  onPress={enviarComentario}
>
  <Text style={styles.textoBotao}>
    Comentar
  </Text>
</TouchableOpacity>

<Text style={{ color: "red", marginBottom: 20 }}>
  Total: {comentarios.length}
</Text>


{comentarios.map((item) => (
  <View key={item.id} style={styles.cardComentario}>
    <Text style={styles.autorComentario}>
      {item.usuarioEmail}
    </Text>

    <Text style={styles.textoComentario}>
      {item.texto}
    </Text>

    {item.usuarioId === auth.currentUser?.uid && (
      <TouchableOpacity
        onPress={() => excluirComentario(item.id)}
      >
        <Text style={{ color: "red", marginTop: 5 }}>
           Excluir
        </Text>
      </TouchableOpacity>
    )}
  </View>
))}

{auth.currentUser?.uid === receita.usuarioId && (
  <>

    <TouchableOpacity
      style={styles.botaoEditar}
      onPress={() =>
        router.push({
          pathname: "/editarReceita",
          params: { id }
        })
      }
    >
      <Text style={styles.textoBotao}>
         Editar Receita
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.botaoExcluir}
      onPress={excluirReceita}
    >
      <Text style={styles.textoBotao}>
        Excluir Receita
      </Text>
    </TouchableOpacity>

  </>
)}



  


  </ScrollView>

);

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: 50
  },

  loading: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50
  },

  autor: {
    color: "#AAAAAA",
    fontSize: 13,
    marginBottom: 12
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
  },

  info: {
    color: "#FF6B00",
    marginBottom: 5,
    fontSize: 14
  },


  subtitulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8
  },

  texto: {
    color: "#CCCCCC",
    lineHeight: 22,
    fontSize: 14
  },

  estrelas: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20
  },

  estrela: {
    fontSize: 28,
    marginRight: 3
  },

areaCurtidas: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8
},
linhaInfo: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10
},

coracao: {
  fontSize: 22
},

  botaoEditar: {
    backgroundColor: "#FF6B00",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

 botaoExcluir: {
  backgroundColor: "#C62828",
  padding: 12,
  borderRadius: 10,
  marginBottom: 80
},

  textoBotao: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14
  },

  inputComentario: {
  backgroundColor: "#1E1E1E",
  color: "#FFFFFF",
  padding: 12,
  borderRadius: 10,
  marginTop: 10
},

botaoComentar: {
  backgroundColor: "#4CAF50",
  padding: 12,
  borderRadius: 10,
  marginTop: 10,
  marginBottom: 15
},

cardComentario: {
  backgroundColor: "#1E1E1E",
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  width: "100%"
},

autorComentario: {
  color: "#FF6B00",
  fontWeight: "bold",
  marginBottom: 5,
  flexWrap: "wrap"
},
 
textoComentario: {
  color: "#FFFFFF",
  flexShrink: 1
}

});