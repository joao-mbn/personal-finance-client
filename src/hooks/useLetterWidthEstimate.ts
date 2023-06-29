const canvas = document.createElement('canvas');
canvas.style.display = 'none';
canvas.setAttribute('id', 'measure-canvas');

export function useLetterWidthEstimate(font: {
  family?: string;
  weight?: string;
  size: string | number;
}) {
  const context = canvas.getContext('2d');
  if (!context) return Number(font.size) / 2; // This relation holds true using Font Family: Open-Sans; Font Weight: Normal.

  const canvasStyle = getComputedStyle(canvas);
  const { family, weight, size } = font;
  const fontFamily = family || canvasStyle.fontFamily || 'Open-Sans';
  const fontWeight = weight || canvasStyle.fontWeight || 'normal';

  context.font = `${fontWeight} ${size}px ${fontFamily}`;

  const metrics = context.measureText('x');
  return metrics.width;
}
