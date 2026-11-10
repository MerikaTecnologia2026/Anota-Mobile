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

const cores = {
  azulEscuro: "#041C3C",
  azul: "#17366B",
  azulClaro: "#1769D2",
  fundo: "#F4F7FB",
  branco: "#FFFFFF",
  cinza: "#667085",
  borda: "#E5EAF2",
  verde: "#15966B",
  vermelho: "#D92D20",
};

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function validarDataBR(data) {
  if (!data) return true;

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;

  const [dia, mes, ano] = data.split("/").map(Number);
  const d = new Date(ano, mes - 1, dia);

  return (
    d.getDate() === dia && d.getMonth() === mes - 1 && d.getFullYear() === ano
  );
}

function converterParaISO(data) {
  if (!data) return "";
  return data.split("/").reverse().join("-");
}

function converterParaBR(data) {
  if (!data) return "";
  return data.split("-").reverse().join("/");
}

export default function FuncionarioScreen({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [salario, setSalario] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [status, setStatus] = useState("ATIVO");

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setCargo("");
    setTelefone("");
    setEndereco("");
    setSalario("");
    setDataAdmissao("");
    setStatus("ATIVO");
  }

  function abrirCadastro() {
    limparFormulario();
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  function editarFuncionario(funcionario) {
    setEditandoId(funcionario.id);
    setNome(funcionario.nome);
    setCargo(funcionario.cargo);
    setTelefone(funcionario.telefone);
    setEndereco(funcionario.endereco);
    setSalario(String(funcionario.salario).replace(".", ","));
    setDataAdmissao(converterParaBR(funcionario.dataAdmissao));
    setStatus(funcionario.status);
    setModalAberto(true);
  }

  function salvarFuncionario() {
    if (
      !nome.trim() ||
      !cargo.trim() ||
      !telefone.trim() ||
      !endereco.trim() ||
      !salario.trim()
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const valorNumerico = Number(salario.replace(",", "."));

    if (!Number.isFinite(valorNumerico) || valorNumerico < 0) {
      Alert.alert("Salário inválido", "Informe um salário válido.");
      return;
    }

    if (!validarDataBR(dataAdmissao)) {
      Alert.alert("Data inválida", "Informe a data no formato DD/MM/AAAA.");
      return;
    }

    const dados = {
      nome: nome.trim(),
      cargo: cargo.trim(),
      telefone: telefone.trim(),
      endereco: endereco.trim(),
      salario: valorNumerico,
      dataAdmissao: converterParaISO(dataAdmissao),
      status,
    };

    if (editandoId !== null) {
      setFuncionarios((anterior) =>
        anterior.map((item) =>
          item.id === editandoId ? { ...item, ...dados } : item,
        ),
      );
    } else {
      setFuncionarios((anterior) => [
        {
          id: `${Date.now()}-${Math.random()}`,
          ...dados,
        },
        ...anterior,
      ]);
    }

    fecharModal();

    Alert.alert(
      "Sucesso",
      editandoId !== null
        ? "Funcionário atualizado com sucesso!"
        : "Funcionário cadastrado com sucesso!",
    );
  }

  function excluirFuncionario(id) {
    Alert.alert(
      "Excluir funcionário",
      "Deseja realmente excluir este funcionário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            setFuncionarios((anterior) =>
              anterior.filter((item) => item.id !== id),
            ),
        },
      ],
    );
  }

  const funcionariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return funcionarios.filter(
      (item) =>
        item.nome.toLowerCase().includes(termo) ||
        item.cargo.toLowerCase().includes(termo) ||
        item.telefone.toLowerCase().includes(termo),
    );
  }, [funcionarios, busca]);

  const totalAtivos = funcionarios.filter(
    (item) => item.status === "ATIVO",
  ).length;

  const totalInativos = funcionarios.filter(
    (item) => item.status === "INATIVO",
  ).length;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.fundo} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color={cores.azul} />
        </TouchableOpacity>

        <View style={styles.headerTexto}>
          <Text style={styles.titulo}>Funcionários</Text>
          <Text style={styles.subtitulo}>
            Cadastre e gerencie os funcionários
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.botaoCadastrar} onPress={abrirCadastro}>
          <Ionicons name="person-add-outline" size={21} color="#FFFFFF" />
          <Text style={styles.botaoCadastrarTexto}>Cadastrar funcionário</Text>
        </TouchableOpacity>

        <View style={styles.resumos}>
          <View style={styles.cardResumo}>
            <View style={styles.resumoIcone}>
              <Ionicons
                name="people-outline"
                size={24}
                color={cores.azulClaro}
              />
            </View>
            <Text style={styles.resumoNumero}>{funcionarios.length}</Text>
            <Text style={styles.resumoTexto}>Total</Text>
          </View>

          <View style={styles.cardResumo}>
            <View style={[styles.resumoIcone, { backgroundColor: "#E7F8EF" }]}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={cores.verde}
              />
            </View>
            <Text style={styles.resumoNumero}>{totalAtivos}</Text>
            <Text style={styles.resumoTexto}>Ativos</Text>
          </View>

          <View style={styles.cardResumo}>
            <View style={[styles.resumoIcone, { backgroundColor: "#F2F4F7" }]}>
              <Ionicons
                name="pause-circle-outline"
                size={24}
                color={cores.cinza}
              />
            </View>
            <Text style={styles.resumoNumero}>{totalInativos}</Text>
            <Text style={styles.resumoTexto}>Inativos</Text>
          </View>
        </View>

        <View style={styles.listaCard}>
          <Text style={styles.listaTitulo}>Lista de funcionários</Text>

          <Text style={styles.listaDescricao}>
            Funcionários cadastrados no sistema
          </Text>

          <View style={styles.buscaContainer}>
            <Ionicons name="search-outline" size={20} color="#98A2B3" />
            <TextInput
              style={styles.buscaInput}
              placeholder="Buscar funcionário..."
              placeholderTextColor="#98A2B3"
              value={busca}
              onChangeText={setBusca}
            />
          </View>

          {funcionariosFiltrados.length === 0 ? (
            <View style={styles.vazio}>
              <Ionicons name="people-outline" size={43} color="#98A2B3" />

              <Text style={styles.vazioTitulo}>
                Nenhum funcionário encontrado
              </Text>

              <Text style={styles.vazioTexto}>
                {busca
                  ? "Tente pesquisar por outro nome ou cargo."
                  : "Cadastre um funcionário para começar."}
              </Text>
            </View>
          ) : (
            funcionariosFiltrados.map((funcionario) => (
              <View key={funcionario.id} style={styles.funcionarioCard}>
                <View style={styles.funcionarioTopo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarTexto}>
                      {funcionario.nome.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.funcionarioInfo}>
                    <Text style={styles.funcionarioNome}>
                      {funcionario.nome}
                    </Text>
                    <Text style={styles.funcionarioCargo}>
                      {funcionario.cargo}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      funcionario.status === "ATIVO"
                        ? styles.statusAtivo
                        : styles.statusInativo,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusTexto,
                        {
                          color:
                            funcionario.status === "ATIVO"
                              ? cores.verde
                              : cores.cinza,
                        },
                      ]}
                    >
                      {funcionario.status === "ATIVO" ? "Ativo" : "Inativo"}
                    </Text>
                  </View>
                </View>

                <View style={styles.funcionarioDetalhes}>
                  <View style={styles.detalhe}>
                    <Text style={styles.detalheLabel}>Telefone</Text>
                    <Text style={styles.detalheValor}>
                      {funcionario.telefone}
                    </Text>
                  </View>

                  <View style={styles.detalhe}>
                    <Text style={styles.detalheLabel}>Salário</Text>
                    <Text style={styles.detalheValor}>
                      {formatarMoeda(funcionario.salario)}
                    </Text>
                  </View>
                </View>

                <View style={styles.acoes}>
                  <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => editarFuncionario(funcionario)}
                  >
                    <Ionicons
                      name="create-outline"
                      size={18}
                      color={cores.azulClaro}
                    />
                    <Text style={styles.textoEditar}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => excluirFuncionario(funcionario.id)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={cores.vermelho}
                    />
                    <Text style={styles.textoExcluir}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
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
                  ? "Editar funcionário"
                  : "Cadastrar funcionário"}
              </Text>
              <Text style={styles.modalSubtitulo}>
                Informe os dados do funcionário
              </Text>
            </View>

            <TouchableOpacity style={styles.fechar} onPress={fecharModal}>
              <Ionicons name="close" size={24} color={cores.cinza} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalConteudo}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Nome completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Cargo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Vendedor"
              value={cargo}
              onChangeText={setCargo}
            />

            <Text style={styles.label}>Telefone *</Text>
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={setTelefone}
            />

            <Text style={styles.label}>Endereço *</Text>
            <TextInput
              style={styles.input}
              placeholder="Rua, número, bairro..."
              value={endereco}
              onChangeText={setEndereco}
            />

            <Text style={styles.label}>Data de admissão</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              maxLength={10}
              value={dataAdmissao}
              onChangeText={setDataAdmissao}
            />

            <Text style={styles.label}>Salário (R$) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 2500,00"
              keyboardType="decimal-pad"
              value={salario}
              onChangeText={setSalario}
            />

            <Text style={styles.label}>Status</Text>

            <View style={styles.statusOpcoes}>
              <TouchableOpacity
                style={[
                  styles.statusOpcao,
                  status === "ATIVO" && styles.statusOpcaoAtiva,
                ]}
                onPress={() => setStatus("ATIVO")}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={status === "ATIVO" ? cores.verde : cores.cinza}
                />
                <Text style={styles.statusOpcaoTexto}>Ativo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.statusOpcao,
                  status === "INATIVO" && styles.statusOpcaoAtiva,
                ]}
                onPress={() => setStatus("INATIVO")}
              >
                <Ionicons
                  name="pause-circle-outline"
                  size={20}
                  color={status === "INATIVO" ? cores.vermelho : cores.cinza}
                />
                <Text style={styles.statusOpcaoTexto}>Inativo</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.observacao}>* Campos obrigatórios</Text>

            <View style={styles.modalAcoes}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={fecharModal}
              >
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarFuncionario}
              >
                <Ionicons name="save-outline" size={18} color="#FFFFFF" />
                <Text style={styles.salvarTexto}>
                  {editandoId !== null ? "Salvar alterações" : "Cadastrar"}
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
    alignItems: "center",
    justifyContent: "center",
  },
  headerTexto: {
    flex: 1,
  },
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
  scroll: {
    flex: 1,
  },
  conteudo: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  botaoCadastrar: {
    height: 49,
    backgroundColor: "#1769D2",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 16,
  },
  botaoCadastrarTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  resumos: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 18,
  },
  cardResumo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    alignItems: "center",
  },
  resumoIcone: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: "800",
    color: "#17366B",
  },
  resumoTexto: {
    fontSize: 12,
    color: "#667085",
    marginTop: 3,
  },
  listaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    padding: 15,
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
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 16,
  },
  buscaInput: {
    flex: 1,
    fontSize: 14,
    color: "#17366B",
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
    textAlign: "center",
    marginTop: 6,
  },
  funcionarioCard: {
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 13,
    padding: 13,
    marginBottom: 12,
  },
  funcionarioTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#17366B",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTexto: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  funcionarioInfo: {
    flex: 1,
  },
  funcionarioNome: {
    fontSize: 14,
    fontWeight: "700",
    color: "#17366B",
  },
  funcionarioCargo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusAtivo: {
    backgroundColor: "#E7F8EF",
  },
  statusInativo: {
    backgroundColor: "#F2F4F7",
  },
  statusTexto: {
    fontSize: 11,
    fontWeight: "700",
  },
  funcionarioDetalhes: {
    flexDirection: "row",
    marginTop: 15,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: "#E5EAF2",
    gap: 10,
  },
  detalhe: {
    flex: 1,
  },
  detalheLabel: {
    fontSize: 11,
    color: "#98A2B3",
  },
  detalheValor: {
    fontSize: 13,
    fontWeight: "600",
    color: "#344054",
    marginTop: 5,
  },
  acoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  botaoEditar: {
    flex: 1,
    height: 41,
    backgroundColor: "#EAF2FF",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  textoEditar: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1769D2",
  },
  botaoExcluir: {
    flex: 1,
    height: 41,
    backgroundColor: "#FDECEC",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  textoExcluir: {
    fontSize: 13,
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
  modalHeaderInfo: {
    flex: 1,
  },
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
  statusOpcoes: {
    flexDirection: "row",
    gap: 10,
  },
  statusOpcao: {
    flex: 1,
    height: 49,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  statusOpcaoAtiva: {
    borderColor: "#1769D2",
    backgroundColor: "#EAF2FF",
  },
  statusOpcaoTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#344054",
  },
  observacao: {
    fontSize: 12,
    color: "#98A2B3",
    marginTop: 16,
  },
  modalAcoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },
  botaoCancelar: {
    flex: 1,
    height: 48,
    backgroundColor: "#F2F4F7",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelarTexto: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "700",
  },
  botaoSalvar: {
    flex: 1.5,
    height: 48,
    backgroundColor: "#1769D2",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  salvarTexto: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
