import React from 'react';

const imgAlt = (cardNum) => {
  let suit = ['♣', '♦', '♥', '♠'][Math.floor(cardNum / 13)];
  let rank = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'][cardNum % 13];
  return suit + rank;
};

const imgUrl = (cardNum) => {
  if (cardNum == null) {
    return "https://i.pinimg.com/564x/6c/a0/16/6ca016115a894f69dea75cc80f95ad92.jpg";
  }
  let suit = ['clubs', 'diamonds', 'hearts', 'spades'][Math.floor(cardNum / 13)];
  let rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'][cardNum % 13];
  return `https://cdn.rawgit.com/twistdigital/responsive-playing-cards/master/minified/${suit}/${rank}${suit[0]}.svg`;
};

const Card = ({cardNum}) => (
  <img src={imgUrl(cardNum)} alt={imgAlt(cardNum)} width="60" style={{borderRadius: '6px'}} />
);

export default Card;
