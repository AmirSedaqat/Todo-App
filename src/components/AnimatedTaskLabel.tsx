import React, { FC, useEffect, memo, ReactNode } from "react";
import { Pressable } from "react-native";
import { Text, HStack, Box } from "native-base";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    Easing,
    interpolateColor,
} from "react-native-reanimated";

interface IProps {
    textColor: string;
    inactiveTextColor: string;
    children?: string;
    strikeThrough: boolean;
    onPress?: () => void;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AniamtedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel: FC<IProps> = ({
    textColor,
    inactiveTextColor,
    children,
    strikeThrough,
    onPress,
}) => {
    const hstackOffset = useSharedValue(0);
    const hstackOffsetAnimatedStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateX: hstackOffset.value }],
        }),
        [strikeThrough]
    );

    const textColorProgress = useSharedValue(0);
    const textColorProgressAnimatedStyle = useAnimatedStyle(
        () => ({
            color: interpolateColor(
                textColorProgress.value,
                [0, 1],
                [textColor, inactiveTextColor]
            ),
        }),
        [strikeThrough, textColor, inactiveTextColor]
    );

    useEffect(() => {
        const easing = Easing.out(Easing.quad);
        if (strikeThrough) {
            hstackOffset.value = withSequence(
                withTiming(4, { duration: 200, easing }),
                withTiming(0, { duration: 200, easing })
            );
            textColorProgress.value = withDelay(
                1100,
                withTiming(1, { duration: 400, easing })
            );
            strikeThroughWidth.value = withDelay(
                400,
                withTiming(1, {
                    duration: 800,
                    easing,
                })
            );
        } else {
            strikeThroughWidth.value = withTiming(0, { duration: 400, easing });
            textColorProgress.value = withTiming(0, { duration: 400 });
        }
    }, [strikeThrough, textColor, inactiveTextColor]);

    const strikeThroughWidth = useSharedValue(0);
    const strikeThroughWidthAniamtedStyle = useAnimatedStyle(
        () => ({
            width: `${strikeThroughWidth.value * 100}%`,
            borderBottomColor: interpolateColor(
                textColorProgress.value,
                [0, 1],
                [textColor, inactiveTextColor]
            ),
        }),
        [strikeThrough, textColor, inactiveTextColor]
    );

    return (
        <Pressable onPress={onPress}>
            <AnimatedHStack
                alignItems="center"
                style={[hstackOffsetAnimatedStyle]}
            >
                <AniamtedText
                    fontSize={19}
                    numberOfLines={1}
                    isTruncated
                    px={1}
                    style={[textColorProgressAnimatedStyle]}
                >
                    {children}
                </AniamtedText>
                <AnimatedBox
                    style={[strikeThroughWidthAniamtedStyle]}
                    position="absolute"
                    h={1}
                    borderBottomWidth={1}
                />
            </AnimatedHStack>
        </Pressable>
    );
};
export default memo(AnimatedTaskLabel);
