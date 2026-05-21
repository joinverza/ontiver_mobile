import React from 'react';
import { View, Text, Pressable, MotiView, MotiText } from '@/src/tw';
import { Screen } from '@/components/screen';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

const ID_TYPES = [
  { id: 'nin', title: 'National Identity Number (NIN) Card', icon: 'person.crop.rectangle' },
  { id: 'passport', title: 'Nigerian International Passport', icon: 'airplane' },
  { id: 'driver', title: "Driver's Licence", icon: 'car.fill' },
];

export default function IdTypeScreen() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <Screen className="bg-[#F5F6FA] flex-1 pt-12">
      <View className="px-6 flex-1">
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="flex-row items-center mb-10"
        >
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-white rounded-full">
            <IconSymbol name="chevron.left" size={20} color="#0F172A" />
          </Pressable>
        </MotiView>

        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="text-slate-900 font-inter text-3xl font-extrabold mb-2"
        >
          Select ID Type
        </MotiText>

        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100 }}
          className="text-slate-600 font-inter text-base mb-8"
        >
          Choose the document you want to scan
        </MotiText>

        <View className="gap-4">
          {ID_TYPES.map((item, index) => {
            const isSelected = selected === item.id;
            return (
              <MotiView
                key={item.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 200 + index * 100 }}
              >
                <Pressable
                  onPress={() => setSelected(item.id)}
                  className={`flex-row items-center p-5 rounded-2xl border-2 bg-white ${
                    isSelected ? 'border-brand-violet' : 'border-transparent'
                  }`}
                >
                  <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${isSelected ? 'bg-brand-violet/10' : 'bg-slate-100'}`}>
                    <IconSymbol name={item.icon as any} size={24} color={isSelected ? '#6C3FF5' : '#64748B'} />
                  </View>
                  <View className="flex-1 pr-4">
                    <Text className={`font-semibold text-base ${isSelected ? 'text-brand-violet' : 'text-slate-800'}`}>
                      {item.title}
                    </Text>
                  </View>
                  <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-brand-violet' : 'border-slate-300'}`}>
                    {isSelected && <View className="w-3 h-3 rounded-full bg-brand-violet" />}
                  </View>
                </Pressable>
              </MotiView>
            );
          })}
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 600 }}
          className="mt-auto mb-8"
        >
          <Pressable
            disabled={!selected}
            onPress={() => router.push('/capture')}
            className={`py-4 rounded-full items-center ${
              selected ? 'bg-slate-900' : 'bg-slate-300'
            }`}
          >
            <Text className={`font-inter font-bold text-lg ${selected ? 'text-white' : 'text-slate-500'}`}>
              Continue
            </Text>
          </Pressable>
        </MotiView>
      </View>
    </Screen>
  );
}
