import react from 'react';
import GoogleMapReact from 'google-map-react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Rating from '@mui/material/Rating';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { mapContainerStyle } from './styles';

const Map=({weatherData,setCoordinates,setBounds,coordinates,place,setChildClicked})=>{
    const isDesktop=useMediaQuery('(min-width:600px)');
    return (
        <div style={{ ...mapContainerStyle, position: 'relative' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key : import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50 ,50 ,50 ,50]}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
                onChange={(e)=>{
                    setCoordinates({lat:e.center.lat,lng:e.center.lng});
                    setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
                }}
                onChildClick={(child)=>{
                    console.log('map clicked:', child);
                    setChildClicked(child);                    
                }}
            >
                {place?.map((plc,i)=>(
                    <div
                        lat={Number(plc.latitude)}
                        lng={Number(plc.longitude)}
                        key={plc.location_id}
                    >
                        {
                            !isDesktop?(
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />):
                            (   <Paper 
                                    elevation={3} 
                                    sx={{
                                        padding: '10px 15px',
                                        borderRadius: '0 18px 18px 18px',
                                        border:'0.2px solid black',
                                        backgroundColor: '#fff',
                                        width: { xs: '5rem', sm: '6rem', md: '7rem', lg: '8rem' },
                                        height: 'auto',
                                        minHeight: { xs: '5rem', sm: '6rem', md: '7rem', lg: '8rem' },
                                    }}>
                                    <Typography variant='subtitle2' gutterBottom style={{ fontWeight: '600', color: '#333', margin: '0' }}>
                                        {plc.name?.length > 30 ? `${plc.name.slice(0, 30)}...` : plc.name}
                                    </Typography>
                                    <img src={plc.photo ? plc.photo.images.large.url : 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                                    alt={plc.name} 
                                    style={{    width: '100%', 
                                                height: '60px', 
                                                borderRadius: '6px', 
                                                objectFit: 'cover', 
                                                marginTop: '3px',
                                                padding:'3px 0 2px 0' }} />
                                    <Rating size='small' value={Number(plc.rating)} readOnly  sx={{ fontSize: '1.2em' }} />
                                </Paper>)
                        }
                    </div>
                ))}
            </GoogleMapReact>
            {weatherData?.coord && (
                <div
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        zIndex: 5,
                        background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)',
                        padding: '10px',
                        borderRadius: '15px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '90px',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                        style={{
                            width: '60px',
                            height: '60px',
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                        fontWeight: 600,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        }}
                    >
                        {weatherData.weather[0].main}
                    </Typography>
                    <div
                        style={{
                        fontSize: '14px',
                        marginTop: '4px',
                        fontWeight: 700,
                        }}
                    >
                        {Math.round(weatherData.main.temp - 273.15)}°C
                    </div>
                </div>
            )}
        </div>
    );
}
export default Map;