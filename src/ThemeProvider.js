import { ThemeProvider } from 'glamorous';
import { mapProps, compose } from 'recompose';
import { createTweekContext } from 'react-tweek';
import ensureProp from './utils/ensureProp';
import { colors, layouts } from './theme';

const TweekContext = createTweekContext();
TweekContext.prepare('shop/view/_');
const withTweekKeys = TweekContext.withTweekKeys;
export default compose(
  withTweekKeys(
    {
      theme: 'shop/view/theme',
      layout: 'shop/view/layout',
    },
    {
      defaultValues: { theme: 'light', layout: 'list' },
    },
  ),
  ensureProp('theme', Object.keys(colors)),
  ensureProp('layout', Object.keys(layouts)),
  mapProps(({ theme, layout, ...props }) => ({
    theme: {
      colors: colors[theme],
      layouts: layouts[layout],
    },
    ...props,
  })),
)(ThemeProvider);
