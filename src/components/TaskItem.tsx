import React, { useCallback } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import {
    Pressable,
    Box,
    HStack,
    useColorModeValue,
    Icon,
    Input,
    useToken,
} from "native-base";
import AnimatedCheckbox from "react-native-checkbox-reanimated";
import AnimatedTaskLabel from "./AnimatedTaskLabel";
import SwipableView from "./SwipableView";
import { Feather } from "@expo/vector-icons";

interface IProps {
    isEditing: boolean;
    isDone: boolean;
    onToggleCheckbox?: () => void;
    onPressLabel?: () => void;
    onRemove?: () => void;
    onChangeSubject?: (subject: string) => void;
    onFinishEditing?: () => void;
    subject: string;
}

const TaskItem = (props: IProps) => {
    const {
        isEditing,
        isDone,
        onToggleCheckbox,
        subject,
        onPressLabel,
        onRemove,
        onChangeSubject,
        onFinishEditing,
    } = props;

    const highlightColor = useToken(
        "colors",
        useColorModeValue("blue.500", "blue.400")
    );
    const boxStroke = useToken(
        "colors",
        useColorModeValue("muted.300", "muted.500")
    );

    const checkmarkColor = useToken(
        "colors",
        useColorModeValue("white", "white")
    );

    const activeTextColor = useToken(
        "colors",
        useColorModeValue("darkText", "lightText")
    );
    const doneTextColor = useToken(
        "colors",
        useColorModeValue("muted.400", "muted.600")
    );

    const handleChangeSubject = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            onChangeSubject && onChangeSubject(e.nativeEvent.text);
        },
        [onChangeSubject]
    );

    return (
        <SwipableView
            onSwipeLeft={onRemove}
            backView={
                <Box
                    w="full"
                    h="full"
                    bg="red.500"
                    alignItems="flex-end"
                    justifyContent="center"
                    pr={4}
                >
                    <Icon
                        color="white"
                        as={<Feather name="trash-2" />}
                        size="sm"
                    />
                </Box>
            }
        >
            <HStack
                alignItems="center"
                w="full"
                px={4}
                py={2}
                bg={useColorModeValue("warmGray.50", "blueGray.900")}
            >
                <Box width={30} height={30} mr={2}>
                    <Pressable onPress={onToggleCheckbox}>
                        <AnimatedCheckbox
                            highlightColor={highlightColor}
                            checkmarkColor={checkmarkColor}
                            boxOutlineColor={boxStroke}
                            checked={isDone}
                        />
                    </Pressable>
                </Box>
                {isEditing ? (
                    <Input
                        placeholder="Task"
                        value={subject}
                        variant="unstyled"
                        fontSize={19}
                        px={1}
                        py={0}
                        autoFocus
                        blurOnSubmit
                        onChange={handleChangeSubject}
                        onBlur={onFinishEditing}
                    />
                ) : (
                    <AnimatedTaskLabel
                        textColor={activeTextColor}
                        inactiveTextColor={doneTextColor}
                        strikeThrough={isDone}
                        onPress={onPressLabel}
                    >
                        {subject}
                    </AnimatedTaskLabel>
                )}
            </HStack>
        </SwipableView>
    );
};

export default TaskItem;
