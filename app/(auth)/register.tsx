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

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const trimmedEmail = email.trim().toLowerCase();
  const emailHasSpace = /\s/.test(email);
  const passwordStrength =
    password.length === 0 ? 'Empty' : password.length >= 8 ? 'Strong' : 'Weak';
  const passwordTone =
    password.length === 0 ? 'default' : password.length >= 8 ? 'success' : 'error';

  const errors = {
    fullName: submitted && fullName.trim().length === 0 ? 'Full name is required' : '',
    email:
      submitted && emailHasSpace
        ? "Email can't contain spaces"
        : submitted && !isEmailValid(trimmedEmail)
          ? 'Enter a valid email address'
          : '',
    password:
      submitted && password.length > 0 && password.length < 8
        ? 'Password must be at least 8 characters'
        : '',
    confirmPassword:
      submitted && confirmPassword.length > 0 && confirmPassword !== password
        ? 'Password does not match'
        : '',
  };

  const isFormComplete =
    fullName.trim().length > 0 &&
    isEmailValid(trimmedEmail) &&
    password.length >= 8 &&
    confirmPassword === password &&
    acceptedTerms;

  const handleSubmit = () => {
    setSubmitted(true);

    if (!isFormComplete) {
      return;
    }

    router.push({
      params: { email: trimmedEmail },
      pathname: '/otp-verification',
    });
  };

  return (
    <AuthScreenFrame title="Create Account">
      <AuthSheetScroll>
        <View style={{ flex: 1, gap: 2 }}>
          <AuthField
            autoCapitalize="words"
            autoComplete="name"
            error={errors.fullName}
            label="Full Name"
            onChangeText={setFullName}
            placeholder="e.g. Adaeze Okonkwo"
            value={fullName}
          />

          <AuthField
            autoComplete="email"
            error={errors.email}
            keyboardType="email-address"
            label="Email Address"
            onChangeText={setEmail}
            placeholder="yourname@email.com"
            value={email}
          />

          <AuthField
            autoComplete="new-password"
            error={errors.password}
            helperText={passwordStrength}
            helperTone={passwordTone}
            label="Password"
            onChangeText={setPassword}
            onToggleVisibility={() => setShowPassword((value) => !value)}
            placeholder="Min. 8 characters"
            secureTextEntry
            value={password}
            visible={showPassword}
          />

          <AuthField
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            onToggleVisibility={() => setShowConfirmPassword((value) => !value)}
            placeholder="Re-enter password"
            secureTextEntry
            value={confirmPassword}
            visible={showConfirmPassword}
          />

          <AuthCheckbox checked={acceptedTerms} onPress={() => setAcceptedTerms((value) => !value)} />

          <View style={{ gap: 24, marginTop: 20 }}>
            <PrimaryAuthButton
              disabled={!isFormComplete}
              label="Create Account"
              onPress={handleSubmit}
            />
            <SocialAuthRow />
          </View>

          <View style={{ marginTop: 'auto', paddingTop: 28 }}>
            <FooterPrompt
              actionLabel="Log in"
              onPress={() => router.push('/login')}
              prompt="Already have an account?"
            />
          </View>
        </View>
      </AuthSheetScroll>
    </AuthScreenFrame>
  );
}
