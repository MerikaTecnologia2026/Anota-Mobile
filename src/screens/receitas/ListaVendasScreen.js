import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Dados de exemplo para testar a interface.
// Depois serão substituídos pelos dados da API Flask.
const vendasExemplo = [
  {
    id: 1,
    descricao: "Venda de produtos",
    cliente_nome: "Maria Silva",
    valor: 250,
    data: "2026-11-04",
    forma_pagamento: "Pix",
    status: "Pago",
  },
  {
    id: 2,
    descricao: "Venda de mercadorias",
    cliente_nome: "João Santos",
    valor: 480,
    data: "2026-11-03",
    forma_pagamento: "Boleto",
    data_recebimento: "2026-12-03",
    status: "A receber",
  },
];

function formatarValor(valor) {
  return (Number(valor) || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data) {
  if (!data) return "-";

  const partes = String(data).slice(0, 10).split("-");

  if (partes.length !== 3) return String(data);

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function calcularStatus(venda) {
  const status = String(venda.status || "")
    .trim()
    .toLowerCase();

  if (status === "pago") return "Pago";

  const forma = String(venda.forma_pagamento || "")
    .trim()
    .toLowerCase();

  if (forma === "boleto") {
    const vencimento = venda.data_recebimento || venda.data;

    if (!vencimento) return "Sem data";

    const dataVencimento = new Date(
      `${String(vencimento).slice(0, 10)}T00:00:00`,
    );

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataVencimento < hoje) return "Atrasado";

    return "A receber";
  }

  return "Recebido";
}

export default function ListaVendasScreen({ navigation }) {
  const [listaReceitas, setListaReceitas] = useState(vendasExemplo);

  const [busca, setBusca] = useState("");

  const listaFiltrada = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return listaReceitas.filter((venda) => {
      const descricao = String(venda.descricao || "").toLowerCase();

      const cliente = String(venda.cliente_nome || "").toLowerCase();

      return descricao.includes(termo) || cliente.includes(termo);
    });
  }, [listaReceitas, busca]);

  const totalVendas = listaFiltrada.length;

  const recebidas = listaFiltrada.filter((venda) =>
    ["Pago", "Recebido"].includes(calcularStatus(venda)),
  ).length;

  const aReceber = listaFiltrada.filter(
    (venda) => calcularStatus(venda) === "A receber",
  ).length;

  function excluirVenda(id) {
    Alert.alert("Excluir venda", "Deseja realmente excluir esta venda?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          // Exclusão local, apenas para testar.
          setListaReceitas((anterior) =>
            anterior.filter((venda) => venda.id !== id),
          );
        },
      },
    ]);
  }

  function editarVenda(venda) {
    Alert.alert(
      "Editar venda",
      "Vamos conectar a edição ao formulário de Receitas.",
    );
  }

  function marcarComoPaga(venda) {
    Alert.alert("Confirmar pagamento", "Deseja marcar esta venda como paga?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: () => {
          setListaReceitas((anterior) =>
            anterior.map((item) =>
              item.id === venda.id ? { ...item, status: "Pago" } : item,
            ),
          );
        },
      },
    ]);
  }

  function renderizarVenda({ item }) {
    const status = calcularStatus(item);

    const corStatus =
      status === "Pago" || status === "Recebido"
        ? "#15966B"
        : status === "Atrasado"
          ? "#DC3545"
          : "#1769D2";

    return (
      <View style={styles.cardVenda}>
        <View style={styles.cardTopo}>
          <View style={styles.cardInfo}>
            <Text style={styles.cliente}>
              {item.cliente_nome || "Cliente não informado"}
            </Text>

            <Text style={styles.descricao}>
              {item.descricao || "Venda sem descrição"}
            </Text>
          </View>

          <Text style={styles.valor}>
            {formatarValor(item.valor_total ?? item.valor)}
          </Text>
        </View>

        <View style={styles.detalhes}>
          <View style={styles.detalheLinha}>
            <Ionicons name="calendar-outline" size={16} color="#667085" />
            <Text style={styles.detalheTexto}>{formatarData(item.data)}</Text>
          </View>

          <View style={styles.detalheLinha}>
            <Ionicons name="card-outline" size={16} color="#667085" />
            <Text style={styles.detalheTexto}>
              {item.forma_pagamento || "Não informado"}
            </Text>
          </View>
        </View>

        <View style={styles.cardRodape}>
          <View
            style={[styles.statusBadge, { backgroundColor: `${corStatus}18` }]}
          >
            <View
              style={[styles.statusPonto, { backgroundColor: corStatus }]}
            />
            <Text style={[styles.statusTexto, { color: corStatus }]}>
              {status}
            </Text>
          </View>

          <View style={styles.acoes}>
            {status === "A receber" && (
              <TouchableOpacity
                style={styles.botaoPagar}
                onPress={() => marcarComoPaga(item)}
                accessibilityLabel="Marcar como paga"
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#15966B"
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => editarVenda(item)}
              accessibilityLabel="Editar venda"
            >
              <Ionicons name="create-outline" size={20} color="#1769D2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirVenda(item.id)}
              accessibilityLabel="Excluir venda"
            >
              <Ionicons name="trash-outline" size={20} color="#DC3545" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color="#17366B" />
        </TouchableOpacity>

        <View>
          <Text style={styles.titulo}>Lista de Vendas</Text>
          <Text style={styles.subtitulo}>
            Acompanhe suas vendas e recebimentos
          </Text>
        </View>
      </View>

      <View style={styles.resumo}>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoLabel}>Total de vendas</Text>
          <Text style={styles.resumoNumero}>{totalVendas}</Text>
        </View>

        <View style={styles.resumoCard}>
          <Text style={styles.resumoLabel}>Recebidas</Text>
          <Text style={[styles.resumoNumero, { color: "#15966B" }]}>
            {recebidas}
          </Text>
        </View>

        <View style={styles.resumoCard}>
          <Text style={styles.resumoLabel}>A receber</Text>
          <Text style={[styles.resumoNumero, { color: "#1769D2" }]}>
            {aReceber}
          </Text>
        </View>
      </View>

      <View style={styles.listaContainer}>
        <Text style={styles.listaTitulo}>Vendas cadastradas</Text>

        <Text style={styles.listaSubtitulo}>
          Consulte, edite ou acompanhe suas vendas
        </Text>

        <View style={styles.pesquisa}>
          <Ionicons name="search-outline" size={21} color="#98A2B3" />

          <TextInput
            style={styles.pesquisaInput}
            placeholder="Pesquisar venda..."
            placeholderTextColor="#98A2B3"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <FlatList
          data={listaFiltrada}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderizarVenda}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaConteudo}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Ionicons name="search-outline" size={42} color="#98A2B3" />

              <Text style={styles.vazioTitulo}>Nenhuma venda encontrada</Text>

              <Text style={styles.vazioTexto}>
                Tente pesquisar por outro termo.
              </Text>
            </View>
          }
        />
      </View>
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
    paddingTop: 12,
    paddingBottom: 18,
    gap: 12,
  },

  voltar: {
    width: 42,
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 21,
    fontWeight: "800",
    color: "#17366B",
  },

  subtitulo: {
    fontSize: 11,
    color: "#667085",
    marginTop: 3,
  },

  resumo: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 16,
  },

  resumoCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    minHeight: 78,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },

  resumoLabel: {
    fontSize: 10,
    color: "#667085",
    fontWeight: "500",
  },

  resumoNumero: {
    fontSize: 23,
    fontWeight: "800",
    color: "#17366B",
    marginTop: 7,
  },

  listaContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  listaTitulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#17366B",
  },

  listaSubtitulo: {
    fontSize: 12,
    color: "#98A2B3",
    marginTop: 5,
  },

  pesquisa: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 11,
    paddingHorizontal: 12,
    gap: 10,
    marginTop: 18,
    marginBottom: 16,
  },

  pesquisaInput: {
    flex: 1,
    fontSize: 14,
    color: "#17366B",
  },

  listaConteudo: {
    paddingBottom: 30,
  },

  cardVenda: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  cardInfo: {
    flex: 1,
  },

  cliente: {
    fontSize: 15,
    fontWeight: "700",
    color: "#17366B",
  },

  descricao: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },

  valor: {
    fontSize: 15,
    fontWeight: "800",
    color: "#15966B",
  },

  detalhes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 14,
    paddingBottom: 14,
  },

  detalheLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  detalheTexto: {
    fontSize: 12,
    color: "#667085",
  },

  cardRodape: {
    borderTopWidth: 1,
    borderTopColor: "#EDF1F7",
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },

  statusPonto: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  statusTexto: {
    fontSize: 11,
    fontWeight: "700",
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  botaoPagar: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: "#E8F8F1",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoEditar: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoExcluir: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: "#FFF0F2",
    alignItems: "center",
    justifyContent: "center",
  },

  vazio: {
    alignItems: "center",
    paddingVertical: 65,
  },

  vazioTitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#667085",
    marginTop: 14,
  },

  vazioTexto: {
    fontSize: 12,
    color: "#98A2B3",
    marginTop: 5,
  },
});
