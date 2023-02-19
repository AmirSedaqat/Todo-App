import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import theme from "../theme";

interface IProps {
    children: React.ReactNode;
}

const AppContainer: FC<IProps> = ({ children }) => {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
        </NavigationContainer>
    );
};

export default AppContainer;

const styles = StyleSheet.create({});
