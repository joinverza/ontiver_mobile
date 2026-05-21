import React from 'react';
import { useRouter } from 'expo-router';
import {
  AuthIllustration,
  AuthScreenFrame,
  PrimaryAuthButton,
  SideDecorations,
} from '@/components/auth/auth-ui';
import { Pressable, Text, View } from '@/src/tw';

export default function BiometricLoginScreen() {
  const router = useRouter();

  return (
    <AuthScreenFrame title="">
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <SideDecorations />

        <View style={{ paddingHorizontal: 14, paddingTop: 16 }}>
          <Text
            className="font-inter font-extrabold"
            style={{ color: '#FFFFFF', fontSize: 20, lineHeight: 24 }}
          >
            Welcome back
          </Text>
          <Text
            className="font-inter font-extrabold"
            style={{ color: '#FFFFFF', fontSize: 30, lineHeight: 36, marginTop: 2 }}
          >
            Chris Doe
          </Text>
          <Text
            className="font-inter"
            style={{ color: '#F4F3FF', fontSize: 16, lineHeight: 21, marginTop: 8, maxWidth: 220 }}
          >
            Use your biometric to access your vault.
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            flex: 1,
            marginTop: 28,
            paddingHorizontal: 24,
            paddingTop: 46,
          }}
        >
          <AuthIllustration
            height={210}
            source={require('@/assets/images/svg8.svg')}
            width={210}
          />

          <View style={{ marginTop: 34, width: '100%' }}>
            <PrimaryAuthButton
              label="Use PIN instead"
              onPress={() => router.push('/pin-login')}
            />
          </View>

          <Pressable onPress={() => router.push('/recovery-entry')} style={{ marginTop: 28 }}>
            <Text
              className="font-inter"
              style={{ color: '#A7A4BE', fontSize: 15, lineHeight: 20 }}
            >
              Forgot PIN or lost device?
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthScreenFrame>
  );
}
