import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Search.styles';
import Search from '../../assets/images/big_search.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const RenderNoSearch = () => {
    return (
      <View style={styles.noSearchContainer}>
        <Text style={styles.noSearchText}>Hoy estoy pensando en buscar...</Text>
        <Search height={hp('30%')} width={wp('45%')}  stroke={'#D51D53'} strokeWidth={.4}/>
      </View>
    );
  };
  
export const RenderNoResults = ({ textSearched }) => {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>
          No se encontraron resultados para "{`${textSearched}`}".
        </Text>
      </View>
    );
  };