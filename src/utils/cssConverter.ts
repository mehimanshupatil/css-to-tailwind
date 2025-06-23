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
      'hidden': 'hidden',
      'none': 'hidden'
    };
    return [displayMap[value] || `[display:${value}]`];
  },

  // Flexbox
  'justify-content': (value: string) => {
    const justifyMap: Record<string, string> = {
      'flex-start': 'justify-start',
      'center': 'justify-center',
      'flex-end': 'justify-end',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly'
    };
    return [justifyMap[value] || `justify-[${value}]`];
  },

  'align-items': (value: string) => {
    const alignMap: Record<string, string> = {
      'flex-start': 'items-start',
      'center': 'items-center',
      'flex-end': 'items-end',
      'stretch': 'items-stretch',
      'baseline': 'items-baseline'
    };
    return [alignMap[value] || `items-[${value}]`];
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

  // Border Radius
  'border-radius': (value: string) => {
    const radius = convertBorderRadius(value);
    return [`rounded${radius ? `-${radius}` : ''}`];
  },

  // Background
  'background': (value: string) => {
    return convertBackground(value);
  },

  'background-color': (value: string) => {
    const color = convertColor(value);
    return [`bg-${color}`];
  },

  // Box Shadow
  'box-shadow': (value: string) => {
    if (value === 'none') return ['shadow-none'];
    return [`shadow-[${value}]`];
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
    // This will be handled by font comment parsing
    return [];
  },

  'text-align': (value: string) => {
    const alignMap: Record<string, string> = {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right',
      'justify': 'text-justify'
    };
    return [alignMap[value] || `text-[${value}]`];
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
    '3rem': '12'
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
    '80%': '4/5'
  };

  return sizeMap[processedValue] || convertSpacing(processedValue);
}

function convertFontSize(value: string): string {
  const processedValue = extractCSSVariableValue(value);
  
  const fontSizeMap: Record<string, string> = {
    '0.75rem': 'xs',
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