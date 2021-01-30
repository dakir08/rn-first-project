import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";

import { onBoarding1, onBoarding2, onBoarding3 } from "../../constants/images";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    img: onBoarding1,
  },
  {
    title: "Navigation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    img: onBoarding2,
  },
  {
    title: "Destination",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    img: onBoarding3,
  },
];

export interface OnBoardingScreenProps {}

export const OnBoardingScreen: React.FunctionComponent<OnBoardingScreenProps> = () => {
  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    const checkEnd = scrollX.addListener(({ value }) => {
      if (Math.ceil(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    });

    return () => scrollX.removeListener(checkEnd);
  }, [completed]);

  const renderContent = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      scrollEventThrottle={10}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
    >
      {onBoardings.map((item) => (
        <View key={item.title} style={{ width: SIZES.width }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={item.img}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={{ position: "absolute", bottom: "10%" }}>
            <Text
              style={{ color: COLORS.gray, textAlign: "center", ...FONTS.h1 }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                textAlign: "center",
                marginTop: SIZES.base,
                color: COLORS.gray,
              }}
            >
              {item.description}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              right: 0,
              width: 140,
              height: 50,
              paddingLeft: 20,
              justifyContent: "center",
              backgroundColor: COLORS.blue,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
            }}
            onPress={() => {}}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {completed ? "Let's go" : "Skip"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </Animated.ScrollView>
  );

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((_, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={[styles.dot, { width: dotSize, height: dotSize, opacity }]}
              key={index}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotContainerRoot}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  dotContainerRoot: {
    position: "absolute",
    bottom: SIZES.height > 700 ? "26%" : "20%",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
