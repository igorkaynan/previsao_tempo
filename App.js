import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ecec1ffc89a81e8f52ddc550e524d91c';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão negada para acessar a localização');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = location.coords;

      // Obter nome da cidade
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      console.log("📍 Endereço retornado:", address[0]);

      let cidadeDetectada =
        address[0]?.city ||
        address[0]?.subregion ||
        address[0]?.region ||
        'Cidade desconhecida';

      setCity(cidadeDetectada);

      // Obter clima
      const response = await axios.get(API_URL, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
          lang: 'pt_br',
        },
      });

      setWeather(response.data);
    } catch (error) {
      console.log("Erro ao buscar clima:", error);
      setErrorMsg('Erro ao obter dados do clima');
    }
  }

  function getBackgroundColor() {
    if (!weather) return '#6495ED';
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('rain')) return '#4A7C8E';
    if (main.includes('cloud')) return '#8B95A1';
    if (main.includes('clear')) return '#87CEEB';
    return '#6495ED';
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.cityName}>Carregando dados...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.cityName}>{city}</Text>
      <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Sensação</Text>
          <Text style={styles.infoValue}>{Math.round(weather.main.feels_like)}°C</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Umidade</Text>
          <Text style={styles.infoValue}>{weather.main.humidity}%</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Vento</Text>
          <Text style={styles.infoValue}>{weather.wind.speed} m/s</Text>
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
    textTransform: 'capitalize',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    minWidth: 80,
  },
  infoLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
