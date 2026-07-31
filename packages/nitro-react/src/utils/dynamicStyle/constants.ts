import { type ColorTransform, type DynamicStyleState } from './types';

export const IDENTITY_TRANSFORM: ColorTransform = [1, 1, 1, 1, 0, 0, 0, 0];

export const DISABLED_TRANSFORM: ColorTransform = [1, 1, 1, 0.5, 0, 0, 0, 0];

export const DYNAMIC_STYLE_STATES: readonly DynamicStyleState[] = ['default', 'hover', 'pressed', 'disabled'];

export const DYNAMIC_ROOT_CLASS = 'dyn-root';

export const DYNAMIC_ART_CLASS = 'dyn-art';

export const DYNAMIC_TEXT_CLASS = 'dyn-text';
