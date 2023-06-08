import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function WeatherColumn(props: any) {
  return (
    <View style={[styles.container]}>
        <Text style={{fontSize: 12}}>{props.time}</Text>
        <FontAwesomeIcon size={23} style={{marginTop: 10}} icon={props.icon} color={'white'} />
        <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600'}}>{props.temp}°</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
});

export default WeatherColumn;