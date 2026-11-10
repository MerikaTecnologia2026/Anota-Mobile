import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/screens/Splash";
import LoginScreen from "./src/screens/Login/LoginScreen";
import CadastroScreen from "./src/screens/Cadastro/CadastroScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import ReceitasScreen from "./src/screens/receitas/ReceitasScreen";
import ListaVendasScreen from "./src/screens/receitas/ListaVendasScreen";
import CategoriasScreen from "./src/screens/Configuracoes/CategoriasScreen";
import FormasPagamentoScreen from "./src/screens/Configuracoes/FormasPagamentoScreen";
import RelatorioScreen from "./src/screens/Configuracoes/RelatorioScreen";
import DespesasScreen from "./src/screens/Despesas/DespesasScreen";
import FuncionarioScreen from "./src/screens/Funcionario/FuncionarioScreen";
import OrcamentoScreen from "./src/screens/Orcamento/OrcamentoScreen";
import PlanoScreen from "./src/screens/Planos/PlanosScreen";
import MinhaContaScreen from "./src/screens/MinhaConta/MinhaContaScreen";
import MeusDadosScreen from "./src/screens/MinhaConta/MeusDadosScreen";
import MinhaEmpresaScreen from "./src/screens/MinhaConta/MinhaEmpresaScreen";
import SegurancaScreen from "./src/screens/MinhaConta/SegurancaScreen";

import MinhaAssinaturaScreen from "./src/screens/Planos/assinatura/MinhaAssinaturaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  return (
    <SafeAreaProvider>
      {mostrarSplash ? (
        <Splash onFinish={() => setMostrarSplash(false)} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Receitas"
              component={ReceitasScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListaVendas"
              component={ListaVendasScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Categorias"
              component={CategoriasScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FormasPagamento"
              component={FormasPagamentoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Despesas"
              component={DespesasScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Funcionario"
              component={FuncionarioScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Orcamento"
              component={OrcamentoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Relatorio"
              component={RelatorioScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MinhaConta"
              component={MinhaContaScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MeusDados" component={MeusDadosScreen} />
            <Stack.Screen name="MinhaEmpresa" component={MinhaEmpresaScreen} />
            <Stack.Screen name="Seguranca" component={SegurancaScreen} />
            <Stack.Screen
              name="Plano"
              component={PlanoScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MinhaAssinatura"
              component={MinhaAssinaturaScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}
