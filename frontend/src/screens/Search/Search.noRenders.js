import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Search.styles';
import SearchIconWhite from '../../assets/images/search_btn.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const RenderNoSearch = () => {
    return (
      <View style={styles.noSearchContainer}>
        <Text style={styles.noSearchText}>Hoy estoy pensando en buscar...</Text>
        <SearchIconWhite width={wp('50%')} height={hp('20%')} />
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