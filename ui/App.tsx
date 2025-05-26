import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import CreateWallet from "./screens/CreateWallet";
import ImportWallet from "./screens/ImportWallet";
import Dashboard from "./screens/Dashboard";
import Send from "./screens/Send";
import JobTab from "./screens/JobTab";
import ConfirmWallet from "./screens/ConfirmWallet";
import ReceiveScreen from "./screens/ReceiveScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CreateWallet" component={CreateWallet} />
        <Stack.Screen name="ConfirmWallet" component={ConfirmWallet} />
        <Stack.Screen name="ImportWallet" component={ImportWallet} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ReceiveScreen" component={ReceiveScreen} />
        <Stack.Screen name="Send" component={Send} />
        <Stack.Screen name="JobTab" component={JobTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
