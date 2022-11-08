import { Breakpoint } from 'src/types/breakpoint';
import { TextSize } from 'src/types/textSize';

const calculateRephraseToolTextSize = (
  breakpoint: Breakpoint,
  textLength: number
): TextSize => {
  switch (breakpoint) {
    case '3XL':
      if (textLength < 55) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 1000) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case '2XL':
      if (textLength < 55) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 1000) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case 'XL':
      if (textLength < 50) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 900) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case 'L':
      if (textLength < 45) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 150) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 900) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case 'M':
      if (textLength < 40) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 125) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 800) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case 'S':
      if (textLength < 35) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 105) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 700) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case 'XS':
      if (textLength < 25) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 85) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 600) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    case '2XS':
      if (textLength < 50) {
        return {
          fontSize: 25.99,
          lineHeight: 39,
        };
      }

      if (textLength < 155) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 500) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };

    default:
      if (textLength < 55) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      if (textLength < 500) {
        return {
          fontSize: 20,
          lineHeight: 30,
        };
      }

      return {
        fontSize: 16.1,
        lineHeight: 24,
      };
  }
};

export default calculateRephraseToolTextSize;
