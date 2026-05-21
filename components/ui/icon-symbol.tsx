// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<string, ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'house': 'home',
  'paperplane.fill': 'send',
  'square.and.arrow.up': 'ios-share',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.up': 'keyboard-arrow-up',
  'chevron.down': 'keyboard-arrow-down',
  'bell.fill': 'notifications',
  'exclamationmark.circle.fill': 'error',
  'exclamationmark.triangle.fill': 'warning',
  'person.crop.rectangle.fill': 'badge',
  'person.crop.rectangle': 'badge',
  'person.text.rectangle.fill': 'badge',
  'checkmark.seal.fill': 'verified',
  'plus.circle.fill': 'add-circle',
  'checkmark': 'check',
  'shield.fill': 'security',
  'person.text.rectangle': 'badge',
  'sun.max.fill': 'wb-sunny',
  'clock.fill': 'schedule',
  'clock.arrow.circlepath': 'history',
  'airplane': 'flight',
  'car.fill': 'directions-car',
  'pencil': 'edit',
  'face.dashed': 'face',
  'arrow.turn.down.left': 'undo',
  'arrow.turn.down.right': 'redo',
  'arrow.left': 'arrow-back',
  'arrow.up.right': 'north-east',
  'face.smiling': 'sentiment-satisfied',
  'sparkles': 'auto-awesome',
  'checkmark.shield.fill': 'verified-user',
  'person.fill': 'person',
  'arrow.right': 'arrow-forward',
  'gearshape.fill': 'settings',
  'gearshape': 'settings',
  'checkmark.circle.fill': 'check-circle',
  'lock.fill': 'lock',
  'lock.shield.fill': 'lock',
  'qrcode.viewfinder': 'qr-code-scanner',
  'doc.text.magnifyingglass': 'description',
  'ellipsis.circle': 'more-horiz',
  'ellipsis': 'more-horiz',
  'trash': 'delete',
  'circle': 'radio-button-unchecked',
  'circle.inset.filled': 'radio-button-checked',
  'xmark.circle.fill': 'cancel',
  'xmark': 'close',
  'questionmark.circle': 'help-outline',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
