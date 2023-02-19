import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { VStack, useColorModeValue, Fab, Icon } from "native-base";
import shortid from "shortid";
import TaskList from "../components/TaskList";
import AnimatedColorBox from "../components/AnimatedColorBox";
import Masthead from "../components/Masthead";
import Navbar from "../components/Navbar";

const initialData = [
    {
        id: shortid.generate(),
        subject: "Going to the library at 16:00",
        done: false,
    },
    {
        id: shortid.generate(),
        subject: "Go to the Gym",
        done: false,
    },
    {
        id: shortid.generate(),
        subject: "Meet Friends",
        done: false,
    },
];
const MainScreen = () => {
    const [data, setData] = useState(initialData);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const handlerToggleItem = useCallback((item: any) => {
        setData((prevData) => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                done: !item.done,
            };
            return newData;
        });
    }, []);

    const handleChangeTaskItemSubject = useCallback(
        (item: any, newSubject: string) => {
            setData((prevData) => {
                const newData = [...prevData];
                const index = newData.indexOf(item);

                newData[index] = {
                    ...item,
                    subject: newSubject,
                };
                return newData;
            });
        },
        []
    );
    const handleFinishEditingTaskItem = useCallback((_item: any) => {
        setEditingItemId(null);
    }, []);
    const handlePressTaskItemLabel = useCallback((item: any) => {
        setEditingItemId(item.id);
    }, []);

    const handleRemoveTaskItem = useCallback((item: any) => {
        setData((prevData) => {
            const newData = prevData.filter((i) => i !== item);
            return newData;
        });
    }, []);

    return (
        <AnimatedColorBox
            bg={useColorModeValue("warmGray.50", "blueGray.900")}
            flex={1}
            w="full"
        >
            <Masthead title="Tasks" image={require("../assets/masthead1.png")}>
                <Navbar />
            </Masthead>
            <VStack
                flex={1}
                space={1}
                mt="-15px"
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                pt="20px"
                bg={useColorModeValue("warmGray.50", "blueGray.900")}
            >
                <TaskList
                    data={data}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveTaskItem}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onToggleItem={handlerToggleItem}
                    editingItemId={editingItemId}
                />
            </VStack>
            <Fab
                renderInPortal={false}
                position="absolute"
                icon={
                    <Icon
                        color="white"
                        as={<AntDesign name="plus" />}
                        size="sm"
                    />
                }
                colorScheme={useColorModeValue("blue", "darkBlue")}
                bg={useColorModeValue("blue.500", "blue.400")}
                onPress={() => {
                    const id = shortid.generate();
                    setData([
                        {
                            id,
                            subject: "",
                            done: false,
                        },
                        ...data,
                    ]);
                    setEditingItemId(id);
                }}
            />
        </AnimatedColorBox>
    );
};

export default MainScreen;
