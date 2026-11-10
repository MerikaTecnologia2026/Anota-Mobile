import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const C = {
  navy: "#041C3C",
  blue: "#17366B",
  primary: "#1769D2",
  background: "#F4F7FB",
  white: "#FFFFFF",
  gray: "#667085",
  border: "#E5EAF2",
  green: "#15966B",
  red: "#D92D20",
};

const categorias = [];

const moeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function numero(valor) {
  const texto = String(valor ?? "")
    .trim()
    .replace(/\s/g, "");

  if (!texto) return NaN;

  if (texto.includes(",")) {
    return Number(texto.replace(/\./g, "").replace(",", "."));
  }

  return Number(texto);
}

const campo = {
  nome: "",
  categoria: "",
  preco: "",
};

const campoItem = {
  produtoId: "",
  quantidade: "1",
  preco: "",
};

function Campo({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && { height: 75, textAlignVertical: "top" },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#98A2B3"
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

function Botao({ titulo, icone, onPress, secundario = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        secundario ? styles.botaoSecundario : styles.botaoPrimario,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icone && (
        <Ionicons
          name={icone}
          size={18}
          color={secundario ? C.blue : C.white}
        />
      )}
      <Text
        style={[styles.botaoTexto, { color: secundario ? C.blue : C.white }]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

export default function OrcamentoScreen({ navigation }) {
  const [cliente, setCliente] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");

  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [frete, setFrete] = useState("");

  const [modalProduto, setModalProduto] = useState(false);
  const [modalItem, setModalItem] = useState(false);

  const [produtoForm, setProdutoForm] = useState(campo);
  const [itemForm, setItemForm] = useState(campoItem);
  const [editandoItemId, setEditandoItemId] = useState(null);

  const [categoriaAberta, setCategoriaAberta] = useState(false);
  const [produtosAbertos, setProdutosAbertos] = useState(false);

  const [orcamentosSalvos, setOrcamentosSalvos] = useState([]);

  const subtotal = useMemo(
    () => itens.reduce((total, item) => total + item.total, 0),
    [itens],
  );

  const valorFrete = numero(frete);
  const freteCalculado = Number.isFinite(valorFrete) ? valorFrete : 0;

  const totalGeral = subtotal + freteCalculado;

  function limparOrcamento() {
    setCliente("");
    setCnpj("");
    setEndereco("");
    setContato("");
    setItens([]);
    setFrete("");
  }

  function confirmarLimpeza() {
    Alert.alert(
      "Cancelar orçamento",
      "Deseja limpar os dados deste orçamento?",
      [
        { text: "Voltar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: limparOrcamento,
        },
      ],
    );
  }

  function salvarProduto() {
    const preco = numero(produtoForm.preco);

    if (!produtoForm.nome.trim() || !produtoForm.categoria) {
      Alert.alert("Atenção", "Informe o nome e a categoria do produto.");
      return;
    }

    if (!Number.isFinite(preco) || preco < 0) {
      Alert.alert("Preço inválido", "Informe um preço válido.");
      return;
    }

    setProdutos((anterior) => [
      ...anterior,
      {
        id: `${Date.now()}-${Math.random()}`,
        nome: produtoForm.nome.trim(),
        categoria: produtoForm.categoria,
        preco,
      },
    ]);

    setProdutoForm({ ...campo });
    setCategoriaAberta(false);
    setModalProduto(false);

    Alert.alert("Sucesso", "Produto cadastrado!");
  }

  function abrirAdicionarItem() {
    if (produtos.length === 0) {
      Alert.alert(
        "Nenhum produto",
        "Cadastre um produto antes de adicioná-lo ao orçamento.",
      );
      return;
    }

    setEditandoItemId(null);
    setItemForm({ ...campoItem });
    setProdutosAbertos(false);
    setModalItem(true);
  }

  function selecionarProduto(produto) {
    setItemForm((anterior) => ({
      ...anterior,
      produtoId: produto.id,
      preco: String(produto.preco).replace(".", ","),
    }));
    setProdutosAbertos(false);
  }

  function salvarItem() {
    const produto = produtos.find((item) => item.id === itemForm.produtoId);

    const quantidade = Number(itemForm.quantidade);
    const preco = numero(itemForm.preco);

    if (!produto) {
      Alert.alert("Atenção", "Selecione um produto.");
      return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
      Alert.alert(
        "Quantidade inválida",
        "Informe uma quantidade inteira maior que zero.",
      );
      return;
    }

    if (!Number.isFinite(preco) || preco < 0) {
      Alert.alert("Preço inválido", "Informe um preço válido.");
      return;
    }

    const novoItem = {
      id: editandoItemId ?? `${Date.now()}-${Math.random()}`,
      produtoId: produto.id,
      nome: produto.nome,
      quantidade,
      preco,
      total: quantidade * preco,
    };

    if (editandoItemId !== null) {
      setItens((anterior) =>
        anterior.map((item) => (item.id === editandoItemId ? novoItem : item)),
      );
    } else {
      setItens((anterior) => [...anterior, novoItem]);
    }

    setModalItem(false);
    setItemForm({ ...campoItem });
    setEditandoItemId(null);
  }

  function editarItem(item) {
    setEditandoItemId(item.id);
    setItemForm({
      produtoId: item.produtoId,
      quantidade: String(item.quantidade),
      preco: String(item.preco).replace(".", ","),
    });
    setProdutosAbertos(false);
    setModalItem(true);
  }

  function excluirItem(id) {
    Alert.alert("Excluir produto", "Remover este produto do orçamento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () =>
          setItens((anterior) => anterior.filter((item) => item.id !== id)),
      },
    ]);
  }

  function salvarOrcamento() {
    if (!cliente.trim()) {
      Alert.alert("Atenção", "Informe o nome do cliente.");
      return;
    }

    if (itens.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos um produto ao orçamento.");
      return;
    }

    if (frete.trim() && (!Number.isFinite(valorFrete) || valorFrete < 0)) {
      Alert.alert("Frete inválido", "Informe um frete válido.");
      return;
    }

    const orcamento = {
      id: `${Date.now()}-${Math.random()}`,
      data: new Date().toLocaleDateString("pt-BR"),
      cliente: cliente.trim(),
      cnpj,
      endereco,
      contato,
      itens: itens.map((item) => ({ ...item })),
      subtotal,
      frete: freteCalculado,
      total: totalGeral,
    };

    setOrcamentosSalvos((anterior) => [orcamento, ...anterior]);

    limparOrcamento();

    Alert.alert(
      "Orçamento salvo",
      "Orçamento salvo temporariamente nesta tela.",
    );
  }

  const produtoSelecionado = produtos.find(
    (produto) => produto.id === itemForm.produtoId,
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color={C.blue} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.titulo}>Orçamento</Text>
          <Text style={styles.subtitulo}>Crie e organize seus orçamentos</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Botao
          titulo="Cadastrar produto"
          icone="add-circle-outline"
          onPress={() => setModalProduto(true)}
        />

        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <View style={styles.iconeCard}>
              <Ionicons name="person-outline" size={22} color={C.primary} />
            </View>
            <View>
              <Text style={styles.cardTitulo}>Dados do cliente</Text>
              <Text style={styles.cardDescricao}>
                Informe os dados para o orçamento
              </Text>
            </View>
          </View>

          <Campo
            label="Cliente"
            placeholder="Nome do cliente"
            value={cliente}
            onChangeText={setCliente}
          />
          <Campo
            label="CNPJ / CPF"
            placeholder="Digite o CNPJ ou CPF"
            value={cnpj}
            onChangeText={setCnpj}
            keyboardType="numeric"
          />
          <Campo
            label="Endereço"
            placeholder="Endereço do cliente"
            value={endereco}
            onChangeText={setEndereco}
          />
          <Campo
            label="Contato"
            placeholder="Telefone ou WhatsApp"
            value={contato}
            onChangeText={setContato}
            keyboardType="phone-pad"
          />

          <Botao
            titulo="Adicionar produto"
            icone="add-circle-outline"
            onPress={abrirAdicionarItem}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.tituloLinha}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>Itens do orçamento</Text>
              <Text style={styles.cardDescricao}>Produtos adicionados</Text>
            </View>
            <View style={styles.contador}>
              <Text style={styles.contadorTexto}>{itens.length} itens</Text>
            </View>
          </View>

          {itens.length === 0 ? (
            <View style={styles.vazio}>
              <Ionicons name="cube-outline" size={43} color="#98A2B3" />
              <Text style={styles.vazioTitulo}>Nenhum produto adicionado</Text>
              <Text style={styles.vazioDescricao}>
                Adicione produtos para montar o orçamento
              </Text>
            </View>
          ) : (
            itens.map((item, index) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemLinha}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemNome}>
                      {index + 1}. {item.nome}
                    </Text>
                    <Text style={styles.itemDetalhe}>
                      {item.quantidade} x {moeda(item.preco)}
                    </Text>
                  </View>
                  <Text style={styles.itemTotal}>{moeda(item.total)}</Text>
                </View>

                <View style={styles.acoesItem}>
                  <TouchableOpacity
                    style={styles.editar}
                    onPress={() => editarItem(item)}
                  >
                    <Ionicons
                      name="create-outline"
                      size={17}
                      color={C.primary}
                    />
                    <Text style={styles.editarTexto}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.excluir}
                    onPress={() => excluirItem(item.id)}
                  >
                    <Ionicons name="trash-outline" size={17} color={C.red} />
                    <Text style={styles.excluirTexto}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo</Text>
          <Text style={styles.cardDescricao}>Valores do orçamento</Text>

          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>Subtotal</Text>
            <Text style={styles.resumoValor}>{moeda(subtotal)}</Text>
          </View>

          <Campo
            label="Frete (opcional)"
            placeholder="Ex.: 20,00"
            value={frete}
            onChangeText={setFrete}
            keyboardType="decimal-pad"
          />

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total do orçamento</Text>
            <Text style={styles.totalValor}>{moeda(totalGeral)}</Text>
          </View>
        </View>

        <View style={styles.botoesFinais}>
          <Botao
            titulo="Cancelar"
            icone="close-outline"
            secundario
            onPress={confirmarLimpeza}
          />
          <Botao
            titulo="Salvar orçamento"
            icone="save-outline"
            onPress={salvarOrcamento}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Orçamentos salvos nesta sessão</Text>
          <Text style={styles.cardDescricao}>
            {orcamentosSalvos.length} orçamento(s)
          </Text>

          {orcamentosSalvos.length === 0 ? (
            <Text style={styles.textoAuxiliar}>
              Nenhum orçamento salvo ainda.
            </Text>
          ) : (
            orcamentosSalvos.map((orcamento) => (
              <View key={orcamento.id} style={styles.orcamentoSalvo}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNome}>{orcamento.cliente}</Text>
                  <Text style={styles.itemDetalhe}>
                    {orcamento.data} • {orcamento.itens.length} itens
                  </Text>
                </View>
                <Text style={styles.itemTotal}>{moeda(orcamento.total)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* MODAL CADASTRAR PRODUTO */}
      <Modal
        visible={modalProduto}
        animationType="slide"
        onRequestClose={() => setModalProduto(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitulo}>Cadastrar produto</Text>
            <TouchableOpacity onPress={() => setModalProduto(false)}>
              <Ionicons name="close" size={26} color={C.gray} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalConteudo}
            keyboardShouldPersistTaps="handled"
          >
            <Campo
              label="Nome do produto"
              placeholder="Ex.: Vaso de cimento"
              value={produtoForm.nome}
              onChangeText={(valor) =>
                setProdutoForm((anterior) => ({
                  ...anterior,
                  nome: valor,
                }))
              }
            />

            <Text style={styles.label}>Categoria</Text>
            <TouchableOpacity
              style={styles.seletor}
              onPress={() => setCategoriaAberta(!categoriaAberta)}
            >
              <Text style={styles.seletorTexto}>
                {produtoForm.categoria || "Selecione a categoria"}
              </Text>
              <Ionicons name="chevron-down" size={20} color={C.gray} />
            </TouchableOpacity>

            {categoriaAberta &&
              categorias.map((categoria) => (
                <TouchableOpacity
                  key={categoria}
                  style={styles.opcao}
                  onPress={() => {
                    setProdutoForm((anterior) => ({
                      ...anterior,
                      categoria,
                    }));
                    setCategoriaAberta(false);
                  }}
                >
                  <Text style={styles.opcaoTexto}>{categoria}</Text>
                </TouchableOpacity>
              ))}

            <Campo
              label="Preço unitário"
              placeholder="Ex.: 35,00"
              value={produtoForm.preco}
              keyboardType="decimal-pad"
              onChangeText={(valor) =>
                setProdutoForm((anterior) => ({
                  ...anterior,
                  preco: valor,
                }))
              }
            />

            <Botao
              titulo="Salvar produto"
              icone="save-outline"
              onPress={salvarProduto}
            />
            <Botao
              titulo="Cancelar"
              secundario
              onPress={() => setModalProduto(false)}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* MODAL ADICIONAR OU EDITAR ITEM */}
      <Modal
        visible={modalItem}
        animationType="slide"
        onRequestClose={() => setModalItem(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitulo}>
              {editandoItemId !== null ? "Editar produto" : "Adicionar produto"}
            </Text>
            <TouchableOpacity onPress={() => setModalItem(false)}>
              <Ionicons name="close" size={26} color={C.gray} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalConteudo}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Produto</Text>

            <TouchableOpacity
              style={styles.seletor}
              onPress={() => setProdutosAbertos(!produtosAbertos)}
            >
              <Text style={styles.seletorTexto}>
                {produtoSelecionado?.nome || "Selecione um produto"}
              </Text>
              <Ionicons name="chevron-down" size={20} color={C.gray} />
            </TouchableOpacity>

            {produtosAbertos &&
              produtos.map((produto) => (
                <TouchableOpacity
                  key={produto.id}
                  style={styles.opcao}
                  onPress={() => selecionarProduto(produto)}
                >
                  <Text style={styles.opcaoTexto}>
                    {produto.nome} - {moeda(produto.preco)}
                  </Text>
                </TouchableOpacity>
              ))}

            <Campo
              label="Quantidade"
              placeholder="1"
              keyboardType="numeric"
              value={itemForm.quantidade}
              onChangeText={(valor) =>
                setItemForm((anterior) => ({
                  ...anterior,
                  quantidade: valor,
                }))
              }
            />

            <Campo
              label="Preço unitário"
              placeholder="Ex.: 35,00"
              keyboardType="decimal-pad"
              value={itemForm.preco}
              onChangeText={(valor) =>
                setItemForm((anterior) => ({
                  ...anterior,
                  preco: valor,
                }))
              }
            />

            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total do item</Text>
              <Text style={styles.totalValor}>
                {moeda(
                  (Number(itemForm.quantidade) || 0) *
                    (numero(itemForm.preco) || 0),
                )}
              </Text>
            </View>

            <Botao
              titulo={
                editandoItemId !== null
                  ? "Salvar alterações"
                  : "Adicionar ao orçamento"
              }
              icone="checkmark-outline"
              onPress={salvarItem}
            />

            <Botao
              titulo="Cancelar"
              secundario
              onPress={() => setModalItem(false)}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  voltar: {
    width: 42,
    height: 42,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: { flex: 1 },
  titulo: {
    fontSize: 23,
    fontWeight: "800",
    color: C.blue,
  },
  subtitulo: {
    fontSize: 12,
    color: C.gray,
    marginTop: 4,
  },
  conteudo: {
    paddingHorizontal: 14,
    paddingBottom: 35,
    gap: 16,
  },
  botao: {
    minHeight: 49,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 15,
  },
  botaoPrimario: {
    backgroundColor: C.primary,
  },
  botaoSecundario: {
    backgroundColor: "#EAF2FF",
  },
  botaoTexto: {
    fontSize: 14,
    fontWeight: "700",
  },
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 12,
  },
  cardCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  iconeCard: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitulo: {
    fontSize: 17,
    fontWeight: "800",
    color: C.blue,
  },
  cardDescricao: {
    fontSize: 12,
    color: C.gray,
    marginTop: 4,
  },
  campo: {
    marginBottom: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#344054",
    marginBottom: 8,
  },
  input: {
    minHeight: 49,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 14,
    color: C.blue,
  },
  tituloLinha: {
    flexDirection: "row",
    alignItems: "center",
  },
  contador: {
    backgroundColor: "#F2F4F7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  contadorTexto: {
    fontSize: 11,
    color: C.gray,
    fontWeight: "700",
  },
  vazio: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 7,
  },
  vazioTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: C.gray,
  },
  vazioDescricao: {
    fontSize: 12,
    color: "#98A2B3",
    textAlign: "center",
  },
  itemCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 13,
    gap: 12,
  },
  itemLinha: {
    flexDirection: "row",
    gap: 10,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: "700",
    color: C.blue,
  },
  itemDetalhe: {
    fontSize: 12,
    color: C.gray,
    marginTop: 5,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: "800",
    color: C.blue,
  },
  acoesItem: {
    flexDirection: "row",
    gap: 10,
  },
  editar: {
    flex: 1,
    backgroundColor: "#EAF2FF",
    borderRadius: 9,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  editarTexto: {
    color: C.primary,
    fontWeight: "700",
  },
  excluir: {
    flex: 1,
    backgroundColor: "#FDECEC",
    borderRadius: 9,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  excluirTexto: {
    color: C.red,
    fontWeight: "700",
  },
  resumoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  resumoLabel: {
    fontSize: 14,
    color: C.gray,
  },
  resumoValor: {
    fontSize: 15,
    fontWeight: "700",
    color: C.blue,
  },
  totalBox: {
    backgroundColor: C.blue,
    borderRadius: 13,
    padding: 17,
    gap: 7,
  },
  totalLabel: {
    fontSize: 12,
    color: "#DCE8F8",
  },
  totalValor: {
    fontSize: 25,
    fontWeight: "800",
    color: C.white,
  },
  botoesFinais: {
    gap: 10,
  },
  textoAuxiliar: {
    fontSize: 13,
    color: C.gray,
    paddingVertical: 12,
  },
  orcamentoSalvo: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingVertical: 13,
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: C.white,
  },
  modalHeader: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 19,
    fontWeight: "800",
    color: C.blue,
  },
  modalConteudo: {
    padding: 18,
    paddingBottom: 45,
    gap: 15,
  },
  seletor: {
    height: 49,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  seletorTexto: {
    fontSize: 14,
    color: C.blue,
  },
  opcao: {
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    borderRadius: 9,
    marginBottom: 5,
  },
  opcaoTexto: {
    color: C.blue,
    fontSize: 14,
  },
});
