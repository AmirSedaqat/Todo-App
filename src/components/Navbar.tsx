import React, { useCallback } from "react";
import { HStack, IconButton } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const Navbar = () => {
    const navigation = useNavigation<DrawerNavigationProp<{}>>();
    const handlerMenuButton = useCallback(() => {
        navigation.openDrawer();
    }, [navigation]);
    return (
        <HStack
            h={50}
            mt={4}
            ml={2}
            w="full"
            alignItems="center"
            alignContent="center"
        >
            <IconButton
                onPress={handlerMenuButton}
                borderRadius={100}
                _icon={{
                    as: Feather,
                    name: "menu",
                    size: 6,
                    color: "white",
                }}
            />
        </HStack>
    );
};
export default Navbar;
