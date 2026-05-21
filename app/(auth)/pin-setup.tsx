import React from 'react';
import { useRouter } from 'expo-router';
import { TextInput as RNTextInput } from 'react-native';
import { AUTH_COLORS, PinCells } from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { Text, View } from '@/src/tw';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PinSetupScreen() {
  const insets = useSafeAreaInsets();
  const inputRef = React.useRef<RNTextInput>(null);
  const router = useRouter();
  const [pin, setPin] = React.useState('');
  const [confirmPin, setConfirmPin] = React.useState('');
  const [activeField, setActiveField] = React.useState<'pin' | 'confirm'>('pin');
  const [hasMismatch, setHasMismatch] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [activeField]);

  React.useEffect(() => {
    if (pin.length === 6 && activeField === 'pin') {
      setActiveField('confirm');
    }
  }, [activeField, pin.length]);

  React.useEffect(() => {
    if (confirmPin.length < 6) {
      return;
    }

    if (confirmPin !== pin) {
      setHasMismatch(true);
      return;
    }

    setHasMismatch(false);

    const timeoutId = setTimeout(() => {
      router.replace('/id-type');
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [confirmPin, pin, router]);

  const handleChange = (nextValue: string) => {
    const sanitized = nextValue.replace(/\D/g, '').slice(0, 6);

    if (activeField === 'pin') {
      setPin(sanitized);

      if (hasMismatch) {
        setHasMismatch(false);
      }

      return;
    }

    setConfirmPin(sanitized);

    if (hasMismatch) {
      setHasMismatch(false);
    }
  };

  const inputValue = activeField === 'pin' ? pin : confirmPin;

  return (
    <Screen className="bg-white" safe={false}>
      <View
        style={{
          flex: 1,
          paddingBottom: Math.max(insets.bottom, 24) + 24,
          paddingHorizontal: 24,
          paddingTop: insets.top + 18,
        }}
      >
        <Text
          className="font-inter font-extrabold"
          style={{ color: AUTH_COLORS.ink, fontSize: 22, lineHeight: 28, marginTop: 44 }}
        >
          Create Your 6-Digit PIN
        </Text>
        <Text
          className="font-inter"
          style={{ color: '#4D4A68', fontSize: 16, lineHeight: 22, marginTop: 8 }}
        >
          This PIN is your backup access method. Keep it private and memorable.
        </Text>

        <View style={{ gap: 24, marginTop: 26 }}>
          <View>
            <Text
              className="font-inter"
              style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginBottom: 12 }}
            >
              Input Pin
            </Text>
            <PinCells onPress={() => inputRef.current?.focus()} value={pin} />
          </View>

          <View>
            <Text
              className="font-inter"
              style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginBottom: 12 }}
            >
              Confirm Pin
            </Text>
            <PinCells
              error={hasMismatch}
              onPress={() => {
                setActiveField('confirm');
                inputRef.current?.focus();
              }}
              value={confirmPin}
            />
            {hasMismatch ? (
              <Text
                selectable
                className="font-inter"
                style={{
                  color: AUTH_COLORS.error,
                  fontSize: 12,
                  lineHeight: 16,
                  marginTop: 8,
                }}
              >
                PINs don&apos;t match. Try again.
              </Text>
            ) : null}
          </View>
        </View>

        <View style={{ marginTop: 'auto' }}>
          <Text
            className="font-inter text-center"
            style={{ color: '#A2A1B6', fontSize: 14, lineHeight: 20 }}
          >
            {activeField === 'pin'
              ? 'Enter your new 6-digit PIN.'
              : 'Confirm the same PIN to continue.'}
          </Text>
        </View>

        <RNTextInput
          autoFocus
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={handleChange}
          ref={inputRef}
          style={{ height: 1, opacity: 0, position: 'absolute', width: 1 }}
          textContentType="oneTimeCode"
          value={inputValue}
        />
      </View>
    </Screen>
  );
}
