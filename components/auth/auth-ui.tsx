import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, TextInput, View } from '@/src/tw';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { KeyboardTypeOptions, TextInputProps, ViewStyle } from 'react-native';

export const AUTH_COLORS = {
  navy: '#09054F',
  ink: '#1D184E',
  muted: '#8F8DAA',
  border: '#E4E3EF',
  disabled: '#A7A5C2',
  error: '#FF6B6B',
  success: '#A8E63D',
  successDeep: '#7CB518',
  toast: '#B3F238',
  soft: '#F7F7FB',
};

type AuthScreenFrameProps = {
  children: React.ReactNode;
  showBackButton?: boolean;
  title: string;
};

export function AuthScreenFrame({
  children,
  showBackButton = false,
  title,
}: AuthScreenFrameProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: AUTH_COLORS.navy }}>
      <View
        style={{
          paddingTop: insets.top + 14,
          paddingBottom: 24,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 44 }}>
          {showBackButton ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              style={{
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                width: 40,
              }}
            >
              <IconSymbol color="#FFFFFF" name="chevron.left" size={20} />
            </Pressable>
          ) : null}

          <Text
            className="font-inter font-extrabold text-white"
            style={{ fontSize: 18, lineHeight: 24 }}
          >
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
}

type AuthSheetScrollProps = {
  children: React.ReactNode;
  contentStyle?: ViewStyle;
};

export function AuthSheetScroll({ children, contentStyle }: AuthSheetScrollProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 32,
        },
        contentStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {children}
    </ScrollView>
  );
}

type AuthFieldProps = {
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  error?: string;
  helperText?: string;
  helperTone?: 'default' | 'error' | 'success';
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (value: string) => void;
  onToggleVisibility?: () => void;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  visible?: boolean;
};

export function AuthField({
  autoCapitalize = 'none',
  autoComplete,
  error,
  helperText,
  helperTone = 'default',
  keyboardType,
  label,
  onChangeText,
  onToggleVisibility,
  placeholder,
  secureTextEntry = false,
  value,
  visible = false,
}: AuthFieldProps) {
  const accentColor = error
    ? AUTH_COLORS.error
    : helperTone === 'success'
      ? AUTH_COLORS.success
      : '#C9C9D8';

  const helperColor =
    helperTone === 'error'
      ? AUTH_COLORS.error
      : helperTone === 'success'
        ? AUTH_COLORS.successDeep
        : AUTH_COLORS.muted;

  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginBottom: 10 }}
      >
        {label}
      </Text>

      <View
        style={{
          alignItems: 'center',
          borderColor: error ? AUTH_COLORS.error : AUTH_COLORS.border,
          borderCurve: 'continuous',
          borderRadius: 14,
          borderWidth: 1,
          flexDirection: 'row',
          minHeight: 56,
          paddingHorizontal: 18,
        }}
      >
        <TextInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B3B2C4"
          secureTextEntry={secureTextEntry && !visible}
          style={{
            color: AUTH_COLORS.ink,
            flex: 1,
            fontFamily: 'Inter',
            fontSize: 15,
            lineHeight: 20,
            paddingVertical: 14,
          }}
          value={value}
        />

        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={onToggleVisibility}
            style={{ paddingLeft: 12 }}
          >
            <MaterialCommunityIcons
              color={AUTH_COLORS.ink}
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={22}
            />
          </Pressable>
        ) : null}
      </View>

      {helperText ? (
        <View style={{ marginTop: 8 }}>
          <View
            style={{
              backgroundColor: accentColor,
              borderRadius: 999,
              height: 1.5,
              marginBottom: 4,
              width: '100%',
            }}
          />
          <Text
            selectable
            className="font-inter"
            style={{ color: helperColor, fontSize: 12, lineHeight: 16 }}
          >
            {helperText}
          </Text>
        </View>
      ) : error ? (
        <Text
          selectable
          className="font-inter"
          style={{
            color: AUTH_COLORS.error,
            fontSize: 12,
            lineHeight: 16,
            marginTop: 6,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

type AuthCheckboxProps = {
  checked: boolean;
  onPress: () => void;
};

export function AuthCheckbox({ checked, onPress }: AuthCheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      onPress={onPress}
      style={{ alignItems: 'flex-start', flexDirection: 'row', gap: 10 }}
    >
      <View
        style={{
          alignItems: 'center',
          borderColor: AUTH_COLORS.ink,
          borderRadius: 6,
          borderWidth: 1.5,
          height: 20,
          justifyContent: 'center',
          marginTop: 2,
          width: 20,
        }}
      >
        {checked ? <MaterialCommunityIcons color={AUTH_COLORS.ink} name="check" size={16} /> : null}
      </View>

      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, flex: 1, fontSize: 14, lineHeight: 18 }}
      >
        I agree to Vaulta&apos;s Terms of Service and Privacy Policy.
      </Text>
    </Pressable>
  );
}

type ButtonProps = {
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

export function PrimaryAuthButton({ disabled = false, label, onPress }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: disabled ? AUTH_COLORS.disabled : AUTH_COLORS.navy,
        borderCurve: 'continuous',
        borderRadius: 12,
        height: 44,
        justifyContent: 'center',
      }}
    >
      <Text
        className="font-inter font-extrabold"
        style={{ color: '#FFFFFF', fontSize: 17, lineHeight: 22 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SecondaryAuthButton({ disabled = false, label, onPress }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: AUTH_COLORS.ink,
        borderCurve: 'continuous',
        borderRadius: 12,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
      }}
    >
      <Text
        className="font-inter font-extrabold"
        style={{ color: AUTH_COLORS.ink, fontSize: 17, lineHeight: 22 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SocialAuthRow() {
  return (
    <View style={{ gap: 18 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 }}>
        <View style={{ backgroundColor: '#8280A2', flex: 1, height: 1 }} />
        <Text
          className="font-inter"
          style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}
        >
          or continue with
        </Text>
        <View style={{ backgroundColor: '#8280A2', flex: 1, height: 1 }} />
      </View>

      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
        <SocialIconButton icon="google" />
        <SocialIconButton icon="apple" />
      </View>
    </View>
  );
}

function SocialIconButton({ icon }: { icon: 'apple' | 'google' }) {
  return (
    <Pressable
      accessibilityRole="button"
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#ECEBF3',
        borderCurve: 'continuous',
        borderRadius: 24,
        borderWidth: 1,
        boxShadow: '0 10px 20px rgba(9, 5, 79, 0.08)',
        height: 46,
        justifyContent: 'center',
        width: 46,
      }}
    >
      <MaterialCommunityIcons
        color={icon === 'google' ? '#EA4335' : '#111111'}
        name={icon}
        size={28}
      />
    </Pressable>
  );
}

type FooterPromptProps = {
  actionLabel: string;
  onPress: () => void;
  prompt: string;
};

export function FooterPrompt({ actionLabel, onPress, prompt }: FooterPromptProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}
      >
        {prompt}{' '}
      </Text>
      <Pressable accessibilityRole="button" onPress={onPress}>
        <Text
          className="font-inter"
          style={{ color: AUTH_COLORS.ink, fontSize: 15, fontWeight: '700', lineHeight: 20 }}
        >
          {actionLabel}
        </Text>
      </Pressable>
    </View>
  );
}

type OtpBoxesProps = {
  error?: boolean;
  length?: number;
  onPress: () => void;
  value: string;
};

export function OtpBoxes({
  error = false,
  length = 6,
  onPress,
  value,
}: OtpBoxesProps) {
  const digits = value.slice(0, length).split('');

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {Array.from({ length }).map((_, index) => {
          const filled = Boolean(digits[index]);

          return (
            <View
              key={`otp-${index}`}
              style={{
                alignItems: 'center',
                borderColor: error ? '#FFB5B5' : AUTH_COLORS.border,
                borderCurve: 'continuous',
                borderRadius: 12,
                borderWidth: 1.5,
                height: 52,
                justifyContent: 'center',
                width: 42,
              }}
            >
              <Text
                className="font-inter font-extrabold"
                style={{
                  color: error ? AUTH_COLORS.error : AUTH_COLORS.ink,
                  fontSize: 24,
                  lineHeight: 28,
                }}
              >
                {filled ? '*' : ''}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

type StatusToastProps = {
  message: string;
  onClose: () => void;
  visible: boolean;
};

export function StatusToast({ message, onClose, visible }: StatusToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: AUTH_COLORS.toast,
        borderCurve: 'continuous',
        borderRadius: 12,
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        position: 'absolute',
        right: 24,
        top: 12,
        zIndex: 20,
      }}
    >
      <MaterialCommunityIcons color="#163300" name="check-circle-outline" size={20} />
      <Text
        selectable
        className="font-inter"
        style={{ color: '#163300', fontSize: 12, lineHeight: 16, maxWidth: 160 }}
      >
        {message}
      </Text>
      <Pressable accessibilityRole="button" hitSlop={10} onPress={onClose}>
        <MaterialCommunityIcons color="#163300" name="close" size={20} />
      </Pressable>
    </View>
  );
}

type IllustrationProps = {
  height: number;
  source: number;
  width: number;
};

export function AuthIllustration({ height, source, width }: IllustrationProps) {
  return (
    <Image
      contentFit="contain"
      source={source}
      style={{ alignSelf: 'center', height, width }}
    />
  );
}

type FeatureBulletProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
};

export function FeatureBullet({ icon, text }: FeatureBulletProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
      <MaterialCommunityIcons color={AUTH_COLORS.ink} name={icon} size={20} />
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 18, lineHeight: 22 }}
      >
        {text}
      </Text>
    </View>
  );
}

type PinCellsProps = {
  error?: boolean;
  onPress: () => void;
  value: string;
};

export function PinCells({ error = false, onPress, value }: PinCellsProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {Array.from({ length: 6 }).map((_, index) => {
          const filled = Boolean(value[index]);

          return (
            <View
              key={`pin-${index}`}
              style={{
                alignItems: 'center',
                borderColor: error ? '#FFB5B5' : '#D9D9E6',
                borderCurve: 'continuous',
                borderRadius: 10,
                borderWidth: 1.5,
                height: 52,
                justifyContent: 'center',
                width: 44,
              }}
            >
              <Text
                className="font-inter font-extrabold"
                style={{
                  color: error ? AUTH_COLORS.error : AUTH_COLORS.ink,
                  fontSize: 24,
                  lineHeight: 28,
                }}
              >
                {filled ? '*' : ''}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

export function SideDecorations() {
  return (
    <>
      <View
        style={{
          backgroundColor: AUTH_COLORS.navy,
          borderRadius: 999,
          height: 240,
          position: 'absolute',
          right: -156,
          top: 80,
          width: 240,
        }}
      />
      <View
        style={{
          backgroundColor: AUTH_COLORS.navy,
          borderRadius: 999,
          bottom: 110,
          height: 220,
          left: -150,
          position: 'absolute',
          width: 220,
        }}
      />
    </>
  );
}
