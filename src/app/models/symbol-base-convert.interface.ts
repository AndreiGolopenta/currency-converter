export interface SymbolBaseConvert {
  base: string;
  rates: {
    [key: string]: number;
  };
  date: string;
}
