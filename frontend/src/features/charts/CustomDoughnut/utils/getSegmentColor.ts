export const BG_COLORS = [
  'oklch(70.4% 0.191 22.216)',
  'oklch(82.8% 0.189 84.429)',
  'oklch(84.1% 0.238 128.85)',
  'oklch(76.5% 0.177 163.223)',
  'oklch(78.9% 0.154 211.53)',
  'oklch(70.7% 0.165 254.624)',
  'oklch(70.2% 0.183 293.541)',
  'oklch(74% 0.238 322.16)',
  'oklch(71.2% 0.194 13.428)',
];

export const getSegmentColor = (index: number): string => {
  return BG_COLORS[index % BG_COLORS.length];
};
