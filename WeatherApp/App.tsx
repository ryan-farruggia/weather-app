import React, { useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import WeatherColumn from './components/WeatherColumn';
import { faCloud, faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons';
// in App.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import {  } from '@fortawesome/free-brands-svg-icons';

library.add(fab, faSquareCheck, faCloud)

const { width, height } = Dimensions.get('window');
function kelvinToFahrenheit(kelvin: number): number {
  const fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
  return fahrenheit;
}

function App(this: any, props: any): JSX.Element {
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

  const flatlistdata: DataType[] = [
    { id: '1', text: 'Pollen Outlook', description: 'Grass pollen increasing tomorrow' },
    { id: '2', text: 'Trending Now', description: 'Heavy Smoke Drifting Into East Coast' },
    { id: '3', text: "Today's Temperature", description: 'A little warmer than yesterday' },
    // More items...
  ];

  type DataType = {
    description: string,
    id: string;
    text: string;
  };

  const screenWidth = Dimensions.get('window').width;

  const renderItem: ListRenderItem<DataType> = ({ item }) => (
    <View style={{width: screenWidth, justifyContent: 'center', alignItems: 'center', paddingVertical: 15}}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>{item.text}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.page]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.container, {marginTop: 30}]}>
              <Text style={{fontSize: 80, color: 'white'}}>{temp}°</Text>
              <Text style={{fontSize: 20, marginLeft: 5, marginTop: -2, color: 'white'}}>{status}</Text>
            </View>
            <View style={{borderRadius: 20, marginTop: 50, marginLeft: 'auto', marginRight: 10}}>
              <Image style={{width: 140, height: 140}} source={require('./assets/images/sun.png')}/>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.container, {marginLeft: 5, marginTop: 10}]}>
              <Text style={{color: 'white', fontSize: 18}}>Sacramento</Text>
              <Text>{tempMax}° / {tempMin}° Feels like {feelsLike}°</Text>
              <Text>Humidity: {humidity}%</Text>
              <Text>
                {currentday}{', '}
                {currentDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
              </Text>
            </View>
          </View>
          <View style={[styles.roundContainer, {marginTop: 15, padding: 10}]}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              <WeatherColumn time='12 AM' icon={faCloudRain} temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon={faSun} temp={temp} color={'#ffc72b'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
              <WeatherColumn time='12 AM' icon='cloud' temp={temp} color={'white'}/>
            </ScrollView>
          </View>
          <View style={[styles.roundContainer, { alignItems: 'center', justifyContent: 'center', marginTop: 10, padding: 0, marginLeft: 0,}]}>
            <FlatList
                data={flatlistdata}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                snapToInterval={Dimensions.get("window").width}
                decelerationRate={"fast"}
              />
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
    backgroundColor: '#4d5064'
  },
  container: {
    padding: 10,
  },
  roundContainer: {
    borderRadius: 15,
    backgroundColor: '#3d3f4e',
    flexDirection: 'row',
  },
});

export default App;
