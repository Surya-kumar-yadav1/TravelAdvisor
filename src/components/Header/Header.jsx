import react,{useState} from 'react';
import { Typography, InputBase, Box ,TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { HeaderContainer, ToolbarWrapper, BrandSection, SearchWrapper } from './styles';
import {Autocomplete} from '@mui/material';
const Header = ({setCoordinates}) => {
    const [searchText, setSearchText] = useState('');
    const [places, setPlaces] = useState([]);
    const handleSearch = async (value) => {
        setSearchText(value);
        if (!value) {
            setPlaces([]);
            return;
        }
        try {
            const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${value}&format=jsonv2&limit=5`
            );
            const data = await response.json();
            setPlaces(data);
        } catch (err) {
            console.log(err);
        }
    };
    const handlePlaceSelect = (place) => {
        if (!place) return;
        setCoordinates({
            lat: Number(place.lat),
            lng: Number(place.lon),
        });
    };
    return (
        <HeaderContainer>
            <ToolbarWrapper>
                <BrandSection>
                    <Typography variant='h5'>
                        TravelAdvisor
                    </Typography>
                    <Typography>Explore new places.</Typography>
                </BrandSection>
                <SearchWrapper>
                    <SearchIcon />
                    <Autocomplete
                        options={places}
                        getOptionLabel={(option) => option.display_name || ''}
                        onInputChange={(event, value) => handleSearch(value)}
                        onChange={(event, value) => handlePlaceSelect(value)}
                        sx={{
                            width: '100%',
                            '& .MuiAutocomplete-paper': {
                            borderRadius: '12px',
                            },
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Search cities, hotels..."
                            sx={{
                            '& .MuiOutlinedInput-root': {
                                color: '#fff',
                                '& fieldset': {
                                border: 'none',
                                },
                            },
                            }}
                        />
                        )}
                    />
                    </SearchWrapper>
            </ToolbarWrapper>
        </HeaderContainer>
    );
}
export default Header;