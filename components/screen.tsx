import { View, ViewProps } from "@/src/tw";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  statusBarColor?: string;
  safe?: boolean;
}

export function Screen({
  children,
  className = "",
  statusBarColor,
  safe = true,
  ...props
}: ScreenProps) {
  const Content = safe ? SafeAreaView : View;

  return (
    <View className={`flex-1 ${className}`} {...props}>
      <StatusBar style="auto" backgroundColor={statusBarColor} />
      <Content style={{ flex: 1 }}>{children}</Content>
    </View>
  );
}
