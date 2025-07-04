interface CSSRule {
  property: string;
  value: string;
}

interface ConversionOptions {
  usePrefix?: boolean;
  prefix?: string;
}

// Mapping of CSS properties to Tailwind classes
const cssToTailwindMap: Record<string, (value: string) => string[]> = {
  // Display
  'display': (value: string) => {
    const displayMap: Record<string, string> = {
      'block': 'block',
      'inline-block': 'inline-block',
      'inline': 'inline',
      'flex': 'flex',
      'inline-flex': 'inline-flex',
      'grid': 'grid',
      'inline-grid': 'inline-grid',
      'table': 'table',
      'table-cell': 'table-cell',
      'table-row': 'table-row',
      'hidden': 'hidden',
      'none': 'hidden'
    };
    return [displayMap[value] || `[display:${value}]`];
  },

  // Flexbox
  'justify-content': (value: string) => {
    const justifyMap: Record<string, string> = {
      'flex-start': 'justify-start',
      'start': 'justify-start',
      'center': 'justify-center',
      'flex-end': 'justify-end',
      'end': 'justify-end',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly'
    };
    return [justifyMap[value] || `justify-[${value}]`];
  },

  'align-items': (value: string) => {
    const alignMap: Record<string, string> = {
      'flex-start': 'items-start',
      'start': 'items-start',
      'center': 'items-center',
      'flex-end': 'items-end',
      'end': 'items-end',
      'stretch': 'items-stretch',
      'baseline': 'items-baseline'
    };
    return [alignMap[value] || `items-[${value}]`];
  },

  'align-content': (value: string) => {
    const alignMap: Record<string, string> = {
      'flex-start': 'content-start',
      'start': 'content-start',
      'center': 'content-center',
      'flex-end': 'content-end',
      'end': 'content-end',
      'stretch': 'content-stretch',
      'space-between': 'content-between',
      'space-around': 'content-around',
      'space-evenly': 'content-evenly'
    };
    return [alignMap[value] || `content-[${value}]`];
  },

  'align-self': (value: string) => {
    const alignMap: Record<string, string> = {
      'auto': 'self-auto',
      'flex-start': 'self-start',
      'start': 'self-start',
      'center': 'self-center',
      'flex-end': 'self-end',
      'end': 'self-end',
      'stretch': 'self-stretch',
      'baseline': 'self-baseline'
    };
    return [alignMap[value] || `self-[${value}]`];
  },

  'justify-self': (value: string) => {
    const justifyMap: Record<string, string> = {
      'auto': 'justify-self-auto',
      'start': 'justify-self-start',
      'center': 'justify-self-center',
      'end': 'justify-self-end',
      'stretch': 'justify-self-stretch'
    };
    return [justifyMap[value] || `justify-self-[${value}]`];
  },

  'flex-direction': (value: string) => {
    const directionMap: Record<string, string> = {
      'row': 'flex-row',
      'row-reverse': 'flex-row-reverse',
      'column': 'flex-col',
      'column-reverse': 'flex-col-reverse'
    };
    return [directionMap[value] || `flex-[${value}]`];
  },

  'flex-wrap': (value: string) => {
    const wrapMap: Record<string, string> = {
      'nowrap': 'flex-nowrap',
      'wrap': 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse'
    };
    return [wrapMap[value] || `flex-[${value}]`];
  },

  'flex': (value: string) => {
    const flexMap: Record<string, string> = {
      '1': 'flex-1',
      'auto': 'flex-auto',
      'initial': 'flex-initial',
      'none': 'flex-none'
    };
    return [flexMap[value] || `flex-[${value}]`];
  },

  'flex-grow': (value: string) => {
    const growMap: Record<string, string> = {
      '0': 'grow-0',
      '1': 'grow'
    };
    return [growMap[value] || `grow-[${value}]`];
  },

  'flex-shrink': (value: string) => {
    const shrinkMap: Record<string, string> = {
      '0': 'shrink-0',
      '1': 'shrink'
    };
    return [shrinkMap[value] || `shrink-[${value}]`];
  },

  'order': (value: string) => {
    const orderMap: Record<string, string> = {
      '1': 'order-1',
      '2': 'order-2',
      '3': 'order-3',
      '4': 'order-4',
      '5': 'order-5',
      '6': 'order-6',
      '7': 'order-7',
      '8': 'order-8',
      '9': 'order-9',
      '10': 'order-10',
      '11': 'order-11',
      '12': 'order-12',
      'first': 'order-first',
      'last': 'order-last',
      'none': 'order-none'
    };
    return [orderMap[value] || `order-[${value}]`];
  },

  // Grid
  'grid-template-columns': (value: string) => {
    const colsMap: Record<string, string> = {
      'repeat(1, minmax(0, 1fr))': 'grid-cols-1',
      'repeat(2, minmax(0, 1fr))': 'grid-cols-2',
      'repeat(3, minmax(0, 1fr))': 'grid-cols-3',
      'repeat(4, minmax(0, 1fr))': 'grid-cols-4',
      'repeat(5, minmax(0, 1fr))': 'grid-cols-5',
      'repeat(6, minmax(0, 1fr))': 'grid-cols-6',
      'repeat(7, minmax(0, 1fr))': 'grid-cols-7',
      'repeat(8, minmax(0, 1fr))': 'grid-cols-8',
      'repeat(9, minmax(0, 1fr))': 'grid-cols-9',
      'repeat(10, minmax(0, 1fr))': 'grid-cols-10',
      'repeat(11, minmax(0, 1fr))': 'grid-cols-11',
      'repeat(12, minmax(0, 1fr))': 'grid-cols-12',
      'none': 'grid-cols-none'
    };
    return [colsMap[value] || `grid-cols-[${value}]`];
  },

  'grid-template-rows': (value: string) => {
    const rowsMap: Record<string, string> = {
      'repeat(1, minmax(0, 1fr))': 'grid-rows-1',
      'repeat(2, minmax(0, 1fr))': 'grid-rows-2',
      'repeat(3, minmax(0, 1fr))': 'grid-rows-3',
      'repeat(4, minmax(0, 1fr))': 'grid-rows-4',
      'repeat(5, minmax(0, 1fr))': 'grid-rows-5',
      'repeat(6, minmax(0, 1fr))': 'grid-rows-6',
      'none': 'grid-rows-none'
    };
    return [rowsMap[value] || `grid-rows-[${value}]`];
  },

  'grid-column': (value: string) => {
    const colMap: Record<string, string> = {
      'span 1 / span 1': 'col-span-1',
      'span 2 / span 2': 'col-span-2',
      'span 3 / span 3': 'col-span-3',
      'span 4 / span 4': 'col-span-4',
      'span 5 / span 5': 'col-span-5',
      'span 6 / span 6': 'col-span-6',
      'span 7 / span 7': 'col-span-7',
      'span 8 / span 8': 'col-span-8',
      'span 9 / span 9': 'col-span-9',
      'span 10 / span 10': 'col-span-10',
      'span 11 / span 11': 'col-span-11',
      'span 12 / span 12': 'col-span-12',
      '1 / -1': 'col-span-full'
    };
    return [colMap[value] || `col-[${value}]`];
  },

  'grid-row': (value: string) => {
    const rowMap: Record<string, string> = {
      'span 1 / span 1': 'row-span-1',
      'span 2 / span 2': 'row-span-2',
      'span 3 / span 3': 'row-span-3',
      'span 4 / span 4': 'row-span-4',
      'span 5 / span 5': 'row-span-5',
      'span 6 / span 6': 'row-span-6',
      '1 / -1': 'row-span-full'
    };
    return [rowMap[value] || `row-[${value}]`];
  },

  'grid-column-start': (value: string) => {
    const startMap: Record<string, string> = {
      '1': 'col-start-1',
      '2': 'col-start-2',
      '3': 'col-start-3',
      '4': 'col-start-4',
      '5': 'col-start-5',
      '6': 'col-start-6',
      '7': 'col-start-7',
      '8': 'col-start-8',
      '9': 'col-start-9',
      '10': 'col-start-10',
      '11': 'col-start-11',
      '12': 'col-start-12',
      '13': 'col-start-13',
      'auto': 'col-start-auto'
    };
    return [startMap[value] || `col-start-[${value}]`];
  },

  'grid-column-end': (value: string) => {
    const endMap: Record<string, string> = {
      '1': 'col-end-1',
      '2': 'col-end-2',
      '3': 'col-end-3',
      '4': 'col-end-4',
      '5': 'col-end-5',
      '6': 'col-end-6',
      '7': 'col-end-7',
      '8': 'col-end-8',
      '9': 'col-end-9',
      '10': 'col-end-10',
      '11': 'col-end-11',
      '12': 'col-end-12',
      '13': 'col-end-13',
      'auto': 'col-end-auto'
    };
    return [endMap[value] || `col-end-[${value}]`];
  },

  'grid-row-start': (value: string) => {
    const startMap: Record<string, string> = {
      '1': 'row-start-1',
      '2': 'row-start-2',
      '3': 'row-start-3',
      '4': 'row-start-4',
      '5': 'row-start-5',
      '6': 'row-start-6',
      '7': 'row-start-7',
      'auto': 'row-start-auto'
    };
    return [startMap[value] || `row-start-[${value}]`];
  },

  'grid-row-end': (value: string) => {
    const endMap: Record<string, string> = {
      '1': 'row-end-1',
      '2': 'row-end-2',
      '3': 'row-end-3',
      '4': 'row-end-4',
      '5': 'row-end-5',
      '6': 'row-end-6',
      '7': 'row-end-7',
      'auto': 'row-end-auto'
    };
    return [endMap[value] || `row-end-[${value}]`];
  },

  // Gap
  'gap': (value: string) => {
    const spacing = convertSpacing(value);
    return [`gap-${spacing}`];
  },

  'row-gap': (value: string) => {
    const spacing = convertSpacing(value);
    return [`gap-y-${spacing}`];
  },

  'column-gap': (value: string) => {
    const spacing = convertSpacing(value);
    return [`gap-x-${spacing}`];
  },

  // Padding
  'padding': (value: string) => {
    return convertPadding(value);
  },

  'padding-top': (value: string) => {
    const spacing = convertSpacing(value);
    return [`pt-${spacing}`];
  },

  'padding-right': (value: string) => {
    const spacing = convertSpacing(value);
    return [`pr-${spacing}`];
  },

  'padding-bottom': (value: string) => {
    const spacing = convertSpacing(value);
    return [`pb-${spacing}`];
  },

  'padding-left': (value: string) => {
    const spacing = convertSpacing(value);
    return [`pl-${spacing}`];
  },

  // Margin
  'margin': (value: string) => {
    return convertMargin(value);
  },

  'margin-top': (value: string) => {
    const spacing = convertSpacing(value);
    return [`mt-${spacing}`];
  },

  'margin-right': (value: string) => {
    const spacing = convertSpacing(value);
    return [`mr-${spacing}`];
  },

  'margin-bottom': (value: string) => {
    const spacing = convertSpacing(value);
    return [`mb-${spacing}`];
  },

  'margin-left': (value: string) => {
    const spacing = convertSpacing(value);
    return [`ml-${spacing}`];
  },

  // Width & Height
  'width': (value: string) => {
    const width = convertSize(value);
    return [`w-${width}`];
  },

  'height': (value: string) => {
    const height = convertSize(value);
    return [`h-${height}`];
  },

  'min-width': (value: string) => {
    const width = convertSize(value);
    return [`min-w-${width}`];
  },

  'min-height': (value: string) => {
    const height = convertSize(value);
    return [`min-h-${height}`];
  },

  'max-width': (value: string) => {
    const width = convertSize(value);
    return [`max-w-${width}`];
  },

  'max-height': (value: string) => {
    const height = convertSize(value);
    return [`max-h-${height}`];
  },

  // Position
  'position': (value: string) => {
    const positionMap: Record<string, string> = {
      'static': 'static',
      'fixed': 'fixed',
      'absolute': 'absolute',
      'relative': 'relative',
      'sticky': 'sticky'
    };
    return [positionMap[value] || `[position:${value}]`];
  },

  'top': (value: string) => {
    const spacing = convertSpacing(value);
    return [`top-${spacing}`];
  },

  'right': (value: string) => {
    const spacing = convertSpacing(value);
    return [`right-${spacing}`];
  },

  'bottom': (value: string) => {
    const spacing = convertSpacing(value);
    return [`bottom-${spacing}`];
  },

  'left': (value: string) => {
    const spacing = convertSpacing(value);
    return [`left-${spacing}`];
  },

  'inset': (value: string) => {
    const spacing = convertSpacing(value);
    return [`inset-${spacing}`];
  },

  'z-index': (value: string) => {
    const zMap: Record<string, string> = {
      '0': 'z-0',
      '10': 'z-10',
      '20': 'z-20',
      '30': 'z-30',
      '40': 'z-40',
      '50': 'z-50',
      'auto': 'z-auto'
    };
    return [zMap[value] || `z-[${value}]`];
  },

  // Border
  'border': (value: string) => {
    if (value === 'none' || value === '0') return ['border-0'];
    return convertBorder(value);
  },

  'border-width': (value: string) => {
    const widthMap: Record<string, string> = {
      '0': 'border-0',
      '1px': 'border',
      '2px': 'border-2',
      '4px': 'border-4',
      '8px': 'border-8'
    };
    return [widthMap[value] || `border-[${value}]`];
  },

  'border-top': (value: string) => {
    if (value === 'none' || value === '0') return ['border-t-0'];
    return convertBorderSide(value, 't');
  },

  'border-right': (value: string) => {
    if (value === 'none' || value === '0') return ['border-r-0'];
    return convertBorderSide(value, 'r');
  },

  'border-bottom': (value: string) => {
    if (value === 'none' || value === '0') return ['border-b-0'];
    return convertBorderSide(value, 'b');
  },

  'border-left': (value: string) => {
    if (value === 'none' || value === '0') return ['border-l-0'];
    return convertBorderSide(value, 'l');
  },

  'border-color': (value: string) => {
    const color = convertColor(value);
    return [`border-${color}`];
  },

  'border-style': (value: string) => {
    const styleMap: Record<string, string> = {
      'solid': 'border-solid',
      'dashed': 'border-dashed',
      'dotted': 'border-dotted',
      'double': 'border-double',
      'none': 'border-none'
    };
    return [styleMap[value] || `border-[${value}]`];
  },

  // Border Radius
  'border-radius': (value: string) => {
    const radius = convertBorderRadius(value);
    return [`rounded${radius ? `-${radius}` : ''}`];
  },

  'border-top-left-radius': (value: string) => {
    const radius = convertBorderRadius(value);
    return [`rounded-tl${radius ? `-${radius}` : ''}`];
  },

  'border-top-right-radius': (value: string) => {
    const radius = convertBorderRadius(value);
    return [`rounded-tr${radius ? `-${radius}` : ''}`];
  },

  'border-bottom-left-radius': (value: string) => {
    const radius = convertBorderRadius(value);
    return [`rounded-bl${radius ? `-${radius}` : ''}`];
  },

  'border-bottom-right-radius': (value: string) => {
    const radius = convertBorderRadius(value);
    return [`rounded-br${radius ? `-${radius}` : ''}`];
  },

  // Background
  'background': (value: string) => {
    return convertBackground(value);
  },

  'background-color': (value: string) => {
    const color = convertColor(value);
    return [`bg-${color}`];
  },

  'background-image': (value: string) => {
    if (value.startsWith('linear-gradient')) {
      return convertGradient(value);
    }
    return [`bg-[${value}]`];
  },

  'background-size': (value: string) => {
    const sizeMap: Record<string, string> = {
      'auto': 'bg-auto',
      'cover': 'bg-cover',
      'contain': 'bg-contain'
    };
    return [sizeMap[value] || `bg-[length:${value}]`];
  },

  'background-position': (value: string) => {
    const posMap: Record<string, string> = {
      'center': 'bg-center',
      'top': 'bg-top',
      'top right': 'bg-top-right',
      'right': 'bg-right',
      'bottom right': 'bg-bottom-right',
      'bottom': 'bg-bottom',
      'bottom left': 'bg-bottom-left',
      'left': 'bg-left',
      'top left': 'bg-top-left'
    };
    return [posMap[value] || `bg-[${value}]`];
  },

  'background-repeat': (value: string) => {
    const repeatMap: Record<string, string> = {
      'repeat': 'bg-repeat',
      'no-repeat': 'bg-no-repeat',
      'repeat-x': 'bg-repeat-x',
      'repeat-y': 'bg-repeat-y',
      'round': 'bg-repeat-round',
      'space': 'bg-repeat-space'
    };
    return [repeatMap[value] || `bg-[${value}]`];
  },

  'background-attachment': (value: string) => {
    const attachMap: Record<string, string> = {
      'fixed': 'bg-fixed',
      'local': 'bg-local',
      'scroll': 'bg-scroll'
    };
    return [attachMap[value] || `bg-[${value}]`];
  },

  // Box Shadow
  'box-shadow': (value: string) => {
    if (value === 'none') return ['shadow-none'];
    return convertBoxShadow(value);
  },

  // Text
  'color': (value: string) => {
    const color = convertColor(value);
    return [`text-${color}`];
  },

  'font-size': (value: string) => {
    const size = convertFontSize(value);
    return [`text-${size}`];
  },

  'font-weight': (value: string) => {
    const weight = convertFontWeight(value);
    return [`font-${weight}`];
  },

  'font-family': (value: string) => {
    // This will be handled by font comment parsing
    return [];
  },

  'line-height': (value: string) => {
    // This will be handled by font comment parsing
    return [];
  },

  'letter-spacing': (value: string) => {
    // This will be handled by font comment parsing
    return [];
  },

  'font-style': (value: string) => {
    const styleMap: Record<string, string> = {
      'normal': 'not-italic',
      'italic': 'italic'
    };
    return [styleMap[value] || `[font-style:${value}]`];
  },

  'text-align': (value: string) => {
    const alignMap: Record<string, string> = {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right',
      'justify': 'text-justify',
      'start': 'text-start',
      'end': 'text-end'
    };
    return [alignMap[value] || `text-[${value}]`];
  },

  'text-decoration': (value: string) => {
    const decorationMap: Record<string, string> = {
      'none': 'no-underline',
      'underline': 'underline',
      'overline': 'overline',
      'line-through': 'line-through'
    };
    return [decorationMap[value] || `[text-decoration:${value}]`];
  },

  'text-transform': (value: string) => {
    const transformMap: Record<string, string> = {
      'none': 'normal-case',
      'uppercase': 'uppercase',
      'lowercase': 'lowercase',
      'capitalize': 'capitalize'
    };
    return [transformMap[value] || `[text-transform:${value}]`];
  },

  'vertical-align': (value: string) => {
    const alignMap: Record<string, string> = {
      'baseline': 'align-baseline',
      'top': 'align-top',
      'middle': 'align-middle',
      'bottom': 'align-bottom',
      'text-top': 'align-text-top',
      'text-bottom': 'align-text-bottom',
      'sub': 'align-sub',
      'super': 'align-super'
    };
    return [alignMap[value] || `align-[${value}]`];
  },

  'white-space': (value: string) => {
    const spaceMap: Record<string, string> = {
      'normal': 'whitespace-normal',
      'nowrap': 'whitespace-nowrap',
      'pre': 'whitespace-pre',
      'pre-line': 'whitespace-pre-line',
      'pre-wrap': 'whitespace-pre-wrap'
    };
    return [spaceMap[value] || `whitespace-[${value}]`];
  },

  'word-break': (value: string) => {
    const breakMap: Record<string, string> = {
      'normal': 'break-normal',
      'break-all': 'break-all',
      'keep-all': 'break-keep'
    };
    return [breakMap[value] || `break-[${value}]`];
  },

  'overflow-wrap': (value: string) => {
    const wrapMap: Record<string, string> = {
      'normal': 'break-normal',
      'break-word': 'break-words',
      'anywhere': 'break-words'
    };
    return [wrapMap[value] || `break-[${value}]`];
  },

  // Overflow
  'overflow': (value: string) => {
    const overflowMap: Record<string, string> = {
      'auto': 'overflow-auto',
      'hidden': 'overflow-hidden',
      'clip': 'overflow-clip',
      'visible': 'overflow-visible',
      'scroll': 'overflow-scroll'
    };
    return [overflowMap[value] || `overflow-[${value}]`];
  },

  'overflow-x': (value: string) => {
    const overflowMap: Record<string, string> = {
      'auto': 'overflow-x-auto',
      'hidden': 'overflow-x-hidden',
      'clip': 'overflow-x-clip',
      'visible': 'overflow-x-visible',
      'scroll': 'overflow-x-scroll'
    };
    return [overflowMap[value] || `overflow-x-[${value}]`];
  },

  'overflow-y': (value: string) => {
    const overflowMap: Record<string, string> = {
      'auto': 'overflow-y-auto',
      'hidden': 'overflow-y-hidden',
      'clip': 'overflow-y-clip',
      'visible': 'overflow-y-visible',
      'scroll': 'overflow-y-scroll'
    };
    return [overflowMap[value] || `overflow-y-[${value}]`];
  },

  // Visibility
  'visibility': (value: string) => {
    const visibilityMap: Record<string, string> = {
      'visible': 'visible',
      'hidden': 'invisible',
      'collapse': 'collapse'
    };
    return [visibilityMap[value] || `[visibility:${value}]`];
  },

  // Opacity
  'opacity': (value: string) => {
    const opacity = Math.round(parseFloat(value) * 100);
    const opacityMap: Record<string, string> = {
      '0': 'opacity-0',
      '5': 'opacity-5',
      '10': 'opacity-10',
      '20': 'opacity-20',
      '25': 'opacity-25',
      '30': 'opacity-30',
      '40': 'opacity-40',
      '50': 'opacity-50',
      '60': 'opacity-60',
      '70': 'opacity-70',
      '75': 'opacity-75',
      '80': 'opacity-80',
      '90': 'opacity-90',
      '95': 'opacity-95',
      '100': 'opacity-100'
    };
    return [opacityMap[opacity.toString()] || `opacity-[${value}]`];
  },

  // Cursor
  'cursor': (value: string) => {
    const cursorMap: Record<string, string> = {
      'auto': 'cursor-auto',
      'default': 'cursor-default',
      'pointer': 'cursor-pointer',
      'wait': 'cursor-wait',
      'text': 'cursor-text',
      'move': 'cursor-move',
      'help': 'cursor-help',
      'not-allowed': 'cursor-not-allowed',
      'none': 'cursor-none',
      'context-menu': 'cursor-context-menu',
      'progress': 'cursor-progress',
      'cell': 'cursor-cell',
      'crosshair': 'cursor-crosshair',
      'vertical-text': 'cursor-vertical-text',
      'alias': 'cursor-alias',
      'copy': 'cursor-copy',
      'no-drop': 'cursor-no-drop',
      'grab': 'cursor-grab',
      'grabbing': 'cursor-grabbing',
      'all-scroll': 'cursor-all-scroll',
      'col-resize': 'cursor-col-resize',
      'row-resize': 'cursor-row-resize',
      'n-resize': 'cursor-n-resize',
      'e-resize': 'cursor-e-resize',
      's-resize': 'cursor-s-resize',
      'w-resize': 'cursor-w-resize',
      'ne-resize': 'cursor-ne-resize',
      'nw-resize': 'cursor-nw-resize',
      'se-resize': 'cursor-se-resize',
      'sw-resize': 'cursor-sw-resize',
      'ew-resize': 'cursor-ew-resize',
      'ns-resize': 'cursor-ns-resize',
      'nesw-resize': 'cursor-nesw-resize',
      'nwse-resize': 'cursor-nwse-resize',
      'zoom-in': 'cursor-zoom-in',
      'zoom-out': 'cursor-zoom-out'
    };
    return [cursorMap[value] || `cursor-[${value}]`];
  },

  // Pointer Events
  'pointer-events': (value: string) => {
    const pointerMap: Record<string, string> = {
      'none': 'pointer-events-none',
      'auto': 'pointer-events-auto'
    };
    return [pointerMap[value] || `pointer-events-[${value}]`];
  },

  // User Select
  'user-select': (value: string) => {
    const selectMap: Record<string, string> = {
      'none': 'select-none',
      'text': 'select-text',
      'all': 'select-all',
      'auto': 'select-auto'
    };
    return [selectMap[value] || `select-[${value}]`];
  },

  // Resize
  'resize': (value: string) => {
    const resizeMap: Record<string, string> = {
      'none': 'resize-none',
      'both': 'resize',
      'horizontal': 'resize-x',
      'vertical': 'resize-y'
    };
    return [resizeMap[value] || `resize-[${value}]`];
  },

  // Scroll Behavior
  'scroll-behavior': (value: string) => {
    const scrollMap: Record<string, string> = {
      'auto': 'scroll-auto',
      'smooth': 'scroll-smooth'
    };
    return [scrollMap[value] || `scroll-[${value}]`];
  },

  // List Style
  'list-style-type': (value: string) => {
    const listMap: Record<string, string> = {
      'none': 'list-none',
      'disc': 'list-disc',
      'decimal': 'list-decimal'
    };
    return [listMap[value] || `list-[${value}]`];
  },

  'list-style-position': (value: string) => {
    const positionMap: Record<string, string> = {
      'inside': 'list-inside',
      'outside': 'list-outside'
    };
    return [positionMap[value] || `list-[${value}]`];
  },

  // Table
  'table-layout': (value: string) => {
    const layoutMap: Record<string, string> = {
      'auto': 'table-auto',
      'fixed': 'table-fixed'
    };
    return [layoutMap[value] || `table-[${value}]`];
  },

  'border-collapse': (value: string) => {
    const collapseMap: Record<string, string> = {
      'collapse': 'border-collapse',
      'separate': 'border-separate'
    };
    return [collapseMap[value] || `border-[${value}]`];
  },

  'border-spacing': (value: string) => {
    const spacing = convertSpacing(value);
    return [`border-spacing-${spacing}`];
  },

  // Transform
  'transform': (value: string) => {
    if (value === 'none') return ['transform-none'];
    return convertTransform(value);
  },

  'transform-origin': (value: string) => {
    const originMap: Record<string, string> = {
      'center': 'origin-center',
      'top': 'origin-top',
      'top right': 'origin-top-right',
      'right': 'origin-right',
      'bottom right': 'origin-bottom-right',
      'bottom': 'origin-bottom',
      'bottom left': 'origin-bottom-left',
      'left': 'origin-left',
      'top left': 'origin-top-left'
    };
    return [originMap[value] || `origin-[${value}]`];
  },

  // Transition
  'transition': (value: string) => {
    if (value === 'none') return ['transition-none'];
    return convertTransition(value);
  },

  'transition-property': (value: string) => {
    const propertyMap: Record<string, string> = {
      'none': 'transition-none',
      'all': 'transition-all',
      'colors': 'transition-colors',
      'opacity': 'transition-opacity',
      'shadow': 'transition-shadow',
      'transform': 'transition-transform'
    };
    return [propertyMap[value] || `transition-[${value}]`];
  },

  'transition-duration': (value: string) => {
    const durationMap: Record<string, string> = {
      '75ms': 'duration-75',
      '100ms': 'duration-100',
      '150ms': 'duration-150',
      '200ms': 'duration-200',
      '300ms': 'duration-300',
      '500ms': 'duration-500',
      '700ms': 'duration-700',
      '1000ms': 'duration-1000',
      '1s': 'duration-1000'
    };
    return [durationMap[value] || `duration-[${value}]`];
  },

  'transition-timing-function': (value: string) => {
    const easingMap: Record<string, string> = {
      'linear': 'ease-linear',
      'ease': 'ease-in',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out'
    };
    return [easingMap[value] || `ease-[${value}]`];
  },

  'transition-delay': (value: string) => {
    const delayMap: Record<string, string> = {
      '75ms': 'delay-75',
      '100ms': 'delay-100',
      '150ms': 'delay-150',
      '200ms': 'delay-200',
      '300ms': 'delay-300',
      '500ms': 'delay-500',
      '700ms': 'delay-700',
      '1000ms': 'delay-1000',
      '1s': 'delay-1000'
    };
    return [delayMap[value] || `delay-[${value}]`];
  },

  // Animation
  'animation': (value: string) => {
    if (value === 'none') return ['animate-none'];
    const animationMap: Record<string, string> = {
      'spin 1s linear infinite': 'animate-spin',
      'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite': 'animate-ping',
      'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite': 'animate-pulse',
      'bounce 1s infinite': 'animate-bounce'
    };
    return [animationMap[value] || `animate-[${value}]`];
  },

  // Filter
  'filter': (value: string) => {
    if (value === 'none') return ['filter-none'];
    return convertFilter(value);
  },

  'backdrop-filter': (value: string) => {
    if (value === 'none') return ['backdrop-filter-none'];
    return convertBackdropFilter(value);
  }
};

function parseCSSVariablesForColors(value: string): string {
  // Handle CSS variables with fallbacks: var(--variable, fallback)
  // Only for background and color properties
  const varPattern = /var\(([^,)]+)(?:,\s*([^)]+))?\)/g;
  return value.replace(varPattern, (match, varName, fallback) => {
    // Convert CSS variable to kebab-case class name
    const className = varName.replace('--', '').toLowerCase().replace(/_/g, '-');
    return className;
  });
}

function extractCSSVariableValue(value: string): string {
  // Extract the fallback value from CSS variables for spacing calculations
  const varPattern = /var\([^,)]+,\s*([^)]+)\)/;
  const match = value.match(varPattern);
  return match ? match[1].trim() : value;
}

function processSpacingValue(value: string): string {
  // Handle individual spacing values - extract CSS variable fallback or use as-is
  const varPattern = /var\([^,)]+,\s*([^)]+)\)/;
  const match = value.match(varPattern);
  return match ? match[1].trim() : value;
}

function convertSpacing(value: string): string {
  // For spacing, use the fallback value from CSS variables
  const processedValue = extractCSSVariableValue(value);
  
  const spacingMap: Record<string, string> = {
    '0': '0',
    '0.125rem': '0.5',
    '0.25rem': '1',
    '0.375rem': '1.5',
    '0.5rem': '2',
    '0.625rem': '2.5',
    '0.75rem': '3',
    '0.875rem': '3.5',
    '1rem': '4',
    '1.25rem': '5',
    '1.5rem': '6',
    '1.75rem': '7',
    '2rem': '8',
    '2.25rem': '9',
    '2.5rem': '10',
    '2.75rem': '11',
    '3rem': '12',
    '3.5rem': '14',
    '4rem': '16',
    '5rem': '20',
    '6rem': '24',
    '8rem': '32',
    '10rem': '40',
    '12rem': '48',
    '14rem': '56',
    '16rem': '64'
  };

  return spacingMap[processedValue] || `[${processedValue}]`;
}

function convertPadding(value: string): string[] {
  // Split the value by spaces, but handle CSS variables properly
  const values: string[] = [];
  let currentValue = '';
  let inVar = false;
  let parenCount = 0;
  
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    
    if (char === '(') {
      parenCount++;
      inVar = true;
    } else if (char === ')') {
      parenCount--;
      if (parenCount === 0) {
        inVar = false;
      }
    }
    
    if (char === ' ' && !inVar) {
      if (currentValue.trim()) {
        values.push(currentValue.trim());
        currentValue = '';
      }
    } else {
      currentValue += char;
    }
  }
  
  if (currentValue.trim()) {
    values.push(currentValue.trim());
  }
  
  // Process each value individually
  const processedValues = values.map(val => processSpacingValue(val));
  
  if (processedValues.length === 1) {
    const spacing = convertSpacing(processedValues[0]);
    return [`p-${spacing}`];
  } else if (processedValues.length === 2) {
    const vertical = convertSpacing(processedValues[0]);
    const horizontal = convertSpacing(processedValues[1]);
    return [`py-${vertical}`, `px-${horizontal}`];
  } else if (processedValues.length === 4) {
    const top = convertSpacing(processedValues[0]);
    const right = convertSpacing(processedValues[1]);
    const bottom = convertSpacing(processedValues[2]);
    const left = convertSpacing(processedValues[3]);
    return [`pt-${top}`, `pr-${right}`, `pb-${bottom}`, `pl-${left}`];
  }
  
  return [`p-[${value}]`];
}

function convertMargin(value: string): string[] {
  // Split the value by spaces, but handle CSS variables properly
  const values: string[] = [];
  let currentValue = '';
  let inVar = false;
  let parenCount = 0;
  
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    
    if (char === '(') {
      parenCount++;
      inVar = true;
    } else if (char === ')') {
      parenCount--;
      if (parenCount === 0) {
        inVar = false;
      }
    }
    
    if (char === ' ' && !inVar) {
      if (currentValue.trim()) {
        values.push(currentValue.trim());
        currentValue = '';
      }
    } else {
      currentValue += char;
    }
  }
  
  if (currentValue.trim()) {
    values.push(currentValue.trim());
  }
  
  // Process each value individually
  const processedValues = values.map(val => processSpacingValue(val));
  
  if (processedValues.length === 1) {
    const spacing = convertSpacing(processedValues[0]);
    return [`m-${spacing}`];
  } else if (processedValues.length === 2) {
    const vertical = convertSpacing(processedValues[0]);
    const horizontal = convertSpacing(processedValues[1]);
    return [`my-${vertical}`, `mx-${horizontal}`];
  } else if (processedValues.length === 4) {
    const top = convertSpacing(processedValues[0]);
    const right = convertSpacing(processedValues[1]);
    const bottom = convertSpacing(processedValues[2]);
    const left = convertSpacing(processedValues[3]);
    return [`mt-${top}`, `mr-${right}`, `mb-${bottom}`, `ml-${left}`];
  }
  
  return [`m-[${value}]`];
}

function convertBorderRadius(value: string): string {
  const processedValue = extractCSSVariableValue(value);
  
  const radiusMap: Record<string, string> = {
    '0': 'none',
    '0.125rem': 'sm',
    '0.25rem': '',  // This maps to just 'rounded' (no suffix)
    '0.375rem': 'md',
    '0.5rem': 'lg',
    '0.75rem': 'xl',
    '1rem': '2xl',
    '1.5rem': '3xl',
    '9999px': 'full'
  };

  // Return the mapped value, or create arbitrary value if not found
  return radiusMap.hasOwnProperty(processedValue) ? radiusMap[processedValue] : `[${processedValue}]`;
}

function convertBackground(value: string): string[] {
  // For background, convert CSS variables to class names
  const processedValue = parseCSSVariablesForColors(value);
  
  // Check if it's a color
  if (processedValue.startsWith('#') || processedValue.startsWith('rgb') || processedValue.startsWith('hsl')) {
    const color = convertColor(processedValue);
    return [`bg-${color}`];
  }
  
  // Check if it's a CSS variable converted to class name
  if (!processedValue.includes('(') && !processedValue.includes('#')) {
    return [`bg-${processedValue}`];
  }
  
  return [`bg-[${processedValue}]`];
}

function convertColor(value: string): string {
  // For color, convert CSS variables to class names
  const processedValue = parseCSSVariablesForColors(value);
  
  // If it's already a class name (from CSS variable), use it
  if (!processedValue.includes('#') && !processedValue.includes('rgb') && !processedValue.includes('hsl')) {
    return processedValue;
  }
  
  // For hex colors, create arbitrary value
  if (processedValue.startsWith('#')) {
    return `[${processedValue}]`;
  }
  
  return `[${processedValue}]`;
}

function convertSize(value: string): string {
  const processedValue = extractCSSVariableValue(value);
  
  const sizeMap: Record<string, string> = {
    'auto': 'auto',
    '100%': 'full',
    '50%': '1/2',
    '33.333333%': '1/3',
    '66.666667%': '2/3',
    '25%': '1/4',
    '75%': '3/4',
    '20%': '1/5',
    '40%': '2/5',
    '60%': '3/5',
    '80%': '4/5',
    '16.666667%': '1/6',
    '83.333333%': '5/6',
    '8.333333%': '1/12',
    '41.666667%': '5/12',
    '58.333333%': '7/12',
    '91.666667%': '11/12',
    'fit-content': 'fit',
    'min-content': 'min',
    'max-content': 'max'
  };

  return sizeMap[processedValue] || convertSpacing(processedValue);
}

function convertFontSize(value: string): string {
  const processedValue = extractCSSVariableValue(value);
  
  const fontSizeMap: Record<string, string> = {
    '0.625rem': 'xs',
    '0.75rem': 'sm',
    '0.875rem': 'sm',
    '1rem': 'base',
    '1.125rem': 'lg',
    '1.25rem': 'xl',
    '1.5rem': '2xl',
    '1.875rem': '3xl',
    '2.25rem': '4xl',
    '3rem': '5xl',
    '3.75rem': '6xl',
    '4.5rem': '7xl',
    '6rem': '8xl',
    '8rem': '9xl'
  };

  return fontSizeMap[processedValue] || `[${processedValue}]`;
}

function convertFontWeight(value: string): string {
  const weightMap: Record<string, string> = {
    '100': 'thin',
    '200': 'extralight',
    '300': 'light',
    '400': 'normal',
    '500': 'medium',
    '600': 'semibold',
    '700': 'bold',
    '800': 'extrabold',
    '900': 'black',
    'normal': 'normal',
    'bold': 'bold'
  };

  return weightMap[value] || `[${value}]`;
}

function convertBorder(value: string): string[] {
  // Parse border shorthand: width style color
  const parts = value.trim().split(/\s+/);
  const classes: string[] = [];
  
  for (const part of parts) {
    if (part.match(/^\d+px$/) || part === '0') {
      // Width
      const widthMap: Record<string, string> = {
        '0': 'border-0',
        '1px': 'border',
        '2px': 'border-2',
        '4px': 'border-4',
        '8px': 'border-8'
      };
      classes.push(widthMap[part] || `border-[${part}]`);
    } else if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(part)) {
      // Style
      const styleMap: Record<string, string> = {
        'solid': 'border-solid',
        'dashed': 'border-dashed',
        'dotted': 'border-dotted',
        'double': 'border-double',
        'none': 'border-none'
      };
      classes.push(styleMap[part]);
    } else if (part.startsWith('#') || part.startsWith('rgb') || part.startsWith('hsl')) {
      // Color
      const color = convertColor(part);
      classes.push(`border-${color}`);
    }
  }
  
  return classes.length > 0 ? classes : [`border-[${value}]`];
}

function convertBorderSide(value: string, side: string): string[] {
  // Parse border shorthand for specific side
  const parts = value.trim().split(/\s+/);
  const classes: string[] = [];
  
  for (const part of parts) {
    if (part.match(/^\d+px$/) || part === '0') {
      // Width
      const widthMap: Record<string, string> = {
        '0': `border-${side}-0`,
        '1px': `border-${side}`,
        '2px': `border-${side}-2`,
        '4px': `border-${side}-4`,
        '8px': `border-${side}-8`
      };
      classes.push(widthMap[part] || `border-${side}-[${part}]`);
    } else if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(part)) {
      // Style (applies to all borders)
      const styleMap: Record<string, string> = {
        'solid': 'border-solid',
        'dashed': 'border-dashed',
        'dotted': 'border-dotted',
        'double': 'border-double',
        'none': 'border-none'
      };
      classes.push(styleMap[part]);
    } else if (part.startsWith('#') || part.startsWith('rgb') || part.startsWith('hsl')) {
      // Color
      const color = convertColor(part);
      classes.push(`border-${side}-${color}`);
    }
  }
  
  return classes.length > 0 ? classes : [`border-${side}-[${value}]`];
}

function convertBoxShadow(value: string): string[] {
  // Common shadow patterns
  const shadowMap: Record<string, string> = {
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)': 'shadow-sm',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)': 'shadow',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)': 'shadow-md',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)': 'shadow-lg',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)': 'shadow-xl',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)': 'shadow-2xl',
    'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)': 'shadow-inner'
  };
  
  return [shadowMap[value] || `shadow-[${value}]`];
}

function convertGradient(value: string): string[] {
  // Basic gradient detection - this is simplified
  if (value.includes('linear-gradient')) {
    // Extract direction and colors
    const match = value.match(/linear-gradient\(([^)]+)\)/);
    if (match) {
      const params = match[1];
      // This is a simplified conversion - full gradient conversion would be more complex
      if (params.includes('to right')) {
        return ['bg-gradient-to-r'];
      } else if (params.includes('to left')) {
        return ['bg-gradient-to-l'];
      } else if (params.includes('to bottom')) {
        return ['bg-gradient-to-b'];
      } else if (params.includes('to top')) {
        return ['bg-gradient-to-t'];
      }
    }
  }
  
  return [`bg-[${value}]`];
}

function convertTransform(value: string): string[] {
  const classes: string[] = ['transform'];
  
  // Parse transform functions
  const functions = value.match(/\w+\([^)]*\)/g) || [];
  
  for (const func of functions) {
    const [name, params] = func.split('(');
    const param = params.replace(')', '');
    
    switch (name) {
      case 'translateX':
        classes.push(`translate-x-[${param}]`);
        break;
      case 'translateY':
        classes.push(`translate-y-[${param}]`);
        break;
      case 'translate':
        const [x, y] = param.split(',').map(p => p.trim());
        classes.push(`translate-x-[${x}]`);
        if (y) classes.push(`translate-y-[${y}]`);
        break;
      case 'scale':
        classes.push(`scale-[${param}]`);
        break;
      case 'scaleX':
        classes.push(`scale-x-[${param}]`);
        break;
      case 'scaleY':
        classes.push(`scale-y-[${param}]`);
        break;
      case 'rotate':
        classes.push(`rotate-[${param}]`);
        break;
      case 'skewX':
        classes.push(`skew-x-[${param}]`);
        break;
      case 'skewY':
        classes.push(`skew-y-[${param}]`);
        break;
      default:
        classes.push(`[transform:${func}]`);
    }
  }
  
  return classes;
}

function convertTransition(value: string): string[] {
  // Parse transition shorthand
  const parts = value.split(/\s+/);
  const classes: string[] = [];
  
  // Default transition
  if (value === 'all' || parts.includes('all')) {
    classes.push('transition-all');
  } else {
    classes.push('transition');
  }
  
  // Duration
  for (const part of parts) {
    if (part.endsWith('ms') || part.endsWith('s')) {
      const durationMap: Record<string, string> = {
        '75ms': 'duration-75',
        '100ms': 'duration-100',
        '150ms': 'duration-150',
        '200ms': 'duration-200',
        '300ms': 'duration-300',
        '500ms': 'duration-500',
        '700ms': 'duration-700',
        '1000ms': 'duration-1000',
        '1s': 'duration-1000'
      };
      classes.push(durationMap[part] || `duration-[${part}]`);
    }
  }
  
  return classes;
}

function convertFilter(value: string): string[] {
  const classes: string[] = [];
  
  // Parse filter functions
  const functions = value.match(/\w+\([^)]*\)/g) || [];
  
  for (const func of functions) {
    const [name, params] = func.split('(');
    const param = params.replace(')', '');
    
    switch (name) {
      case 'blur':
        const blurMap: Record<string, string> = {
          '0': 'blur-none',
          '1px': 'blur-sm',
          '4px': 'blur',
          '8px': 'blur-md',
          '12px': 'blur-lg',
          '16px': 'blur-xl',
          '24px': 'blur-2xl',
          '40px': 'blur-3xl'
        };
        classes.push(blurMap[param] || `blur-[${param}]`);
        break;
      case 'brightness':
        classes.push(`brightness-[${param}]`);
        break;
      case 'contrast':
        classes.push(`contrast-[${param}]`);
        break;
      case 'grayscale':
        classes.push(param === '1' || param === '100%' ? 'grayscale' : `grayscale-[${param}]`);
        break;
      case 'hue-rotate':
        classes.push(`hue-rotate-[${param}]`);
        break;
      case 'invert':
        classes.push(param === '1' || param === '100%' ? 'invert' : `invert-[${param}]`);
        break;
      case 'saturate':
        classes.push(`saturate-[${param}]`);
        break;
      case 'sepia':
        classes.push(param === '1' || param === '100%' ? 'sepia' : `sepia-[${param}]`);
        break;
      default:
        classes.push(`[filter:${func}]`);
    }
  }
  
  return classes;
}

function convertBackdropFilter(value: string): string[] {
  const classes: string[] = [];
  
  // Parse backdrop-filter functions
  const functions = value.match(/\w+\([^)]*\)/g) || [];
  
  for (const func of functions) {
    const [name, params] = func.split('(');
    const param = params.replace(')', '');
    
    switch (name) {
      case 'blur':
        const blurMap: Record<string, string> = {
          '0': 'backdrop-blur-none',
          '1px': 'backdrop-blur-sm',
          '4px': 'backdrop-blur',
          '8px': 'backdrop-blur-md',
          '12px': 'backdrop-blur-lg',
          '16px': 'backdrop-blur-xl',
          '24px': 'backdrop-blur-2xl',
          '40px': 'backdrop-blur-3xl'
        };
        classes.push(blurMap[param] || `backdrop-blur-[${param}]`);
        break;
      case 'brightness':
        classes.push(`backdrop-brightness-[${param}]`);
        break;
      case 'contrast':
        classes.push(`backdrop-contrast-[${param}]`);
        break;
      case 'grayscale':
        classes.push(param === '1' || param === '100%' ? 'backdrop-grayscale' : `backdrop-grayscale-[${param}]`);
        break;
      case 'hue-rotate':
        classes.push(`backdrop-hue-rotate-[${param}]`);
        break;
      case 'invert':
        classes.push(param === '1' || param === '100%' ? 'backdrop-invert' : `backdrop-invert-[${param}]`);
        break;
      case 'saturate':
        classes.push(`backdrop-saturate-[${param}]`);
        break;
      case 'sepia':
        classes.push(param === '1' || param === '100%' ? 'backdrop-sepia' : `backdrop-sepia-[${param}]`);
        break;
      default:
        classes.push(`[backdrop-filter:${func}]`);
    }
  }
  
  return classes;
}

function extractFontComment(css: string): string | null {
  // Look for font comments like /* New/Paragraph/P3 Semibold */
  const fontCommentMatch = css.match(/\/\*\s*([^*]+(?:\/[^*]+)*)\s*\*\//);
  if (fontCommentMatch) {
    const comment = fontCommentMatch[1].trim();
    // Convert to kebab-case class name and remove "New" from the beginning
    let className = comment.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    // Remove "new-" from the beginning if it exists
    if (className.startsWith('new-')) {
      className = className.substring(4);
    }
    
    return className;
  }
  return null;
}

function parseCSSRules(css: string): CSSRule[] {
  const rules: CSSRule[] = [];
  const lines = css.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('/*') && trimmedLine.includes(':')) {
      const colonIndex = trimmedLine.indexOf(':');
      const property = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).replace(';', '').trim();
      
      if (property && value) {
        rules.push({ property, value });
      }
    }
  }
  
  return rules;
}

function optimizeClasses(classes: string[]): string[] {
  const optimized: string[] = [];
  const spacingClasses: Record<string, string[]> = {};
  
  // Group spacing classes by type and value
  for (const cls of classes) {
    // Check for padding classes
    if (cls.match(/^p[tblr]-/)) {
      const parts = cls.split('-');
      const direction = parts[0];
      const value = parts.slice(1).join('-');
      const key = `p-${value}`;
      if (!spacingClasses[key]) spacingClasses[key] = [];
      spacingClasses[key].push(direction);
    }
    // Check for margin classes
    else if (cls.match(/^m[tblr]-/)) {
      const parts = cls.split('-');
      const direction = parts[0];
      const value = parts.slice(1).join('-');
      const key = `m-${value}`;
      if (!spacingClasses[key]) spacingClasses[key] = [];
      spacingClasses[key].push(direction);
    }
    else {
      optimized.push(cls);
    }
  }
  
  // Optimize spacing classes
  for (const [key, directions] of Object.entries(spacingClasses)) {
    const [type, ...valueParts] = key.split('-');
    const value = valueParts.join('-');
    const uniqueDirections = [...new Set(directions)];
    
    // Check for combinations that can be optimized
    if (uniqueDirections.includes('pt') && uniqueDirections.includes('pb') && 
        !uniqueDirections.includes('pl') && !uniqueDirections.includes('pr')) {
      optimized.push(`${type}y-${value}`);
    }
    else if (uniqueDirections.includes('pl') && uniqueDirections.includes('pr') && 
             !uniqueDirections.includes('pt') && !uniqueDirections.includes('pb')) {
      optimized.push(`${type}x-${value}`);
    }
    else if (uniqueDirections.length === 4) {
      optimized.push(`${type}-${value}`);
    }
    else {
      // Add individual classes if no optimization possible
      for (const direction of uniqueDirections) {
        optimized.push(`${direction}-${value}`);
      }
    }
  }
  
  return optimized;
}

function applyPrefix(classes: string[], options: ConversionOptions): string[] {
  if (!options.usePrefix || !options.prefix) {
    return classes;
  }
  
  return classes.map(cls => {
    // Don't prefix arbitrary values or already prefixed classes
    if (cls.startsWith('[') || cls.includes(':')) {
      return cls;
    }
    return `${options.prefix}:${cls}`;
  });
}

export function cssToTailwind(css: string, options: ConversionOptions = {}): string {
  if (!css.trim()) return '';
  
  const rules = parseCSSRules(css);
  let tailwindClasses: string[] = [];
  
  // Check for font comment and add it as a class
  const fontComment = extractFontComment(css);
  if (fontComment) {
    tailwindClasses.push(fontComment);
  }
  
  // Track if we have font-related properties to skip individual processing
  const hasFontProperties = rules.some(rule => 
    ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'font-style'].includes(rule.property)
  );
  
  for (const rule of rules) {
    // Skip individual font properties if we have a font comment
    if (fontComment && ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'font-style'].includes(rule.property)) {
      continue;
    }
    
    const converter = cssToTailwindMap[rule.property];
    if (converter) {
      const classes = converter(rule.value);
      tailwindClasses.push(...classes);
    } else {
      // Fallback for unknown properties
      tailwindClasses.push(`[${rule.property}:${rule.value}]`);
    }
  }
  
  // Apply intelligent optimizations
  tailwindClasses = optimizeClasses(tailwindClasses);
  
  // Apply prefix if requested
  tailwindClasses = applyPrefix(tailwindClasses, options);
  
  return tailwindClasses.join(' ');
}