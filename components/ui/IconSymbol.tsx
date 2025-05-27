// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleProp, TextStyle } from 'react-native';

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

type IconMapping = {
  'house.fill': MaterialIconName;
  'house': MaterialIconName;
  'headphones': MaterialIconName;
  'cart.fill': MaterialIconName;
  'cart': MaterialIconName;
  'person.fill': MaterialIconName;
  'person': MaterialIconName;
  'paperplane.fill': MaterialIconName;
  'paperplane': MaterialIconName;
  'bell.fill': MaterialIconName;
  'moon.fill': MaterialIconName;
  'creditcard.fill': MaterialIconName;
  'location.fill': MaterialIconName;
  'chevron.right': MaterialIconName;
  'chevron.left.forwardslash.chevron.right': MaterialIconName;
  'heart.fill': MaterialIconName;
  'heart': MaterialIconName;
  'star.fill': MaterialIconName;
  'star': MaterialIconName;
  'magnifyingglass': MaterialIconName;
  'line.3.horizontal.decrease.circle': MaterialIconName;
  'arrow.up.arrow.down': MaterialIconName;
  'checkmark': MaterialIconName;
  'minus': MaterialIconName;
  'plus': MaterialIconName;
  'trash': MaterialIconName;
  'sparkles': MaterialIconName;
  'arrow.right.square.fill': MaterialIconName;
};

const MAPPING: IconMapping = {
  'house.fill': 'home',
  'house': 'home',
  'headphones': 'headphones',
  'cart.fill': 'shopping-cart',
  'cart': 'shopping-cart',
  'person.fill': 'person',
  'person': 'person',
  'paperplane.fill': 'send',
  'paperplane': 'send',
  'bell.fill': 'notifications',
  'moon.fill': 'dark-mode',
  'creditcard.fill': 'credit-card',
  'location.fill': 'location-on',
  'chevron.right': 'chevron-right',
  'chevron.left.forwardslash.chevron.right': 'code',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'star.fill': 'star',
  'star': 'star-border',
  'magnifyingglass': 'search',
  'line.3.horizontal.decrease.circle': 'filter-list',
  'arrow.up.arrow.down': 'sort',
  'checkmark': 'check',
  'minus': 'remove',
  'plus': 'add',
  'trash': 'delete',
  'sparkles': 'auto-awesome',
  'arrow.right.square.fill': 'logout',
};

type IconSymbolProps = {
  name: keyof IconMapping;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  return <MaterialIcons name={MAPPING[name]} size={size} color={color} style={style} />;
}
