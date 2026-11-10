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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ReceitasScreen({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [dataRecebimento, setDataRecebimento] = useState("");
  const [status, setStatus] = useState("A receber");

  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [mostrarPagamentos, setMostrarPagamentos] = useState(false);

  // Listas temporárias para testar a interface.
  // Depois serão carregadas da API Flask.
  const categorias = [];
  const formasPagamento = [];

  const boleto = formaPagamento === "Boleto";
  const debito = formaPagamento === "Cartão de débito";

  function limparFormulario() {
    setDescricao("");
    setValor("");
    setCategoria("");
    setCliente("");
    setData("");
    setFormaPagamento("");
    setDataRecebimento("");
    setStatus("A receber");
    setMostrarCategorias(false);
    setMostrarPagamentos(false);
  }

  function salvarReceita() {
    if (
      !descricao.trim() ||
      !valor.trim() ||
      !data.trim() ||
      !categoria ||
      !formaPagamento
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const valorNumerico = Number(valor.replace(",", "."));

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Atenção", "Informe um valor válido.");
      return;
    }

    if (boleto && !dataRecebimento.trim()) {
      Alert.alert("Atenção", "Informe a data de recebimento do boleto.");
      return;
    }

    // Ainda não envia para a API.
    Alert.alert(
      "Formulário preenchido",
      "A tela está pronta para conectar ao backend Flask.",
    );
  }

  function Campo({ titulo, children }) {
    return (
      <View style={styles.campo}>
        <Text style={styles.label}>{titulo}</Text>
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.voltar}
        >
          <Ionicons name="arrow-back" size={25} color="#17366B" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Nova Venda</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formulario}>
          {/* Título do formulário */}
          <View style={styles.formHeader}>
            <View style={styles.formIcone}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#1769D2"
              />
            </View>

            <View>
              <Text style={styles.formTitulo}>Dados da Venda</Text>
              <Text style={styles.formSubtitulo}>
                Preencha os dados da venda
              </Text>
            </View>
          </View>

          {/* Descrição */}
          <Campo titulo="Descrição *">
            <TextInput
              style={styles.input}
              placeholder="Digite a descrição da venda"
              placeholderTextColor="#98A2B3"
              value={descricao}
              onChangeText={setDescricao}
            />
          </Campo>

          {/* Valor */}
          <Campo titulo="Valor *">
            <TextInput
              style={styles.input}
              placeholder="0,00"
              placeholderTextColor="#98A2B3"
              keyboardType="decimal-pad"
              value={valor}
              onChangeText={setValor}
            />
          </Campo>

          {/* Categoria */}
          <Campo titulo="Categoria *">
            <TouchableOpacity
              style={styles.select}
              onPress={() => setMostrarCategorias(!mostrarCategorias)}
            >
              <Text style={categoria ? styles.selectTexto : styles.placeholder}>
                {categoria || "Selecione a categoria"}
              </Text>

              <Ionicons name="chevron-down" size={20} color="#667085" />
            </TouchableOpacity>

            {mostrarCategorias && (
              <View style={styles.opcoes}>
                {categorias.length === 0 ? (
                  <Text style={styles.semOpcoes}>
                    Nenhuma categoria carregada.
                  </Text>
                ) : (
                  categorias.map((item) => (
                    <TouchableOpacity
                      key={String(item.id)}
                      style={styles.opcao}
                      onPress={() => {
                        setCategoria(item.nome);
                        setMostrarCategorias(false);
                      }}
                    >
                      <Text style={styles.opcaoTexto}>{item.nome}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </Campo>

          {/* Cliente */}
          <Campo titulo="Cliente">
            <TextInput
              style={styles.input}
              placeholder="Nome do cliente"
              placeholderTextColor="#98A2B3"
              value={cliente}
              onChangeText={setCliente}
            />
          </Campo>

          {/* Data */}
          <Campo titulo="Data *">
            <TextInput
              style={styles.input}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#98A2B3"
              value={data}
              onChangeText={setData}
              maxLength={10}
              keyboardType="numbers-and-punctuation"
            />
          </Campo>

          {/* Forma de pagamento */}
          <Campo titulo="Forma de Pagamento *">
            <TouchableOpacity
              style={styles.select}
              onPress={() => setMostrarPagamentos(!mostrarPagamentos)}
            >
              <Text
                style={formaPagamento ? styles.selectTexto : styles.placeholder}
              >
                {formaPagamento || "Selecione"}
              </Text>

              <Ionicons name="chevron-down" size={20} color="#667085" />
            </TouchableOpacity>

            {mostrarPagamentos && (
              <View style={styles.opcoes}>
                {formasPagamento.length === 0 ? (
                  <Text style={styles.semOpcoes}>
                    Nenhuma forma de pagamento carregada.
                  </Text>
                ) : (
                  formasPagamento.map((item) => (
                    <TouchableOpacity
                      key={String(item.id)}
                      style={styles.opcao}
                      onPress={() => {
                        setFormaPagamento(item.nome);
                        setMostrarPagamentos(false);
                      }}
                    >
                      <Text style={styles.opcaoTexto}>{item.nome}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </Campo>

          {/* Campos condicionais */}
          {debito && (
            <Campo titulo="Tipo de pagamento">
              <TextInput
                style={[styles.input, styles.inputDesabilitado]}
                value="À vista"
                editable={false}
              />
            </Campo>
          )}

          {boleto && (
            <>
              <Campo titulo="Data de Recebimento *">
                <TextInput
                  style={styles.input}
                  placeholder="AAAA-MM-DD"
                  placeholderTextColor="#98A2B3"
                  value={dataRecebimento}
                  onChangeText={setDataRecebimento}
                  maxLength={10}
                />
              </Campo>

              <Campo titulo="Status">
                <View style={styles.statusContainer}>
                  {["A receber", "Pago"].map((opcao) => (
                    <TouchableOpacity
                      key={opcao}
                      style={[
                        styles.statusBotao,
                        status === opcao && styles.statusAtivo,
                      ]}
                      onPress={() => setStatus(opcao)}
                    >
                      <Text
                        style={[
                          styles.statusTexto,
                          status === opcao && styles.statusTextoAtivo,
                        ]}
                      >
                        {opcao}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Campo>
            </>
          )}

          {/* Botão salvar */}
          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarReceita}>
            <Ionicons name="save-outline" size={21} color="#FFFFFF" />
            <Text style={styles.textoSalvar}>Salvar Venda</Text>
          </TouchableOpacity>

          {/* Botão limpar */}
          <TouchableOpacity
            style={styles.botaoLimpar}
            onPress={limparFormulario}
          >
            <Ionicons name="trash-outline" size={21} color="#1769D2" />
            <Text style={styles.textoLimpar}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de vendas */}
        <TouchableOpacity
          style={styles.botaoLista}
          onPress={() => navigation.navigate("ListaVendas")}
        >
          <Ionicons name="list-outline" size={23} color="#FFFFFF" />

          <Text style={styles.textoLista}>Lista de Vendas</Text>
        </TouchableOpacity>
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
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#F4F7FB",
  },

  voltar: {
    width: 42,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#17366B",
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },

  formIcone: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  formTitulo: {
    fontSize: 19,
    fontWeight: "700",
    color: "#17366B",
  },

  formSubtitulo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 3,
  },

  campo: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 7,
  },

  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 9,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#17366B",
  },

  inputDesabilitado: {
    backgroundColor: "#F2F4F7",
  },

  select: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  selectTexto: {
    color: "#17366B",
    fontSize: 14,
  },

  placeholder: {
    color: "#98A2B3",
    fontSize: 14,
  },

  opcoes: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  opcao: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F7",
  },

  opcaoTexto: {
    color: "#17366B",
    fontSize: 14,
  },

  semOpcoes: {
    padding: 13,
    color: "#667085",
    fontSize: 13,
  },

  statusContainer: {
    flexDirection: "row",
    gap: 10,
  },

  statusBotao: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8E0EB",
  },

  statusAtivo: {
    backgroundColor: "#1769D2",
    borderColor: "#1769D2",
  },

  statusTexto: {
    color: "#344054",
    fontWeight: "600",
  },

  statusTextoAtivo: {
    color: "#FFFFFF",
  },

  botaoSalvar: {
    height: 50,
    backgroundColor: "#1769D2",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  textoSalvar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  botaoLimpar: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#1769D2",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  textoLimpar: {
    color: "#1769D2",
    fontSize: 16,
    fontWeight: "600",
  },

  botaoLista: {
    height: 52,
    backgroundColor: "#17366B",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },

  textoLista: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
