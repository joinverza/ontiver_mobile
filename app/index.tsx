import React from 'react';
import { Redirect } from 'expo-router';
import { AnimatedSplash } from '@/components/animated-splash';

export default function Index() {
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <AnimatedSplash onFinish={() => setShowSplash(false)} />;
  }

  return <Redirect href="/onboarding" />;
}
