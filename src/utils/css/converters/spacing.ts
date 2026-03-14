import {
  convertMargin,
  convertPadding,
  convertSpacing,
} from '../helpers/spacing';
import type { ConverterMap } from '../types';

export const spacingConverters: ConverterMap = {
  padding: (value) => convertPadding(value),
  'padding-top': (value) => [`pt-${convertSpacing(value)}`],
  'padding-right': (value) => [`pr-${convertSpacing(value)}`],
  'padding-bottom': (value) => [`pb-${convertSpacing(value)}`],
  'padding-left': (value) => [`pl-${convertSpacing(value)}`],
  'padding-inline': (value) => [`px-${convertSpacing(value)}`],
  'padding-block': (value) => [`py-${convertSpacing(value)}`],

  margin: (value) => convertMargin(value),
  'margin-top': (value) => [`mt-${convertSpacing(value)}`],
  'margin-right': (value) => [`mr-${convertSpacing(value)}`],
  'margin-bottom': (value) => [`mb-${convertSpacing(value)}`],
  'margin-left': (value) => [`ml-${convertSpacing(value)}`],
  'margin-inline': (value) => [`mx-${convertSpacing(value)}`],
  'margin-block': (value) => [`my-${convertSpacing(value)}`],

  gap: (value) => [`gap-${convertSpacing(value)}`],
  'row-gap': (value) => [`gap-y-${convertSpacing(value)}`],
  'column-gap': (value) => [`gap-x-${convertSpacing(value)}`],
  'border-spacing': (value) => [`border-spacing-${convertSpacing(value)}`],
};
