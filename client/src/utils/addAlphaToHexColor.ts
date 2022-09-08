const addAlphaToHexColor = (color: string, opacity: number): string => {
  const alpha = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + alpha.toString(16);
};

export default addAlphaToHexColor;
