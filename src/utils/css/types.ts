export interface CSSRule {
  property: string;
  value: string;
}

export type ConversionOptions = {
  usePrefix?: boolean;
  prefix?: string;
  responsive?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?:
    | 'hover'
    | 'focus'
    | 'active'
    | 'disabled'
    | 'dark'
    | 'group-hover'
    | 'focus-within'
    | 'focus-visible';
};

export type ConverterFn = (value: string) => string[];
export type ConverterMap = Record<string, ConverterFn>;
