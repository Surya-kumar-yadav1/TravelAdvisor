import react,{useState,useEffect} from 'react'
import { CssBaseline,Grid } from '@mui/material';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlaceData,getWeatherData } from './api';
function App() {
  const [place,setPlace]=useState([]);
  const [coordinates,setCoordinates]=useState({lat:0,lng:0});
  const [bounds,setBounds]=useState({sw:{lat:0,lng:0},ne:{lat:0,lng:0}});
  const [childClick,setChildClicked]=useState(null);
  const [loding,setLoding]=useState(false);

  const [type,setType]=useState("restaurants");
  const [rating,setRating]=useState("0");

  const [filteredPlace,setFilteredPlace]=useState([]);

  const [weatherData,setWeatherData]=useState([]);
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude});
    })
  },[])

  useEffect(()=>{
    const filteredPlace = place?.filter((place)=> place.rating > rating);
    setFilteredPlace(filteredPlace);
  },[rating])

const handleSearch = async () => {
  if (!type || !bounds?.sw || !bounds?.ne) {
    return;
  }

  setLoding(true);

  try {
    const [weatherResult, placesResult] = await Promise.allSettled([
      getWeatherData(coordinates.lat, coordinates.lng),
      getPlaceData(type, bounds.sw, bounds.ne),
    ]);

    if (weatherResult.status === 'fulfilled') {
      setWeatherData(weatherResult.value ?? []);
    } else {
      console.error('Weather request failed:', weatherResult.reason);
    }

    if (placesResult.status === 'fulfilled') {
      const data = placesResult.value ?? [];

      setPlace(
        data.filter(
          (item) => item?.name && Number(item.num_reviews) > 0
        )
      );
    } else {
      console.error('Places request failed:', placesResult.reason);
    }
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    setLoding(false);
  }
};

  return (
    <>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates}/>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Map
          weatherData={weatherData}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          place={filteredPlace.length ? filteredPlace : place}
          setChildClicked={setChildClicked}
        />
      </div>
      <Grid container spacing={3} style={{ width: '100%', padding: '20px' }}>
        <Grid size={{xs:12,md:12}}>
            <List 
              loding={loding} 
              place={filteredPlace.length ? filteredPlace : place} 
              childClick={childClick} 
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              onSearch={handleSearch}
              />
        </Grid> 
      </Grid>
    </>
  )
}

export default App
