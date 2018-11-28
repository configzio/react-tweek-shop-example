export const colors = {
  light: {
    background: '#e1f5fe',
    color: 'black',
    item: {
      background: 'white',
      shadow: '2px 2px 4px #696969',
      backgroundOnHover:'#afc2cb'
    },
    star: {
      fill: 'yellow',
      stroke: 'black',
    },
  },
  dark: {
    background: '#212121',
    color: '#BBBBBB',
    item: {
      background: '#484848',
      shadow: '-1px -1px 2px #696969',
      backgroundOnHover:'black'
    },
    star: {
      fill: 'darkorange',
      stroke: '#2B2B2B',
    },
  },
};

export const layouts = {
  list: {
    list: {
      maxWidth: 800,
    },
    item: {
      marginTop: 32,
      padding: 16,
      gridTemplateColumns: '64px 1fr auto',
      gridTemplateRows: 'auto 16px auto 1fr',
      gridColumnGap: 16,
      gridTemplateAreas: `
        "display-name display-name price"
        ". . ."
        "thumbnail description description"
        "thumbnail rating rating"`,
    },
    thumbnail: {
      height: 64,
      alignSelf: 'center',
    },
    rating: {
      alignSelf: 'start',
    },
  },
  thumbnails: {
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 912,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      margin: 8,
      padding: 16,
      width: 256,
      height: 256,
      gridTemplateColumns: '1fr auto',
      gridTemplateRows: 'auto auto 1fr auto auto',
      gridTemplateAreas: `
        "display-name"
        "price"
        "thumbnail"
        "description"
        "rating"`,
    },
    thumbnail: {
      justifySelf: 'center',
    },
  },
};
