import React from 'react';
import { View, Text, Pressable, MotiView, MotiText } from '@/src/tw';
import { Screen } from '@/components/screen';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen className="bg-[#F5F6FA] flex-1">
      <View className="flex-1 justify-center px-6">
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 100 }}
          className="items-center justify-center mb-8"
        >
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center">
            <IconSymbol name="shield.fill" size={48} color="#007AFF" />
          </View>
        </MotiView>

        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
          className="text-slate-900 font-inter text-3xl font-extrabold text-center mb-4"
        >
          Verify your identity
        </MotiText>

        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
          className="text-slate-600 font-inter text-base text-center mb-10"
        >
          To protect your account, we need to verify it's really you.
        </MotiText>

        <View className="gap-6 mb-12 px-2">
          {[
            { title: 'Government-issued ID', icon: 'person.text.rectangle' },
            { title: 'Good lighting', icon: 'sun.max.fill' },
            { title: 'About 5 minutes', icon: 'clock.fill' },
          ].map((item, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 400 + index * 100 }}
              className="flex-row items-center gap-4"
            >
              <View className="w-10 h-10 bg-slate-200 rounded-full items-center justify-center">
                <IconSymbol name={item.icon as any} size={20} color="#0F172A" />
              </View>
              <Text className="text-slate-900 text-lg font-medium">{item.title}</Text>
            </MotiView>
          ))}
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 800 }}
          className="mt-auto mb-8"
        >
          <Pressable
            onPress={() => router.push('/id-type')}
            className="bg-slate-900 py-4 rounded-full items-center"
          >
            <Text className="text-white font-inter font-bold text-lg">Let's Begin</Text>
          </Pressable>
        </MotiView>
      </View>
    </Screen>
  );
}
