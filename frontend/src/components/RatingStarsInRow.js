import React from 'react';
import { View } from 'react-native';
import RatingStar from '../assets/images/ratingStar.svg'; 

const RatingStarsInRow = ({ rate, width, height, style }) => {
  const ratingStarsList = [];
  const adjustedRate = (rate / 2).toFixed(2);

  for (let i = 1; i <= 5; i++) {
    ratingStarsList.push(
      <RatingStar
        key={i}
        style={style}
        fill={i < adjustedRate ? '#FFD700' : '#03152D'}
        width={width}
        height={height}
        stroke='#CEA100'
      />,
    );
  }

  return <View style={{ flexDirection: 'row' }}>{ratingStarsList}</View>;
};

export default RatingStarsInRow;