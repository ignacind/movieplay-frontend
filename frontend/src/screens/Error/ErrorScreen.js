import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { hideError } from '../../redux/slices/errorSlice';
import useReloadError from '../../hooks/useReloadError';

const ErrorScreen = ({  }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.error);
  const {isLoading, retryRequest} = useReloadError();
  
  const handleRetry = async () => {

    if (error && error.retryConfig) {
        await retryRequest(error)
    }

  };

  const handleClose = () => {
    dispatch(hideError());
  };



  return (
    <View style={styles.container}>

      {!isLoading && <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
        <Ionicons name="close-circle" size={hp('5%')} color="#D51D53" />
      </TouchableOpacity>}

      <Ionicons name={error.iconName} size={hp('25%')} color="#D51D53" />
      <Text style={styles.errorText}>{error.message}</Text>
      
      {isLoading 
      ? <ActivityIndicator size={'medium'} color={'#D51D53'} />
      :
      <TouchableOpacity style={styles.btn} onPress={handleRetry}>
        <Ionicons name="reload-sharp" size={hp('3%')} color="#050505" />
        <Text style={styles.textBtn}>Reintentar</Text>
      </TouchableOpacity>}
      {/* <TouchableOpacity style={styles.btn} onPress={handleClose}>
        <Ionicons name="close-circle-outline" size={hp('3%')} color="#050505" />
        <Text style={styles.textBtn}>Cerrar</Text>
      </TouchableOpacity> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: '#03152D',
  },
  closeBtn: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('2%'),
  },
  errorText: {
    fontSize: hp('2.5%'),
    color: '#D51D53',
    marginBottom: hp('8%'),
  },
  btn: {
    borderRadius: 10,
    width: wp('35%'),
    padding: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hp('2%'),
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
  },
  textBtn: {
    marginLeft: wp('2%'),
    color: '#050505',
    fontSize: hp('2.3%'),
    fontWeight: 'medium',
  },
});

export default ErrorScreen;
