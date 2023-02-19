import React, { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";
import { VStack, Box, Image, Heading } from "native-base";
interface IProps {
    image: ImageSourcePropType;
    title: string;
    children: ReactNode;
}
const Masthead = ({ image, title, children }: IProps) => {
    return (
        <VStack h="300" w="full" pb="5">
            <Image
                source={image}
                alt="Masthead image"
                position="absolute"
                bottom={0}
                top={0}
                left={0}
                right={0}
                w="full"
                h="300"
                resizeMode="cover"
            />
            {children}
            <Box flex={1} />
            <Heading color="white" size="xl" p={3}>
                {title}
            </Heading>
        </VStack>
    );
};
export default Masthead;
