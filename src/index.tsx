import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "./screen/AboutScreen";
import Sidebar from "./components/Sidebar";
import MainScreen from "./screen/MainScreen";

const Drawer = createDrawerNavigator();
const Navigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Main"
            drawerContent={(props) => <Sidebar {...props} />}
            screenOptions={{
                drawerType: "back",
                overlayColor: "#00000000",
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Main" component={MainScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
    );
};
export default Navigator;
