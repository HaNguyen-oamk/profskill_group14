
// weather/theme.js
import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";


export const theme = {
  
  bg: "#0B1220",
  card: "rgba(255,255,255,0.06)",
  card2: "rgba(255,255,255,0.08)",
  text: "#EAF0FF",
  muted: "rgba(234,240,255,0.70)",
  muted2: "rgba(234,240,255,0.55)",
  border: "rgba(234,240,255,0.12)",
  danger: "rgba(255,160,160,0.9)",
  r: 18,
  r2: 14,
  p: 14,

  //  new keys for iOS-style helpers
  colors: {
    text: "rgba(255,255,255,0.95)",
    muted: "rgba(255,255,255,0.72)",
    border: "rgba(255,255,255,0.18)",
    card: "rgba(255,255,255,0.14)",
    overlay: "rgba(0,0,0,0.18)",
  },
  spacing: { xs: 8, sm: 12, md: 16, lg: 24 },
  radius: { xl: 26, lg: 18, md: 14 },
  shadow: {
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.28,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    elevation: 8,
  },
};

// 1) Screen background like iOS Weather
// If it  don't pass imageSource, it will use only gradient.
export function ScreenBackground({ children, imageSource }) {
  const content = (
    <>
      <LinearGradient
        colors={["rgba(10,30,80,0.65)", "rgba(10,20,40,0.88)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1, padding: theme.spacing.md }}>{children}</View>
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      {imageSource ? (
        <ImageBackground source={imageSource} resizeMode="cover" style={{ flex: 1 }}>
          {content}
        </ImageBackground>
      ) : (
        <View style={{ flex: 1, backgroundColor: theme.bg }}>{content}</View>
      )}
    </View>
  );
}

// 2) Glass card wrapper
export function GlassCard({ children, style, intensity = 22 }) {
  return (
    <View style={[styles.cardOuter, style]}>
      <BlurView intensity={intensity} tint="dark" style={styles.blur}>
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    backgroundColor: theme.colors.card,
    ...theme.shadow.ios,
    elevation: theme.shadow.elevation,
  },
  blur: {
    padding: theme.spacing.lg,
  },
});
