import _ from 'lodash';
import Color from 'color';

export const normalizeColorMap = (colorMap) =>
  _.map(colorMap, column =>
    _.map(column, color => color.hexString()));

export const denormalizeColorMap = (colorMap) =>
  _.map(colorMap, column =>
    _.map(column, color => Color(color)));

export const normalizePalette = (palette) =>
  _.map(palette, color => color.hexString());

export const denormalizePalette = (palette) =>
  _.map(palette, color => Color(color));

export const normalizeConfiguration = (configuration) => ({
  ...configuration,
  palette: normalizePalette(configuration.palette),
  colorMap: normalizeColorMap(configuration.colorMap),
  background: configuration.background.hexString(),
});

export const denormalizeConfiguration = (configuration) => ({
  ...configuration,
  palette: denormalizePalette(configuration.palette),
  colorMap: denormalizeColorMap(configuration.colorMap),
  background: Color(configuration.background),
});

export const repaletteColorMap = (colorMap, oldPalette, newPalette) => {
  const [colorMapN, oldPaletteN] = [
    normalizeColorMap(colorMap),
    normalizePalette(oldPalette),
  ];
  return _.map(colorMapN, column =>
    _.map(column, color => {
      const index = _.indexOf(oldPaletteN, color);
      return newPalette[_.inRange(index, newPalette.length) ? index : 0];
    }));
};

export const changeColorMapSize = (colorMap, palette, width, height) =>
  _.map(_.range(width), column =>
    _.map(_.range(height), row => {
      if (colorMap[column] && colorMap[column][row]) {
        return colorMap[column][row].clone();
      }
      return palette[0].clone();
    }));

export const generateRandomColorMap = (palette) => {
  const height = _.random(2, 4);
  return _.times(_.random(2, 4), () =>
    _.times(height, () => palette[_.random(0, palette.length - 1)].clone()));
};

export const generateRandomConfiguration = ({ palette }) => ({
  colorMap: generateRandomColorMap(palette),
  layers: _.random(3, 6),
  size: _.random(1, 4) * 4,
});

export const encodeConfiguration = ({ palette, colorMap, cellSize, layers, background, opacity }) =>
  btoa(JSON.stringify(normalizeConfiguration({ palette, colorMap, cellSize, layers, background, opacity })));

export const decodeConfiguration = (input) => {
  try {
    return JSON.parse(atob(input));
  } catch (e) {
    return undefined;
  }
};

export const transposeColorMap = (colorMap) => _.zip.apply(_, colorMap);

export const replaceColor = (colorMap, newColor, columnIndex, rowIndex) =>
  _.map(colorMap, (column, indexInRow) =>
    _.map(column, (oldColor, indexInColumn) =>
      (indexInRow === columnIndex && indexInColumn === rowIndex ? newColor : oldColor).clone()));
