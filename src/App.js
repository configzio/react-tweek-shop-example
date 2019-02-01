import React from 'react';
import glamorous from 'glamorous';
import Product from './components/Product';
import items from './items.json';
import { withTweekKeys } from './utils/Tweek';
import { compose } from 'recompose';

const Shop = glamorous.div(
  {
    padding: '32px 64px',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.color,
  }),
);

const Header = glamorous.div({
  textTransform: 'uppercase',
  fontSize: 'xx-large',
  textAlign: 'center',
});

const ItemsList = glamorous.div(
  {
    margin: 'auto',
  },
  ({ theme: { layouts } }) => layouts.list,
);


const App = ({enabled, message, userName}) => {

  const onClick = ()=> alert(message);

  return (
  <Shop>
    <Header>{`Welcome ${userName}!`}</Header>
    <ItemsList>{items.map(({ id, ...props }) => <Product key={id} {...props} onClick={enabled && onClick} />)}</ItemsList>
  </Shop>
)
  };

export default compose(
  withTweekKeys(
    {
      enabled: 'shop/click/enabled',
    },
    {
      defaultValues: {enabled: 'false'},
    },
  ),
  )(App);
