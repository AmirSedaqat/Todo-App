import React, { FC } from "react";
import { Button, Icon, IButtonProps, useColorModeValue } from "native-base";
import { Feather } from "@expo/vector-icons";

interface IProps extends IButtonProps {
    children: React.ReactNode;
    active: boolean;
    icon: string;
}
const MenuButton: FC<IProps> = ({ active, children, icon, ...props }) => {
    const colorScheme = useColorModeValue("blue", "darkBlue");
    const inactiveTextColor = useColorModeValue("blue.500", undefined);
    const pressedBgColor = useColorModeValue("primary.100", "primary.600");

    return (
        <Button
            size="lg"
            colorScheme={colorScheme}
            bg={active ? undefined : "transparent"}
            _pressed={{ bg: pressedBgColor }}
            _text={{ color: active ? "blue.50" : inactiveTextColor }}
            variant="solid"
            justifyContent="flex-start"
            leftIcon={
                <Icon
                    color={active ? "blue.50" : "blue.600"}
                    as={Feather}
                    name={icon}
                    size="lg"
                    opacity={0.7}
                    mr={3}
                />
            }
            {...props}
        >
            {children}
        </Button>
    );
};
export default MenuButton;
