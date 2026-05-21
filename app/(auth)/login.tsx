import React from 'react';
import { useRouter } from 'expo-router';
import {
  AuthCheckbox,
  AuthField,
  AuthScreenFrame,
  AuthSheetScroll,
  FooterPrompt,
  PrimaryAuthButton,
  SocialAuthRow,
} from '@/components/auth/auth-ui';
import { View } from '@/src/tw';

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const trimmedEmail = email.trim().toLowerCase();

  const emailError =
    submitted && !isEmailValid(trimmedEmail) ? 'Enter a valid email address' : '';
  const passwordError =
    submitted && password.length > 0 && password.length < 8
      ? 'Password must be at least 8 characters'
      : '';

  const isFormComplete =
    isEmailValid(trimmedEmail) && password.length >= 8 && acceptedTerms;

  const handleSubmit = () => {
    setSubmitted(true);

    if (!isFormComplete) {
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <AuthScreenFrame showBackButton title="Log in">
      <AuthSheetScroll>
        <View style={{ flex: 1 }}>
          <AuthField
            autoComplete="email"
            error={emailError}
            keyboardType="email-address"
            label="Email Address"
            onChangeText={setEmail}
            placeholder="yourname@email.com"
            value={email}
          />

          <AuthField
            autoComplete="current-password"
            error={passwordError}
            label="Password"
            onChangeText={setPassword}
            onToggleVisibility={() => setShowPassword((value) => !value)}
            placeholder="Min. 8 characters"
            secureTextEntry
            value={password}
            visible={showPassword}
          />

          <AuthCheckbox checked={acceptedTerms} onPress={() => setAcceptedTerms((value) => !value)} />

          <View style={{ gap: 24, marginTop: 24 }}>
            <PrimaryAuthButton disabled={!isFormComplete} label="Login" onPress={handleSubmit} />
            <SocialAuthRow />
          </View>

          <View style={{ marginTop: 'auto', paddingTop: 28 }}>
            <FooterPrompt
              actionLabel="Create Account"
              onPress={() => router.push('/register')}
              prompt="New to Vault?"
            />
          </View>
        </View>
      </AuthSheetScroll>
    </AuthScreenFrame>
  );
}
