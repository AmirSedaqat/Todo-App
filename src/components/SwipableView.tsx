import { View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import {
    GestureHandlerRootView,
    GestureDetector,
    Gesture,
    GestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    withTiming,
    runOnJS,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Box } from "native-base";
import { makeStyledComponent } from "../utils/makeStyledComponent";
import { FC } from "react";

const StyledView = makeStyledComponent(Animated.View);

interface IProps {
    children: React.ReactNode;
    backView: React.ReactNode;
    onSwipeLeft?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_TRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipableView: FC<IProps> = ({ children, backView, onSwipeLeft }) => {
    const translateX = useSharedValue(0);
    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = Math.max(-128, Math.min(0, e.translationX));
        })
        .onEnd(() => {
            const shouldBeDismissed = translateX.value < SWIPE_TRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                onSwipeLeft && runOnJS(onSwipeLeft)();
            } else {
                translateX.value = withTiming(0);
            }
        });
    const facedAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));
    return (
        <StyledView w="full">
            {backView && (
                <Box position="absolute" left={0} right={0} top={0} bottom={0}>
                    {backView}
                </Box>
            )}
            <GestureHandlerRootView>
                <GestureDetector gesture={gesture}>
                    <StyledView style={facedAnimatedStyle}>
                        {children}
                    </StyledView>
                </GestureDetector>
            </GestureHandlerRootView>
        </StyledView>
    );
};
export default SwipableView;
