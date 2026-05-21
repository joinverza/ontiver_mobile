import React from 'react';
import { useRouter } from 'expo-router';
import {
  AUTH_COLORS,
  AuthScreenFrame,
  DarkFlowDecorations,
  FlowProgress,
  StatusBanner,
} from '@/components/auth/auth-ui';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Pressable, Text, View } from '@/src/tw';

type CaptureState = 'front' | 'blur' | 'glare' | 'dark' | 'front-ok' | 'back';

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=420&fit=crop';

export default function DocumentCaptureScreen() {
  const router = useRouter();
  const [state, setState] = React.useState<CaptureState>('front');

  const bannerMessage =
    state === 'blur'
      ? 'Image too blurry - try again.'
      : state === 'glare'
        ? 'Too much glare - move to shade.'
        : state === 'dark'
          ? 'Too dark - find better lighting.'
          : '';

  return (
    <AuthScreenFrame title="">
      <View style={{ backgroundColor: AUTH_COLORS.navy, flex: 1, overflow: 'hidden' }}>
        <DarkFlowDecorations />
        <View style={{ paddingHorizontal: 18, paddingTop: 16 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 18 }}>
            <Pressable onPress={() => router.back()}>
              <IconSymbol color="#FFFFFF" name="chevron.left" size={20} />
            </Pressable>
            <FlowProgress current={2} light />
          </View>

          {(state === 'blur' || state === 'glare' || state === 'dark') ? (
            <View style={{ marginTop: 18 }}>
              <StatusBanner
                message={bannerMessage}
                onClose={() => setState('front')}
                tone="error"
              />
            </View>
          ) : null}

          <Text
            className="font-inter text-center"
            style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 20, marginTop: 32 }}
          >
            {state === 'back'
              ? 'Now flip your ID and capture the back.'
              : 'Position front of ID inside the frame'}
          </Text>

          <View style={{ alignItems: 'center', marginTop: 26 }}>
            {state === 'front' || state === 'back' ? (
              <FrameCard />
            ) : (
              <CapturedCard />
            )}
          </View>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 28,
            }}
          >
            {state === 'front' || state === 'back' ? (
              <Pressable
                onPress={() => {
                  if (state === 'front') {
                    setState('blur');
                  } else {
                    router.push('/verify-info');
                  }
                }}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 999,
                  height: 56,
                  justifyContent: 'center',
                  width: 56,
                }}
              >
                <View
                  style={{
                    backgroundColor: AUTH_COLORS.navy,
                    borderRadius: 999,
                    height: 20,
                    width: 20,
                  }}
                />
              </Pressable>
            ) : (
              <View style={{ alignItems: 'center', flexDirection: 'row', gap: 36 }}>
                <ActionCircle
                  icon="arrow.uturn.left"
                  onPress={() => {
                    if (state === 'blur') setState('glare');
                    else if (state === 'glare') setState('dark');
                    else if (state === 'dark') setState('front-ok');
                    else setState('front');
                  }}
                />
                <ActionCircle
                  icon="checkmark"
                  onPress={() => {
                    if (state === 'front-ok') {
                      setState('back');
                    } else {
                      router.push('/verify-info');
                    }
                  }}
                />
              </View>
            )}
          </View>

          <Text
            className="font-inter text-center"
            style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 20, marginTop: 28 }}
          >
            Make sure to have:
          </Text>
          <Text
            className="font-inter text-center"
            style={{ color: '#FFFFFF', fontSize: 14, lineHeight: 20, marginTop: 4 }}
          >
            Good lighting, Flat surface and No glare
          </Text>
        </View>
      </View>
    </AuthScreenFrame>
  );
}

function FrameCard() {
  return (
    <View
      style={{
        borderRadius: 22,
        height: 270,
        overflow: 'hidden',
        width: 230,
      }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 22,
          flex: 1,
        }}
      />
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
    </View>
  );
}

function CapturedCard() {
  return (
    <View
      style={{
        borderRadius: 22,
        height: 270,
        overflow: 'hidden',
        width: 230,
      }}
    >
      <Image contentFit="cover" source={{ uri: SAMPLE_IMAGE }} style={{ flex: 1 }} />
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
    </View>
  );
}

function Corner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const vertical = position.includes('top') ? { top: 14 } : { bottom: 14 };
  const horizontal = position.includes('left') ? { left: 14 } : { right: 14 };
  const style =
    position === 'top-left'
      ? { borderLeftWidth: 6, borderTopWidth: 6, borderTopLeftRadius: 12 }
      : position === 'top-right'
        ? { borderRightWidth: 6, borderTopWidth: 6, borderTopRightRadius: 12 }
        : position === 'bottom-left'
          ? { borderBottomWidth: 6, borderLeftWidth: 6, borderBottomLeftRadius: 12 }
          : { borderBottomWidth: 6, borderRightWidth: 6, borderBottomRightRadius: 12 };

  return (
    <View
      style={{
        borderColor: AUTH_COLORS.navy,
        height: 38,
        position: 'absolute',
        width: 38,
        ...style,
        ...vertical,
        ...horizontal,
      }}
    />
  );
}

function ActionCircle({
  icon,
  onPress,
}: {
  icon: React.ComponentProps<typeof IconSymbol>['name'];
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 999,
        height: 56,
        justifyContent: 'center',
        width: 56,
      }}
    >
      <IconSymbol color={AUTH_COLORS.navy} name={icon} size={28} />
    </Pressable>
  );
}
