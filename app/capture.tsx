import React from 'react';
import { View, Text, Pressable, MotiView, AnimatedView } from '@/src/tw';
import { Screen } from '@/components/screen';
import { useSharedValue, useAnimatedStyle, withSpring, withSequence, withDelay, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function DocumentCaptureScreen() {
  const router = useRouter();
  const [step, setStep] = React.useState<'front' | 'back'>('front');
  
  const toastTranslateY = useSharedValue(-100);
  
  const toastStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: toastTranslateY.value }],
      position: 'absolute' as const,
      top: 60,
      left: 20,
      right: 20,
      zIndex: 100,
      backgroundColor: 'rgba(239, 68, 68, 0.9)',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    };
  });

  const showToast = () => {
    toastTranslateY.value = withSequence(
      withSpring(20, { damping: 15 }),
      withDelay(2000, withTiming(-100, { duration: 300 }))
    );
  };

  const handleCapture = () => {
    if (step === 'front') {
      showToast();
      setTimeout(() => setStep('back'), 1000);
    } else {
      router.push('/verify-info');
    }
  };

  return (
    <Screen className="bg-slate-900 flex-1 pt-12">
      <AnimatedView style={toastStyle}>
        <IconSymbol name="exclamationmark.triangle.fill" size={20} color="white" />
        <Text className="text-white ml-3 font-semibold flex-1">
          {step === 'front' ? 'Keep camera steady' : 'Capturing back of document...'}
        </Text>
      </AnimatedView>

      <View className="px-6 flex-1">
        {/* Header with Progress Bar */}
        <View className="flex-row items-center mb-10">
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-white/10 rounded-full">
            <IconSymbol name="chevron.left" size={20} color="white" />
          </Pressable>
          
          <View className="flex-1 flex-row ml-6 gap-2">
            {[0, 1, 2, 3].map((i) => {
              const isActive = step === 'front' ? i <= 1 : i <= 2;
              return (
                <View 
                  key={i} 
                  className={`flex-1 h-1.5 rounded-full ${isActive ? 'bg-brand-violet' : 'bg-white/20'}`} 
                />
              );
            })}
          </View>
        </View>

        <View className="items-center mb-8">
          <Text className="text-white font-inter text-2xl font-bold mb-2">
            Scan the {step} of ID
          </Text>
          <Text className="text-white/60 text-center">
            Position your document within the frame and ensure all details are clear
          </Text>
        </View>

        {/* Viewfinder Area */}
        <View className="flex-1 items-center justify-center mb-12">
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-full aspect-[4/3] rounded-3xl border-2 border-white/20 relative overflow-hidden"
          >
            <View className="absolute inset-0 bg-slate-800/80" />
            
            {/* Corner Markers */}
            <View className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-brand-violet rounded-tl-xl" />
            <View className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-brand-violet rounded-tr-xl" />
            <View className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-brand-violet rounded-bl-xl" />
            <View className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-brand-violet rounded-br-xl" />
            
            <View className="absolute inset-0 items-center justify-center opacity-30">
               <IconSymbol name="person.text.rectangle" size={100} color="white" />
            </View>
          </MotiView>
        </View>

        {/* Capture Button */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
          className="items-center mb-12"
        >
          <Pressable
            onPress={handleCapture}
            className="w-20 h-20 rounded-full border-4 border-brand-violet items-center justify-center p-1"
          >
            <View className="w-full h-full bg-white rounded-full" />
          </Pressable>
        </MotiView>
      </View>
    </Screen>
  );
}
