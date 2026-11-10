import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const categoriasPadrao = [
  "Contabilidade",
  "Matéria-Prima",
  "Funcionário",
  "Imposto",
  "Retirada de Sócio",
  "Gasolina",
  "Energia / Água / Aluguel",
  "Frete",
  "Equipamento",
  "Outros",
];

const moeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function dataValida(data) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;

  const [dia, mes, ano] = data.split("/").map(Number);
  const dataObj = new Date(ano, mes - 1, dia);

  return (
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() === mes - 1 &&
    dataObj.getDate() === dia
  );
}

function paraISO(data) {
  const [dia, mes, ano] = data.split("/");
  return `${ano}-${mes}-${dia}`;
}

function dataHojeBR() {
  return new Date().toLocaleDateString("pt-BR");
}

function calcularStatus(despesa) {
  if (despesa.dataPagamento) return "Pago";

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const [ano, mes, dia] = despesa.vencimento.split("-").map(Number);
  const vencimento = new Date(ano, mes - 1, dia);

  if (vencimento.getTime() === hoje.getTime()) return "Vence hoje";
  if (vencimento < hoje) return "Atrasado";

  return "A pagar";
}

const statusCores = {
  Pago: { fundo: "#E7F8EF", texto: "#168452" },
  Atrasado: { fundo: "#FDECEC", texto: "#D92D20" },
  "Vence hoje": { fundo: "#EAF2FF", texto: "#1769D2" },
  "A pagar": { fundo: "#FFF4DC", texto: "#B7791F" },
};

export default function DespesasScreen({ navigation }) {
  const [despesas, setDespesas] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [categoriasAberta, setCategoriasAberta] = useState(false);

  const [editandoId, setEditandoId] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [vencimento, setVencimento] = useState("");

  function limparFormulario() {
    setEditandoId(null);
    setDescricao("");
    setValor("");
    setCategoria("");
    setFornecedor("");
    setVencimento("");
    setCategoriasAberta(false);
  }

  function abrirCadastro() {
    limparFormulario();
    setModalAberto(true);
  }

  function editarDespesa(despesa) {
    setEditandoId(despesa.id);
    setDescricao(despesa.descricao);
    setValor(String(despesa.valor).replace(".", ","));
    setCategoria(despesa.categoria);
    setFornecedor(despesa.fornecedor);
    setVencimento(despesa.vencimento.split("-").reverse().join("/"));
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  function salvarDespesa() {
    if (
      !descricao.trim() ||
      !valor.trim() ||
      !categoria ||
      !vencimento.trim()
    ) {
      Alert.alert(
        "Atenção",
        "Preencha descrição, valor, categoria e vencimento.",
      );
      return;
    }

    const numero = Number(valor.replace(",", "."));

    if (!Number.isFinite(numero) || numero <= 0) {
      Alert.alert("Valor inválido", "Informe um valor maior que zero.");
      return;
    }

    if (!dataValida(vencimento)) {
      Alert.alert("Data inválida", "Informe a data no formato DD/MM/AAAA.");
      return;
    }

    const dados = {
      descricao: descricao.trim(),
      valor: numero,
      categoria,
      fornecedor: fornecedor.trim(),
      vencimento: paraISO(vencimento),
    };

    if (editandoId !== null) {
      setDespesas((anterior) =>
        anterior.map((item) =>
          item.id === editandoId ? { ...item, ...dados } : item,
        ),
      );
    } else {
      setDespesas((anterior) => [
        {
          id: `${Date.now()}-${Math.random()}`,
          ...dados,
          dataPagamento: null,
        },
        ...anterior,
      ]);
    }

    fecharModal();
    Alert.alert("Sucesso", "Despesa salva com sucesso!");
  }

  function excluirDespesa(id) {
    Alert.alert("Excluir despesa", "Deseja realmente excluir esta despesa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () =>
          setDespesas((anterior) => anterior.filter((item) => item.id !== id)),
      },
    ]);
  }

  function marcarComoPago(id) {
    Alert.alert(
      "Confirmar pagamento",
      "Deseja marcar esta despesa como paga?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            const hoje = new Date();
            const ano = hoje.getFullYear();
            const mes = String(hoje.getMonth() + 1).padStart(2, "0");
            const dia = String(hoje.getDate()).padStart(2, "0");

            setDespesas((anterior) =>
              anterior.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      dataPagamento: `${ano}-${mes}-${dia}`,
                    }
                  : item,
              ),
            );
          },
        },
      ],
    );
  }

  const despesasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return despesas
      .filter(
        (item) =>
          item.descricao.toLowerCase().includes(termo) ||
          item.categoria.toLowerCase().includes(termo) ||
          item.fornecedor.toLowerCase().includes(termo),
      )
      .sort((a, b) => {
        const aPago = !!a.dataPagamento;
        const bPago = !!b.dataPagamento;

        if (aPago !== bPago) return aPago ? 1 : -1;

        return a.vencimento.localeCompare(b.vencimento);
      });
  }, [despesas, busca]);

  const totalDespesas = despesas.reduce((soma, item) => soma + item.valor, 0);

  const totalAberto = despesas
    .filter((item) => !item.dataPagamento)
    .reduce((soma, item) => soma + item.valor, 0);

  const totalPago = despesas
    .filter((item) => !!item.dataPagamento)
    .reduce((soma, item) => soma + item.valor, 0);

  function CardResumo({ titulo, valor, icone, cor, fundo }) {
    return (
      <View style={styles.cardResumo}>
        <View style={styles.resumoInfo}>
          <Text style={styles.resumoTitulo}>{titulo}</Text>
          <Text style={[styles.resumoValor, { color: cor }]}>
            {moeda(valor)}
          </Text>
        </View>
        <View style={[styles.resumoIcone, { backgroundColor: fundo }]}>
          <Ionicons name={icone} size={23} color={cor} />
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

        <View style={styles.headerTexto}>
          <Text style={styles.titulo}>Despesas</Text>
          <Text style={styles.subtitulo}>
            Controle seus pagamentos e vencimentos
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.botaoAdicionar} onPress={abrirCadastro}>
          <Ionicons name="add-circle-outline" size={22} color="#FFF" />
          <Text style={styles.botaoAdicionarTexto}>Cadastrar nova despesa</Text>
        </TouchableOpacity>

        <View style={styles.resumos}>
          <CardResumo
            titulo="Total de despesas"
            valor={totalDespesas}
            icone="wallet-outline"
            cor="#D92D20"
            fundo="#FDECEC"
          />

          <CardResumo
            titulo="Em aberto"
            valor={totalAberto}
            icone="calendar-outline"
            cor="#B7791F"
            fundo="#FFF4DC"
          />

          <CardResumo
            titulo="Pagas"
            valor={totalPago}
            icone="checkmark-circle-outline"
            cor="#168452"
            fundo="#E7F8EF"
          />
        </View>

        <View style={styles.listaCard}>
          <Text style={styles.listaTitulo}>Lista de pagamentos</Text>
          <Text style={styles.listaDescricao}>
            Acompanhe suas despesas e vencimentos
          </Text>

          <View style={styles.buscaContainer}>
            <Ionicons name="search-outline" size={20} color="#98A2B3" />
            <TextInput
              style={styles.buscaInput}
              placeholder="Pesquisar despesa..."
              placeholderTextColor="#98A2B3"
              value={busca}
              onChangeText={setBusca}
            />
          </View>

          {despesasFiltradas.length === 0 ? (
            <View style={styles.vazio}>
              <Ionicons name="receipt-outline" size={43} color="#98A2B3" />
              <Text style={styles.vazioTitulo}>Nenhuma despesa encontrada</Text>
              <Text style={styles.vazioTexto}>
                Cadastre uma despesa para começar.
              </Text>
            </View>
          ) : (
            despesasFiltradas.map((item) => {
              const status = calcularStatus(item);
              const cores = statusCores[status];

              return (
                <View key={item.id} style={styles.despesaItem}>
                  <View style={styles.itemTopo}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemDescricao}>{item.descricao}</Text>
                      <Text style={styles.itemFornecedor}>
                        {item.fornecedor || "Não informado"}
                      </Text>
                    </View>

                    <Text style={styles.itemValor}>{moeda(item.valor)}</Text>
                  </View>

                  <View style={styles.itemDetalhes}>
                    <Text style={styles.detalheTexto}>
                      Vencimento:{" "}
                      {item.vencimento.split("-").reverse().join("/")}
                    </Text>

                    <Text style={styles.detalheTexto}>
                      Categoria: {item.categoria}
                    </Text>

                    {item.dataPagamento && (
                      <Text style={styles.detalheTexto}>
                        Pago em:{" "}
                        {item.dataPagamento.split("-").reverse().join("/")}
                      </Text>
                    )}
                  </View>

                  <View
                    style={[styles.status, { backgroundColor: cores.fundo }]}
                  >
                    <Text style={[styles.statusTexto, { color: cores.texto }]}>
                      {status}
                    </Text>
                  </View>

                  <View style={styles.acoes}>
                    {!item.dataPagamento && (
                      <TouchableOpacity
                        style={styles.botaoPagar}
                        onPress={() => marcarComoPago(item.id)}
                      >
                        <Ionicons
                          name="checkmark-outline"
                          size={17}
                          color="#168452"
                        />
                        <Text style={styles.textoPagar}>Pagar</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.botaoEditar}
                      onPress={() => editarDespesa(item)}
                    >
                      <Ionicons
                        name="create-outline"
                        size={17}
                        color="#1769D2"
                      />
                      <Text style={styles.textoEditar}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoExcluir}
                      onPress={() => excluirDespesa(item.id)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={17}
                        color="#D92D20"
                      />
                      <Text style={styles.textoExcluir}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <Modal
        visible={modalAberto}
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderInfo}>
              <Text style={styles.modalTitulo}>
                {editandoId !== null
                  ? "Editar despesa"
                  : "Registrar nova despesa"}
              </Text>
              <Text style={styles.modalSubtitulo}>
                Preencha as informações abaixo
              </Text>
            </View>

            <TouchableOpacity style={styles.fechar} onPress={fecharModal}>
              <Ionicons name="close" size={24} color="#667085" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalConteudo}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Compra de materiais"
              value={descricao}
              onChangeText={setDescricao}
            />

            <Text style={styles.label}>Valor (R$) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 150,00"
              keyboardType="decimal-pad"
              value={valor}
              onChangeText={setValor}
            />

            <Text style={styles.label}>Categoria *</Text>

            <TouchableOpacity
              style={styles.seletor}
              onPress={() => setCategoriasAberta(!categoriasAberta)}
            >
              <Text
                style={categoria ? styles.seletorTexto : styles.placeholder}
              >
                {categoria || "Selecione uma categoria"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#667085" />
            </TouchableOpacity>

            {categoriasAberta && (
              <View style={styles.opcoes}>
                {categoriasPadrao.map((opcao) => (
                  <TouchableOpacity
                    key={opcao}
                    style={styles.opcao}
                    onPress={() => {
                      setCategoria(opcao);
                      setCategoriasAberta(false);
                    }}
                  >
                    <Text style={styles.opcaoTexto}>{opcao}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Nome / Fornecedor</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Fornecedor ou empresa"
              value={fornecedor}
              onChangeText={setFornecedor}
            />

            <Text style={styles.label}>Data de vencimento *</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              maxLength={10}
              value={vencimento}
              onChangeText={setVencimento}
            />

            <Text style={styles.observacao}>* Campos obrigatórios</Text>

            <View style={styles.modalAcoes}>
              <TouchableOpacity style={styles.cancelar} onPress={fecharModal}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.salvar} onPress={salvarDespesa}>
                <Ionicons name="save-outline" size={18} color="#FFFFFF" />
                <Text style={styles.salvarTexto}>
                  {editandoId !== null ? "Salvar alterações" : "Salvar despesa"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    padding: 16,
    gap: 12,
  },
  voltar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTexto: { flex: 1 },
  titulo: {
    fontSize: 23,
    fontWeight: "800",
    color: "#17366B",
  },
  subtitulo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },
  scroll: { flex: 1 },
  conteudo: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  botaoAdicionar: {
    height: 49,
    backgroundColor: "#15966B",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  botaoAdicionarTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  resumos: { gap: 10, marginBottom: 18 },
  cardResumo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5EAF2",
  },
  resumoInfo: { flex: 1 },
  resumoTitulo: {
    fontSize: 13,
    color: "#667085",
  },
  resumoValor: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 7,
  },
  resumoIcone: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  listaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5EAF2",
  },
  listaTitulo: {
    fontSize: 17,
    fontWeight: "800",
    color: "#17366B",
  },
  listaDescricao: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
    marginBottom: 18,
  },
  buscaContainer: {
    height: 47,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 15,
  },
  buscaInput: {
    flex: 1,
    color: "#17366B",
    fontSize: 14,
  },
  vazio: {
    alignItems: "center",
    paddingVertical: 35,
  },
  vazioTitulo: {
    color: "#667085",
    fontWeight: "700",
    marginTop: 12,
  },
  vazioTexto: {
    color: "#98A2B3",
    fontSize: 12,
    marginTop: 6,
  },
  despesaItem: {
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 12,
    padding: 13,
    marginBottom: 12,
  },
  itemTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  itemInfo: { flex: 1 },
  itemDescricao: {
    fontSize: 15,
    fontWeight: "700",
    color: "#17366B",
  },
  itemFornecedor: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },
  itemValor: {
    fontSize: 15,
    fontWeight: "800",
    color: "#344054",
  },
  itemDetalhes: {
    marginTop: 12,
    gap: 5,
  },
  detalheTexto: {
    fontSize: 12,
    color: "#667085",
  },
  status: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 13,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: "700",
  },
  acoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  botaoPagar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 9,
    borderRadius: 8,
    backgroundColor: "#E7F8EF",
  },
  textoPagar: {
    fontSize: 12,
    fontWeight: "700",
    color: "#168452",
  },
  botaoEditar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 9,
    borderRadius: 8,
    backgroundColor: "#EAF2FF",
  },
  textoEditar: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1769D2",
  },
  botaoExcluir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 9,
    borderRadius: 8,
    backgroundColor: "#FDECEC",
  },
  textoExcluir: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D92D20",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderColor: "#E5EAF2",
  },
  modalHeaderInfo: { flex: 1 },
  modalTitulo: {
    fontSize: 19,
    fontWeight: "800",
    color: "#17366B",
  },
  modalSubtitulo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 5,
  },
  fechar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },
  modalConteudo: {
    padding: 18,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#344054",
    marginBottom: 8,
    marginTop: 17,
  },
  input: {
    height: 49,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 14,
    color: "#17366B",
  },
  seletor: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seletorTexto: {
    fontSize: 14,
    color: "#17366B",
  },
  placeholder: {
    fontSize: 14,
    color: "#98A2B3",
  },
  opcoes: {
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    marginTop: 5,
    overflow: "hidden",
  },
  opcao: {
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  opcaoTexto: {
    fontSize: 14,
    color: "#344054",
  },
  observacao: {
    fontSize: 12,
    color: "#98A2B3",
    marginTop: 15,
  },
  modalAcoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },
  cancelar: {
    flex: 1,
    height: 48,
    borderRadius: 9,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelarTexto: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "700",
  },
  salvar: {
    flex: 1.5,
    height: 48,
    borderRadius: 9,
    backgroundColor: "#15966B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  salvarTexto: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
