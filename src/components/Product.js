import React from 'react';
import glamorous from 'glamorous';
import Rating from './Rating';

const Container = glamorous.div(
  ({ theme: { colors, layouts } }) => ({
    display: 'grid',
    transition: 'all 0.3s ease',
    backgroundColor: colors.item.background,    
    ...layouts.item,
  }),
  ({onClick, theme}) => onClick && {
    cursor: 'pointer',    
    boxShadow: theme.colors.item.shadow,
    ':hover': {      
      transform:'scale(1.03)',
      backgroundColor: theme.colors.item.backgroundOnHover      
    }
  }
);

const DisplayName = glamorous.div(
  {
    textTransform: 'uppercase',
    fontSize: 'x-large',
    gridArea: 'display-name',
  },
  ({ theme: { layouts } }) => layouts.displayName,
);

const Description = glamorous.div(
  {
    gridArea: 'description',
  },
  ({ theme: { layouts } }) => layouts.description,
);

const Price = glamorous.div(
  {
    gridArea: 'price',
    '&::before': {
      content: '$',
    },
  },
  ({ theme: { layouts } }) => layouts.price,
);

const Thumbnail = glamorous.img(
  {
    gridArea: 'thumbnail',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  ({ theme: { layouts } }) => layouts.thumbnail,
);

const Product = ({ displayName, image, description, price, rating, onClick }) => (
  <Container onClick={onClick}>
    <DisplayName>{displayName}</DisplayName>
    <Description>{description}</Description>
    <Price>{price}</Price>
    <Rating rating={rating} />
    <Thumbnail src={`https://raw.githubusercontent.com/Soluto/react-tweek-shop-example/master/public/${image}`} alt={displayName} />
  </Container>
);

export default Product;
