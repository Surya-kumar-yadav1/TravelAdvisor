import {react,useState,useEffect,createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { FilterContainer, TitleWrapper, FiltersWrapper, StyledFormControl } from './styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';

const List=({place,childClick,loding,type,setType,rating,setRating,onSearch})=>{

    const [elRefs,setElRefs]=useState([]);

    useEffect(() => {
        setElRefs((refs) =>
            Array(place?.length)
                .fill()
                .map((_, i) => refs[i] || createRef())
        );
    }, [place]);
    console.log("childClick:", childClick);
    return (
        <>
        <FilterContainer>
            <TitleWrapper>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: '#2c3e50',
                        letterSpacing: '0.5px',
                    }}
                    >
                    Restaurants, Hotels & Attractions Around You
                </Typography>
            </TitleWrapper>
            <Typography
                sx={{
                    textAlign: 'center',
                    color: '#666',
                    mb: 2,
                }}
                >
                Found {place?.length || 0} places
            </Typography>
            <FiltersWrapper>
                <StyledFormControl>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select value={type} onChange={(e)=>setType(e.target.value)} label="Category" labelId="category-select-label">
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </StyledFormControl>
                <StyledFormControl>
                    <InputLabel id="rating-select-label">Minimum Rating</InputLabel>
                    <Select value={rating} onChange={(e)=>setRating(e.target.value)} label="Minimum Rating" labelId="rating-select-label">
                        <MenuItem value="0">All</MenuItem>
                        <MenuItem value="2">Above 2</MenuItem>
                        <MenuItem value="3">Above 3</MenuItem>
                        <MenuItem value="4">Above 4</MenuItem>
                    </Select>
                </StyledFormControl>
                <Button 
                    variant="contained" 
                    onClick={onSearch}
                    sx={{ height: '56px', borderRadius: '12px', px: 4 }}
                    >
                    Search
                </Button>
            </FiltersWrapper>
        </FilterContainer>
        {
            loding ? (
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh',
                    }}
                >
                    <CircularProgress size="5rem" />
                </div>
            ):
        (
        <Grid container spacing={3} sx={{ justifyContent: 'space-evenly' }}>
            {place?.map((place,ind)=>(
                    <Grid item key={ind} xs={12} sm={6} md={5} lg={3}>
                        <PlaceDetails 
                            selected={childClick === place.location_id}
                            refProp={elRefs[ind]}
                            place={place}/>
                    </Grid>
                ))}
        </Grid>
        )}
        </>
    );
}
export default List;