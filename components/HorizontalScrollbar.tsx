import React, { useRef, useState } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";

interface Props {
  // height: number;
  thumbColor?: string;
  trackColor?: string;
  children?: React.ReactNode;
}

const HorizontalScrollWithScrollbar = ({
  // height,
  thumbColor = "#36C23E",
  trackColor = "#2A2A2A",
  children
}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [contentWidth, setContentWidth] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.setValue(e.nativeEvent.contentOffset.x);
  };

  const ratio = layoutWidth / contentWidth;

  const thumbWidth = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [ratio * layoutWidth, ratio * layoutWidth],
    extrapolate: "clamp"
  });

  const thumbTranslateX = scrollX.interpolate({
    inputRange: [0, contentWidth - layoutWidth],
    outputRange: [0, layoutWidth - ratio * layoutWidth],
    extrapolate: "clamp"
  });

  const shouldRenderBar =
    contentWidth > layoutWidth &&
    contentWidth > 0 &&
    layoutWidth > 0;

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={(w) => setContentWidth(w)}
        onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          {children}
        </View>
      </ScrollView>

      {shouldRenderBar && (
        <View
          style={{
            width: "100%",
            height: 6,
            backgroundColor: trackColor,
            borderRadius: 10,
            marginTop: 4,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: thumbWidth,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbTranslateX }],
              borderRadius: 10,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default HorizontalScrollWithScrollbar;
