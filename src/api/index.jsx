import axios from 'axios';

// 
export const getPlaceData = async (type,sw,ne)=>{
    try{
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_TRAVEL_DATA_API,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });
        return data;
    }
    catch(err){
        console.log(err);
    }
}
export const getWeatherData=async (lat,lng)=>{
    try{
        const {data} = await axios.get('https://open-weather13.p.rapidapi.com/latlon',{
            params: {
                latitude: lat,
                longitude: lng,
                lang: 'EN'
            },
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_WEATHER_API,
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });
        console.log(data);
        return data;
    } catch(err){
        console.log(err);
    }
}