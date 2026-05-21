import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, MotiView, MotiText } from '@/src/tw';
import { Screen } from '@/components/screen';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function VerifyInfoScreen() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    fullName: 'Grace Henderson George',
    dob: '24th March, 1993',
    idNumber: 'A123456789',
    expiryDate: '12th Jan, 2030',
    gender: 'Female',
    nationality: 'Nigerian',
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fields: { label: string; field: keyof typeof formData }[] = [
    { label: 'Full Name', field: 'fullName' },
    { label: 'Date of Birth', field: 'dob' },
    { label: 'ID Number', field: 'idNumber' },
    { label: 'Expiry Date', field: 'expiryDate' },
    { label: 'Gender', field: 'gender' },
    { label: 'Nationality', field: 'nationality' },
  ];

  return (
    <Screen className="bg-[#F5F6FA] flex-1 pt-12">
      <View className="px-6 flex-row items-center mb-6">
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-white rounded-full">
          <IconSymbol name="chevron.left" size={20} color="#0F172A" />
        </Pressable>
        <View className="flex-1 ml-4">
          <View className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden flex-row">
            <View className="bg-brand-violet w-3/4 h-full" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <MotiText
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="text-slate-900 font-inter text-2xl font-extrabold mb-2"
        >
          Verify extracted info
        </MotiText>
        <MotiText
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100 }}
          className="text-slate-600 font-inter text-base mb-8"
        >
          Ensure the details below match your document.
        </MotiText>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
          className="mb-8"
        >
          {fields.map(({ label, field }) => (
            <View key={field} className="mb-4">
              <Text className="text-slate-500 text-sm mb-1 ml-1">{label}</Text>
              <View className="flex-row items-center bg-white rounded-xl border border-slate-200 px-4 py-3">
                <TextInput
                  value={formData[field]}
                  onChangeText={(v) => updateField(field, v)}
                  className="flex-1 text-slate-900 font-medium text-base"
                />
                <IconSymbol name="pencil" size={16} color="#94A3B8" />
              </View>
            </View>
          ))}
        </MotiView>
      </ScrollView>

      <View className="px-6 pb-8 pt-4 bg-[#F5F6FA]">
        <Pressable onPress={() => router.push('/liveness')} className="bg-slate-900 py-4 rounded-full items-center mb-3">
          <Text className="text-white font-bold text-lg">Confirm & Continue</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="py-4 rounded-full items-center">
          <Text className="text-slate-600 font-bold text-base">Retake photos</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
