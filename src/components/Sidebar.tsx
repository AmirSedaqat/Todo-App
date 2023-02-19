import React, { useCallback } from "react";
import {
    Box,
    VStack,
    Center,
    Avatar,
    useColorModeValue,
    Heading,
    IconButton,
    HStack,
} from "native-base";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import AnimatedColorBox from "../components/AnimatedColorBox";
import ThemeToggle from "../components/ThemeToggle";
import { Feather } from "@expo/vector-icons";
import MenuButton from "./MenuButton";

const Sidebar = (props: DrawerContentComponentProps) => {
    const { state, navigation } = props;
    const currentRoute = state.routeNames[state.index];

    const handlePressBackButton = useCallback(() => {
        navigation.closeDrawer();
    }, [navigation]);
    const handlePressMenuMain = useCallback(() => {
        navigation.navigate("Main");
    }, [navigation]);
    const handlePressMenuAbout = useCallback(() => {
        navigation.navigate("About");
    }, [navigation]);

    return (
        <AnimatedColorBox
            flex={1}
            p={7}
            bg={useColorModeValue("blue.50", "darkBlue.800")}
        >
            <VStack flex={1} space={2}>
                <HStack justifyContent="flex-end">
                    <IconButton
                        onPress={handlePressBackButton}
                        borderRadius={100}
                        variant="outline"
                        borderColor={useColorModeValue(
                            "blue.300",
                            "darkBlue.800"
                        )}
                        _icon={{
                            as: Feather,
                            size: 6,
                            name: "chevron-left",
                            color: useColorModeValue(
                                "blue.700",
                                "darkBlue.700"
                            ),
                        }}
                    />
                </HStack>
                <Avatar
                    source={require("../assets/masthead.png")}
                    size="2xl"
                    borderWidth={3}
                    borderColor={useColorModeValue("blue.200", "blue.50")}
                    borderRadius={100}
                    mb={6}
                />
                <Heading ml={-5} mb={5}>
                    {" "}
                    Amir Sedaghat
                </Heading>
                <MenuButton
                    active={currentRoute === "Main"}
                    icon="inbox"
                    onPress={handlePressMenuMain}
                >
                    Tasks
                </MenuButton>
                <MenuButton
                    active={currentRoute === "About"}
                    icon="info"
                    onPress={handlePressMenuAbout}
                >
                    About
                </MenuButton>
            </VStack>
            <ThemeToggle />
        </AnimatedColorBox>
    );
};
export default Sidebar;
