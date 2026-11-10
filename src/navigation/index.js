import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../services/auth";

import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import RecuperarSenha from "../screens/RecuperarSenha";
import Geral from "../screens/Geral";
import EmConstrucao from "../screens/EmConstrucao";

const Stack = createNativeStackNavigator();

const telasPendentes = [
  ["Dashboard", "Início"],
  ["Receitas", "Receitas"],
  ["Despesas", "Despesas"],
  ["Orcamento", "Orçamento"],
  ["ListaVendas", "Lista de Vendas"],
  ["Funcionarios", "Funcionários"],
  ["FormaPagamento", "Forma de Pagamento"],
  ["Categoria", "Categorias"],
  ["Relatorio", "Relatório"],
  ["Empresa", "Empresa"],
  ["Usuario", "Usuário"],
];

export default function Navigation() {
  const { token, carregando } = useAuth();
  const [splashFinalizada, setSplashFinalizada] = useState(false);

  if (!splashFinalizada || carregando) {
    return <Splash onFinish={() => setSplashFinalizada(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        {token ? (
          <>
            {telasPendentes.map(([nome, titulo]) => (
              <Stack.Screen
                key={nome}
                name={nome}
                component={EmConstrucao}
                initialParams={{ titulo }}
              />
            ))}
            <Stack.Screen name="Geral" component={Geral} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
