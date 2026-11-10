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

const formasPadrao = [
  {
    id: "credito",
    nome: "Cartão de Crédito",
    icone: "card-outline",
  },
  {
    id: "debito",
    nome: "Cartão de Débito",
    icone: "card-outline",
  },
  {
    id: "pix",
    nome: "PIX",
    icone: "qr-code-outline",
  },
  {
    id: "dinheiro",
    nome: "Dinheiro",
    icone: "cash-outline",
  },
  {
    id: "boleto",
    nome: "Boleto",
    icone: "document-text-outline",
  },
];

const taxasIniciais = {
  credito: "0,00",
  debito: "0,00",
  pix: "0,00",
  dinheiro: "0,00",
  boleto: "0,00",
};

export default function FormasPagamentoScreen({ navigation }) {
  const [taxas, setTaxas] = useState({ ...taxasIniciais });
  const [taxasSalvas, setTaxasSalvas] = useState({
    ...taxasIniciais,
  });
  const [editando, setEditando] = useState(false);

  function alterarTaxa(id, valor) {
    const valorLimpo = valor.replace(/[^0-9,.]/g, "");

    setTaxas((anterior) => ({
      ...anterior,
      [id]: valorLimpo,
    }));
  }

  function salvarTaxas() {
    for (const forma of formasPadrao) {
      const valor = taxas[forma.id].trim();
      const percentual = Number(valor.replace(",", "."));

      if (
        !/^\d+([,.]\d+)?$/.test(valor) ||
        !Number.isFinite(percentual) ||
        percentual < 0 ||
        percentual > 100
      ) {
        Alert.alert(
          "Taxa inválida",
          `Informe uma taxa entre 0 e 100 para ${forma.nome}.`,
        );
        return;
      }
    }

    const novasTaxas = {};

    formasPadrao.forEach((forma) => {
      const numero = Number(taxas[forma.id].replace(",", "."));

      novasTaxas[forma.id] = numero.toFixed(2).replace(".", ",");
    });

    setTaxas(novasTaxas);
    setTaxasSalvas({ ...novasTaxas });
    setEditando(false);

    Alert.alert("Sucesso", "Taxas atualizadas nesta tela com sucesso!");
  }

  function cancelarEdicao() {
    setTaxas({ ...taxasSalvas });
    setEditando(false);
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color="#17366B" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.titulo}>Formas de Pagamento</Text>

          <Text style={styles.subtitulo}>Configure as taxas de pagamento</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconePrincipal}>
              <Ionicons name="wallet-outline" size={25} color="#1769D2" />
            </View>

            <View style={styles.cardHeaderInfo}>
              <Text style={styles.cardTitulo}>Taxas de pagamento</Text>

              <Text style={styles.cardDescricao}>
                Clique em Editar para alterar as taxas.
              </Text>
            </View>
          </View>

          {formasPadrao.map((forma) => (
            <View key={forma.id} style={styles.formaItem}>
              <View style={styles.formaInfo}>
                <View style={styles.iconeForma}>
                  <Ionicons name={forma.icone} size={22} color="#1769D2" />
                </View>

                <Text style={styles.formaNome}>{forma.nome}</Text>
              </View>

              <View style={styles.taxaContainer}>
                <TextInput
                  style={[
                    styles.inputTaxa,
                    !editando && styles.inputDesabilitado,
                  ]}
                  value={taxas[forma.id]}
                  onChangeText={(valor) => alterarTaxa(forma.id, valor)}
                  editable={editando}
                  keyboardType="decimal-pad"
                  selectTextOnFocus
                  maxLength={8}
                />

                <Text style={styles.porcentagem}>%</Text>
              </View>
            </View>
          ))}

          <View style={styles.divisor} />

          <View style={styles.botoes}>
            {editando ? (
              <>
                <TouchableOpacity
                  style={styles.botaoCancelar}
                  onPress={cancelarEdicao}
                >
                  <Text style={styles.textoCancelar}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoSalvar}
                  onPress={salvarTaxas}
                >
                  <Ionicons name="save-outline" size={19} color="#FFFFFF" />

                  <Text style={styles.textoSalvar}>Salvar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => setEditando(true)}
              >
                <Ionicons name="create-outline" size={19} color="#FFFFFF" />

                <Text style={styles.textoEditar}>Editar taxas</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.aviso}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#1769D2"
          />

          <Text style={styles.avisoTexto}>
            As taxas configuradas serão utilizadas futuramente nos cálculos das
            vendas.
          </Text>
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
    alignItems: "center",
    justifyContent: "center",
  },

  headerInfo: {
    flex: 1,
  },

  titulo: {
    fontSize: 21,
    fontWeight: "800",
    color: "#17366B",
  },

  subtitulo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
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

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },

  iconePrincipal: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  cardHeaderInfo: {
    flex: 1,
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: "800",
    color: "#17366B",
  },

  cardDescricao: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },

  formaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginBottom: 12,
    gap: 10,
  },

  formaInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconeForma: {
    width: 37,
    height: 37,
    borderRadius: 9,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  formaNome: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#344054",
  },

  taxaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  inputTaxa: {
    width: 72,
    height: 42,
    borderWidth: 1,
    borderColor: "#1769D2",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    textAlign: "right",
    fontSize: 14,
    color: "#17366B",
  },

  inputDesabilitado: {
    backgroundColor: "#F2F4F7",
    borderColor: "#E5EAF2",
    color: "#667085",
  },

  porcentagem: {
    fontSize: 15,
    fontWeight: "600",
    color: "#667085",
  },

  divisor: {
    height: 1,
    backgroundColor: "#E5EAF2",
    marginTop: 12,
    marginBottom: 20,
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  botaoEditar: {
    flex: 1,
    height: 46,
    backgroundColor: "#1769D2",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoEditar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  botaoCancelar: {
    flex: 1,
    height: 46,
    backgroundColor: "#F2F4F7",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCancelar: {
    color: "#344054",
    fontSize: 14,
    fontWeight: "600",
  },

  botaoSalvar: {
    flex: 1,
    height: 46,
    backgroundColor: "#15966B",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoSalvar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  aviso: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EAF2FF",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginTop: 15,
  },

  avisoTexto: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: "#17366B",
  },
});
