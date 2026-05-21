import React from 'react';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  AUTH_COLORS,
  AuthIllustration,
  PrimaryAuthButton,
  SecondaryAuthButton,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { Pressable, Text, View } from '@/src/tw';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PasskeySetupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showDetails, setShowDetails] = React.useState(false);

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
          Create Your Passkey
        </Text>
        <Text
          className="font-inter"
          style={{ color: '#4D4A68', fontSize: 16, lineHeight: 22, marginTop: 8 }}
        >
          A passkey is more secure than a password and you never have to remember it. It lives on
          this device.
        </Text>

        <View style={{ alignItems: 'center', marginTop: 72 }}>
          <AuthIllustration
            height={220}
            source={require('@/assets/images/Layer_1.svg')}
            width={220}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => setShowDetails((value) => !value)}
          style={{ alignItems: 'center', flexDirection: 'row', gap: 10, marginTop: 36 }}
        >
          <MaterialCommunityIcons color={AUTH_COLORS.ink} name="help-circle-outline" size={20} />
          <Text
            className="font-inter"
            style={{ color: AUTH_COLORS.ink, fontSize: 18, lineHeight: 22 }}
          >
            What is a passkey?
          </Text>
          <MaterialCommunityIcons
            color={AUTH_COLORS.ink}
            name={showDetails ? 'chevron-up' : 'chevron-down'}
            size={18}
          />
        </Pressable>

        {showDetails ? (
          <Text
            className="font-inter"
            style={{ color: '#4D4A68', fontSize: 14, lineHeight: 20, marginTop: 12 }}
          >
            Your phone stores the passkey securely and uses biometrics or device unlock to confirm
            it&apos;s you when you sign in.
          </Text>
        ) : null}

        <View style={{ gap: 12, marginTop: 'auto' }}>
          <PrimaryAuthButton
            label="Create Passkey"
            onPress={() => router.push('/pin-setup')}
          />
          <SecondaryAuthButton label="Maybe Later" onPress={() => router.push('/pin-setup')} />
        </View>
      </View>
    </Screen>
  );
}
