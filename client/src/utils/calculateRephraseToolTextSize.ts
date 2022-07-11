import { Breakpoint } from 'src/types/breakpoint';
import { TextSize } from 'src/types/textSize';

const calculateRephraseToolTextSize = (
  breakpoint: Breakpoint,
  textLength: number
): TextSize => {
  switch (breakpoint) {
    case '2XL':
      if (textLength < 55) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'XL':
      if (textLength < 50) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'L':
      if (textLength < 45) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 150) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'M':
      if (textLength < 40) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 125) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'S':
      if (textLength < 35) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 105) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'XS':
      if (textLength < 25) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 85) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case '2XS':
      if (textLength < 50) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 155) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    default:
      if (textLength < 55) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };
  }
};

export default calculateRephraseToolTextSize;
