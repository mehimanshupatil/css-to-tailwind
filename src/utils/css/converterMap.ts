// Converter precedence: later spread wins on key collision.
// Each slice is domain-isolated so collisions should not occur.
import { backgroundConverters } from './converters/backgrounds';
import { borderConverters } from './converters/borders';
import { effectsConverters } from './converters/effects';
import { extendedConverters } from './converters/extended';
import { gridConverters } from './converters/grid';
import { interactiveConverters } from './converters/interactive';
import { layoutConverters } from './converters/layout';
import { positionConverters } from './converters/position';
import { sizingConverters } from './converters/sizing';
import { spacingConverters } from './converters/spacing';
import { transformConverters } from './converters/transforms';
import { transitionConverters } from './converters/transitions';
import { typographyConverters } from './converters/typography';
import type { ConverterMap } from './types';

export const cssToTailwindMap: ConverterMap = {
  ...layoutConverters,
  ...gridConverters,
  ...spacingConverters,
  ...sizingConverters,
  ...positionConverters,
  ...typographyConverters,
  ...borderConverters,
  ...backgroundConverters,
  ...effectsConverters,
  ...transformConverters,
  ...transitionConverters,
  ...interactiveConverters,
  ...extendedConverters,
};
