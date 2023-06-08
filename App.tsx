import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import WeatherColumn from './components/WeatherColumn';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
// in App.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'

library.add(fab, faSquareCheck, faCloud)

const { width, height } = Dimensions.get('window');
function kelvinToFahrenheit(kelvin: number): number {
  const fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
  return fahrenheit;
}

// Define your screens
function Screen1() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 1</Text>
    </View>
  );
}

function Screen2() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 2</Text>
    </View>
  );
}

function App(props: any): JSX.Element {
  const [data, setData] = useState<string | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  
  useEffect(() => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Sacramento,us&APPID=021d13be2fe6ed4d7093015004d33566')
      .then(response => response.json())
      .then(data => {
        const jsonString = JSON.stringify(data);
        setData(jsonString);
        const temp = kelvinToFahrenheit(data.main.temp);
        setTemp(temp);
        const feelsLike = kelvinToFahrenheit(data.main.feels_like);
        setFeelsLike(feelsLike);
        const humidity = data.main.humidity;
        setHumidity(humidity);
        const tempMin = kelvinToFahrenheit(data.main.temp_min);
        setTempMin(tempMin);
        const tempMax = kelvinToFahrenheit(data.main.temp_max);
        setTempMax(tempMax);
        const status = data.weather[0].main;
        setStatus(status);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = currentDate.getDay();
  let currentday = dayNames[day];

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.page]}>
          <View style={[styles.container, {marginTop: 40}]}>
            <Text style={{fontSize: 80, color: 'white'}}>{temp}°</Text>
            <Text style={{fontSize: 20, marginLeft: 5, marginTop: -2, color: 'white'}}>{status}</Text>
          </View>
          <View style={[styles.container, {marginLeft: 5, marginTop: 10}]}>
            <Text style={{color: 'white', fontSize: 18}}>Sacramento</Text>
            <Text>{tempMax}° / {tempMin}° Feels like {feelsLike}°</Text>
            <Text>Humidity: {humidity}%</Text>
            <Text>
              {currentday}{', '}
              {currentDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Text>
          </View>
          <View style={[styles.roundContainer, {marginTop: 15}]}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp}/>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: width, 
    minHeight: height,
    padding: 10,
    backgroundColor: '#444579'
  },
  container: {
    padding: 10,
  },
  roundContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#3d3f4e',
    flexDirection: 'row',
  },
});

export default App;
