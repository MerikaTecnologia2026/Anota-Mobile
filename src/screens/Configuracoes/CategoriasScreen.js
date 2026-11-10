import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CategoriasScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEdicao, setNomeEdicao] = useState("");

  function cadastrarCategoria() {
    const novoNome = nome.trim();

    if (!novoNome) {
      Alert.alert("Atenção", "Digite o nome da categoria.");
      return;
    }

    const existe = categorias.some(
      (item) => item.nome.toLowerCase() === novoNome.toLowerCase(),
    );

    if (existe) {
      Alert.alert("Atenção", "Essa categoria já existe.");
      return;
    }

    const novaCategoria = {
      id: Date.now().toString(),
      nome: novoNome,
    };

    setCategorias((anterior) => [...anterior, novaCategoria]);
    setNome("");

    Alert.alert("Sucesso", "Categoria cadastrada com sucesso!");
  }

  function iniciarEdicao(categoria) {
    setEditandoId(categoria.id);
    setNomeEdicao(categoria.nome);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setNomeEdicao("");
  }

  function salvarEdicao(id) {
    const novoNome = nomeEdicao.trim();

    if (!novoNome) {
      Alert.alert("Atenção", "Digite o nome da categoria.");
      return;
    }

    const existe = categorias.some(
      (item) =>
        item.id !== id && item.nome.toLowerCase() === novoNome.toLowerCase(),
    );

    if (existe) {
      Alert.alert("Atenção", "Essa categoria já existe.");
      return;
    }

    setCategorias((anterior) =>
      anterior.map((item) =>
        item.id === id ? { ...item, nome: novoNome } : item,
      ),
    );

    setEditandoId(null);
    setNomeEdicao("");

    Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
  }

  function excluirCategoria(id) {
    Alert.alert(
      "Excluir categoria",
      "Tem certeza que deseja excluir esta categoria?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setCategorias((anterior) =>
              anterior.filter((item) => item.id !== id),
            );

            if (editandoId === id) {
              cancelarEdicao();
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#17366B" />
        </TouchableOpacity>

        <View style={styles.headerTexto}>
          <Text style={styles.titulo}>Categorias</Text>
          <Text style={styles.subtitulo}>
            Gerencie as categorias da empresa
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.iconeFundo}>
              <Ionicons name="grid-outline" size={25} color="#1769D2" />
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>Categorias cadastradas</Text>
              <Text style={styles.cardDescricao}>
                Cadastre ou gerencie suas categorias
              </Text>
            </View>
          </View>

          <Text style={styles.label}>Nome da categoria</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Produtos de limpeza"
            placeholderTextColor="#98A2B3"
            value={nome}
            onChangeText={setNome}
            maxLength={100}
          />

          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={cadastrarCategoria}
          >
            <Ionicons name="add-circle-outline" size={21} color="#FFFFFF" />
            <Text style={styles.botaoCadastrarTexto}>Cadastrar categoria</Text>
          </TouchableOpacity>

          <View style={styles.divisor} />

          <View style={styles.listaHeader}>
            <Text style={styles.listaTitulo}>Lista de categorias</Text>

            <View style={styles.contador}>
              <Text style={styles.contadorTexto}>{categorias.length}</Text>
            </View>
          </View>

          {categorias.length === 0 ? (
            <View style={styles.vazio}>
              <Ionicons name="folder-open-outline" size={42} color="#98A2B3" />
              <Text style={styles.vazioTitulo}>
                Nenhuma categoria cadastrada
              </Text>
              <Text style={styles.vazioTexto}>
                Cadastre uma categoria para começar.
              </Text>
            </View>
          ) : (
            categorias.map((categoria) => {
              const editando = editandoId === categoria.id;

              return (
                <View key={categoria.id} style={styles.itemCategoria}>
                  <Text style={styles.itemLabel}>Categoria</Text>

                  {editando ? (
                    <TextInput
                      style={styles.inputEdicao}
                      value={nomeEdicao}
                      onChangeText={setNomeEdicao}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.itemNome}>{categoria.nome}</Text>
                  )}

                  <View style={styles.acoes}>
                    {editando ? (
                      <>
                        <TouchableOpacity
                          style={styles.botaoSalvar}
                          onPress={() => salvarEdicao(categoria.id)}
                        >
                          <Ionicons
                            name="checkmark-outline"
                            size={18}
                            color="#FFFFFF"
                          />
                          <Text style={styles.textoSalvar}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.botaoCancelar}
                          onPress={cancelarEdicao}
                        >
                          <Text style={styles.textoCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={styles.botaoEditar}
                          onPress={() => iniciarEdicao(categoria)}
                        >
                          <Ionicons
                            name="create-outline"
                            size={18}
                            color="#344054"
                          />
                          <Text style={styles.textoEditar}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.botaoExcluir}
                          onPress={() => excluirCategoria(categoria.id)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color="#DC3545"
                          />
                          <Text style={styles.textoExcluir}>Excluir</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    gap: 12,
  },
  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EAF2",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTexto: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#17366B",
  },
  subtitulo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  conteudo: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    padding: 16,
  },
  cardCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  iconeFundo: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "800",
    color: "#17366B",
  },
  cardDescricao: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 9,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#17366B",
  },
  botaoCadastrar: {
    height: 48,
    backgroundColor: "#1769D2",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 14,
  },
  botaoCadastrarTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  divisor: {
    height: 1,
    backgroundColor: "#E5EAF2",
    marginVertical: 24,
  },
  listaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  listaTitulo: {
    fontSize: 16,
    fontWeight: "800",
    color: "#17366B",
  },
  contador: {
    backgroundColor: "#EAF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  contadorTexto: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1769D2",
  },
  vazio: {
    alignItems: "center",
    paddingVertical: 35,
  },
  vazioTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#667085",
    marginTop: 12,
  },
  vazioTexto: {
    fontSize: 12,
    color: "#98A2B3",
    marginTop: 6,
    textAlign: "center",
  },
  itemCategoria: {
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  itemLabel: {
    fontSize: 11,
    color: "#98A2B3",
    marginBottom: 6,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 15,
  },
  inputEdicao: {
    height: 44,
    borderWidth: 1,
    borderColor: "#1769D2",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#17366B",
    marginBottom: 14,
  },
  acoes: {
    flexDirection: "row",
    gap: 10,
  },
  botaoEditar: {
    flex: 1,
    height: 40,
    backgroundColor: "#F2F4F7",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  textoEditar: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "600",
  },
  botaoExcluir: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFF0F2",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  textoExcluir: {
    color: "#DC3545",
    fontSize: 13,
    fontWeight: "600",
  },
  botaoSalvar: {
    flex: 1,
    height: 40,
    backgroundColor: "#15966B",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  textoSalvar: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  botaoCancelar: {
    flex: 1,
    height: 40,
    backgroundColor: "#F2F4F7",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textoCancelar: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "600",
  },
});
