import { dark } from './dark.theme';
import { light } from './light.theme';

type Theme = typeof dark & typeof light;

export const themes: { dark: Theme; light: Theme } = {
  dark: {
    ...dark,
  },
  light: {
    ...light,
  },
};
