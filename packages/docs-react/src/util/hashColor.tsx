type ColorPalette = string[][];

const DEFAULT_PALETTE: ColorPalette = [
  /* 14 tones, 19 colors */
  /* 16 colors without last 4 tones */
  // Red,     Pink,       Purple,     Deep Purple, Indigo, Blue,      Light Blue, Cyan,     Teal,      Green,     Light Green, Lime,    Yellow,    Amber,     Orange,   Deep Orange, Brown,   Grey,     Blue Grey
  /*  50*/
  [
    '#FFEBEE',
    '#FCE4EC',
    '#F3E5F5',
    '#EDE7F6',
    '#E8EAF6',
    '#E3F2FD',
    '#E1F5FE',
    '#E0F7FA',
    '#E0F2F1',
    '#E8F5E9',
    '#F1F8E9',
    '#F9FBE7',
    '#FFFDE7',
    '#FFF8E1',
    '#FFF3E0',
    '#FBE9E7',
    '#EFEBE9',
    '#FAFAFA',
    '#ECEFF1',
  ],
  /* 100*/
  [
    '#FFCDD2',
    '#F8BBD0',
    '#E1BEE7',
    '#D1C4E9',
    '#C5CAE9',
    '#BBDEFB',
    '#B3E5FC',
    '#B2EBF2',
    '#B2DFDB',
    '#C8E6C9',
    '#DCEDC8',
    '#F0F4C3',
    '#FFF9C4',
    '#FFECB3',
    '#FFE0B2',
    '#FFCCBC',
    '#D7CCC8',
    '#F5F5F5',
    '#CFD8DC',
  ],
  /* 200*/
  [
    '#EF9A9A',
    '#F48FB1',
    '#CE93D8',
    '#B39DDB',
    '#9FA8DA',
    '#90CAF9',
    '#81D4FA',
    '#80DEEA',
    '#80CBC4',
    '#A5D6A7',
    '#C5E1A5',
    '#E6EE9C',
    '#FFF59D',
    '#FFE082',
    '#FFCC80',
    '#FFAB91',
    '#BCAAA4',
    '#EEEEEE',
    '#B0BEC5',
  ],
  /* 300*/
  [
    '#E57373',
    '#F06292',
    '#BA68C8',
    '#9575CD',
    '#7986CB',
    '#64B5F6',
    '#4FC3F7',
    '#4DD0E1',
    '#4DB6AC',
    '#81C784',
    '#AED581',
    '#DCE775',
    '#FFF176',
    '#FFD54F',
    '#FFB74D',
    '#FF8A65',
    '#A1887F',
    '#E0E0E0',
    '#90A4AE',
  ],
  /* 400*/
  [
    '#EF5350',
    '#EC407A',
    '#AB47BC',
    '#7E57C2',
    '#5C6BC0',
    '#42A5F5',
    '#29B6F6',
    '#26C6DA',
    '#26A69A',
    '#66BB6A',
    '#9CCC65',
    '#D4E157',
    '#FFEE58',
    '#FFCA28',
    '#FFA726',
    '#FF7043',
    '#8D6E63',
    '#BDBDBD',
    '#78909C',
  ],
  /* 500*/
  [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
  ],
  /* 600*/
  [
    '#E53935',
    '#D81B60',
    '#8E24AA',
    '#5E35B1',
    '#3949AB',
    '#1E88E5',
    '#039BE5',
    '#00ACC1',
    '#00897B',
    '#43A047',
    '#7CB342',
    '#C0CA33',
    '#FDD835',
    '#FFB300',
    '#FB8C00',
    '#F4511E',
    '#6D4C41',
    '#757575',
    '#546E7A',
  ],
  /* 700*/
  [
    '#D32F2F',
    '#C2185B',
    '#7B1FA2',
    '#512DA8',
    '#303F9F',
    '#1976D2',
    '#0288D1',
    '#0097A7',
    '#00796B',
    '#388E3C',
    '#689F38',
    '#AFB42B',
    '#FBC02D',
    '#FFA000',
    '#F57C00',
    '#E64A19',
    '#5D4037',
    '#616161',
    '#455A64',
  ],
  /* 800*/
  [
    '#C62828',
    '#AD1457',
    '#6A1B9A',
    '#4527A0',
    '#283593',
    '#1565C0',
    '#0277BD',
    '#00838F',
    '#00695C',
    '#2E7D32',
    '#558B2F',
    '#9E9D24',
    '#F9A825',
    '#FF8F00',
    '#EF6C00',
    '#D84315',
    '#4E342E',
    '#424242',
    '#37474F',
  ],
  /* 900*/
  [
    '#B71C1C',
    '#880E4F',
    '#4A148C',
    '#311B92',
    '#1A237E',
    '#0D47A1',
    '#01579B',
    '#006064',
    '#004D40',
    '#1B5E20',
    '#33691E',
    '#827717',
    '#F57F17',
    '#FF6F00',
    '#E65100',
    '#BF360C',
    '#3E2723',
    '#212121',
    '#263238',
  ],
  /*A100*/
  [
    '#FF8A80',
    '#FF80AB',
    '#EA80FC',
    '#B388FF',
    '#8C9EFF',
    '#82B1FF',
    '#80D8FF',
    '#84FFFF',
    '#A7FFEB',
    '#B9F6CA',
    '#CCFF90',
    '#F4FF81',
    '#FFFF8D',
    '#FFE57F',
    '#FFD180',
    '#FF9E80',
  ],
  /*A200*/
  [
    '#FF5252',
    '#FF4081',
    '#E040FB',
    '#7C4DFF',
    '#536DFE',
    '#448AFF',
    '#40C4FF',
    '#18FFFF',
    '#64FFDA',
    '#69F0AE',
    '#B2FF59',
    '#EEFF41',
    '#FFFF00',
    '#FFD740',
    '#FFAB40',
    '#FF6E40',
  ],
  /*A400*/
  [
    '#FF1744',
    '#F50057',
    '#D500F9',
    '#651FFF',
    '#3D5AFE',
    '#2979FF',
    '#00B0FF',
    '#00E5FF',
    '#1DE9B6',
    '#00E676',
    '#76FF03',
    '#C6FF00',
    '#FFEA00',
    '#FFC400',
    '#FF9100',
    '#FF3D00',
  ],
  /*A700*/
  [
    '#D50000',
    '#C51162',
    '#AA00FF',
    '#6200EA',
    '#304FFE',
    '#2962FF',
    '#0091EA',
    '#00B8D4',
    '#00BFA5',
    '#00C853',
    '#64DD17',
    '#AEEA00',
    '#FFD600',
    '#FFAB00',
    '#FF6D00',
    '#DD2C00',
  ],
];

interface ColorOptions {
  darkColors?: boolean;
  accentColors?: boolean;
}

/**
 * Hashes a string to a material color hex code
 * @param input - The string to hash
 * @param options - Color generation options
 * @returns A hex color code
 */
export function getColorFromString(
  input: string,
  { darkColors = true, accentColors = true }: ColorOptions = {}
): string {
  if (!input?.length) {
    throw new Error('Input string is required');
  }

  const maxColor = darkColors ? 18 : 15;
  let maxTone = accentColors ? 13 : 9;

  const color = djb2(input) % maxColor;

  // If color is a dark color, don't include accent tones
  if (darkColors && color > 15) {
    maxTone = 9;
  }

  const tone = djb2(input) % maxTone;
  return DEFAULT_PALETTE[tone][color];
}

/**
 * Hashes a number to a material color hex code
 * @param input - The number to hash
 * @param options - Color generation options
 * @returns A hex color code
 */
export function getColorFromNumber(input: number, options: ColorOptions = {}): string {
  return getColorFromString(input.toString(), options);
}

function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) + hash + char;
  }
  return Math.abs(hash);
}
