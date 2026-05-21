import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  AUTH_COLORS,
  AuthScreenFrame,
  FlowProgress,
  PrimaryAuthButton,
  SecondaryAuthButton,
  SideDecorations,
  StatusBanner,
  VaultaShieldArt,
} from '@/components/auth/auth-ui';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Pressable, Text, View } from '@/src/tw';

const ID_TYPES = [
  { id: 'nin', title: 'National Identity Number (NIN) Card' },
  { id: 'passport', title: 'Nigerian / International Passport' },
  { id: 'driver', title: "Driver's Licence" },
];

export default function IdTypeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ screen?: string | string[] }>();
  const screen = Array.isArray(params.screen) ? params.screen[0] : params.screen;
  const [selected, setSelected] = React.useState<string | null>(screen === 'choose' ? 'nin' : null);

  if (screen !== 'choose') {
    return (
      <AuthScreenFrame title="">
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <SideDecorations />
          <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
            <Text
              className="font-inter font-extrabold text-center"
              style={{ color: AUTH_COLORS.ink, fontSize: 24, lineHeight: 30 }}
            >
              Verify Your Identity
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#53506D', fontSize: 15, lineHeight: 22, marginTop: 8 }}
            >
              Takes 3-5 minutes. You&apos;ll only do this once.
            </Text>

            <View style={{ alignItems: 'center', marginTop: 28 }}>
              <VaultaShieldArt size={168} variant="check" />
            </View>

            <Text
              className="font-inter font-extrabold"
              style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 20, marginTop: 18 }}
            >
              What you need:
            </Text>

            <View style={{ gap: 12, marginTop: 14 }}>
              <ChecklistItem text="Government-issued ID." />
              <ChecklistItem text="Good lighting for your selfie." />
              <ChecklistItem text="About 5 minutes of your time." />
            </View>

            <View style={{ marginTop: 16 }}>
              <StatusBanner
                message="Your documents are never stored on Vaulta servers. Only a verified credential is saved - encrypted, on this device."
                tone="success"
              />
            </View>

            <View style={{ gap: 12, marginTop: 'auto', paddingTop: 28 }}>
              <PrimaryAuthButton label="Let's Begin" onPress={() => router.replace('/id-type?screen=choose')} />
              <SecondaryAuthButton label="Not now" onPress={() => router.replace('/(tabs)?mode=full')} />
            </View>
          </View>
        </View>
      </AuthScreenFrame>
    );
  }

  return (
    <AuthScreenFrame showBackButton title="">
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <SideDecorations />
        <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 18 }}>
            <FlowProgress current={1} />
          </View>

          <Text
            className="font-inter font-extrabold text-center"
            style={{ color: AUTH_COLORS.ink, fontSize: 24, lineHeight: 30, marginTop: 22 }}
          >
            Choose Your ID Type
          </Text>

          <View style={{ gap: 10, marginTop: 28 }}>
            {ID_TYPES.map((item) => {
              const active = selected === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => setSelected(item.id)}
                  style={{
                    alignItems: 'center',
                    borderColor: active ? AUTH_COLORS.navy : '#ECEAF5',
                    borderCurve: 'continuous',
                    borderRadius: 14,
                    borderWidth: 1,
                    flexDirection: 'row',
                    minHeight: 52,
                    paddingHorizontal: 14,
                  }}
                >
                  <IconSymbol
                    color={active ? AUTH_COLORS.navy : '#807E98'}
                    name={active ? 'circle.inset.filled' : 'circle'}
                    size={20}
                  />
                  <Text
                    className="font-inter"
                    style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 20, marginLeft: 10 }}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ marginTop: 22 }}>
            <PrimaryAuthButton
              disabled={!selected}
              label="Continue"
              onPress={() => router.push('/capture')}
            />
          </View>
        </View>
      </View>
    </AuthScreenFrame>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <IconSymbol color={AUTH_COLORS.ink} name="checkmark.circle.fill" size={18} />
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 20, marginLeft: 8 }}
      >
        {text}
      </Text>
    </View>
  );
}
