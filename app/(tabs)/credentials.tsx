import React from 'react';
import { View, Text } from '@/src/tw';
import { Screen } from '@/components/screen';

export default function CredentialsScreen() {
  return (
    <Screen className="bg-[#F5F6FA] flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-slate-900 font-bold text-xl">Credentials</Text>
      </View>
    </Screen>
  );
}
