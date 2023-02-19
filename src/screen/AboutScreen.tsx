import React from "react";
import { Box, ScrollView, useColorModeValue } from "native-base";
import AnimatedColorBox from "../components/AnimatedColorBox";
import Navbar from "../components/Navbar";
import Masthead from "../components/Masthead";
import { Text } from "react-native";

const AboutScreen = () => {
    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue("warmGray.50", "warmGray.900")}
            w="full"
        >
            <Masthead
                title="Developing..."
                image={require("../assets/about.jpg")}
            >
                <Navbar />
            </Masthead>
            <ScrollView
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                bg={useColorModeValue("warmGray.50", "blueGray.900")}
                mt="-20px"
                pt="30px"
                p={4}
            ></ScrollView>
        </AnimatedColorBox>
    );
};

export default AboutScreen;
