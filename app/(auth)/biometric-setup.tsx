import React from 'react';
import { useRouter } from 'expo-router';
import {
  AUTH_COLORS,
  AuthIllustration,
  FeatureBullet,
  PrimaryAuthButton,
  SecondaryAuthButton,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { Text, View } from '@/src/tw';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BiometricSetupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Screen className="bg-white" safe={false}>
      <View
        style={{
          flex: 1,
          paddingBottom: Math.max(insets.bottom, 24) + 16,
          paddingHorizontal: 24,
          paddingTop: insets.top + 18,
        }}
      >
        <Text
          className="font-inter font-extrabold"
          style={{ color: AUTH_COLORS.ink, fontSize: 22, lineHeight: 28, marginTop: 44 }}
        >
          Set Up Biometric Login
        </Text>
        <Text
          className="font-inter"
          style={{ color: '#4D4A68', fontSize: 16, lineHeight: 22, marginTop: 8 }}
        >
          Log in faster and more securely with your fingerprint or face. Your biometric data never
          leaves your device.
        </Text>

        <View style={{ alignItems: 'center', marginTop: 72 }}>
          <AuthIllustration
            height={220}
            source={require('@/assets/images/svg8.svg')}
            width={220}
          />
        </View>

        <View style={{ gap: 12, marginTop: 54 }}>
          <FeatureBullet icon="fingerprint" text="Instant, secure access" />
          <FeatureBullet icon="cellphone-lock" text="Stored only on this device" />
        </View>

        <View style={{ gap: 12, marginTop: 'auto' }}>
          <PrimaryAuthButton
            label="Enable Biometrics"
            onPress={() => router.push('/passkey-setup')}
          />
          <SecondaryAuthButton label="Skip for now" onPress={() => router.push('/passkey-setup')} />
        </View>
      </View>
    </Screen>
  );
}
