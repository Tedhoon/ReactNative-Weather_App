import React from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import Weather from './app/Weather';
import * as Location from 'expo-location';

const API_KEY = "b7f1c4c0d46c7235a9ed00e747ee1f9e"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
    isLoaded : false,
    }
    }

 
  componentDidMount(){
    this._getWeather()
  } 

  _getWeather = async() =>{

    await Location.requestPermissionsAsync() 
    const _location = await Location.getCurrentPositionAsync() 
    console.log(_location) 
    const {coords :{latitude,longitude}} = _location 
    const _response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=${API_KEY}&units=metric`)
    const _json = await _response.json()
    this.setState({isLoaded: true, temp: Math.floor(_json.main.temp), title : _json.weather[0].main})
  }

    
  render(){
    return(

      <View style = {styles.container}>
      {this.state.isLoaded ? <Weather title={this.state.title} temp = {this.state.temp} /> : <ActivityIndicator style={styles.indicator} color="white" size="large"/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicator:{
    flex:1,
    alignItems:"center",
    justifyContent: "center",
    },
  container: {
    flex: 1,
  },
});
