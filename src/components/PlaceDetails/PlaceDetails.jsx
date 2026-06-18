import react,{useEffect} from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';
import useStyles from './styles';

const PlaceDetails=({place,refProp,selected})=>{
    const classes = useStyles();
    useEffect(() => {
        if (selected) {
            refProp?.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [selected, refProp]);
    return (
        <div ref={refProp}>
        <Card elevation={6} className={classes.card}  ref={refProp}>
            <CardMedia 
            component="img"
            className={classes.media}
            image={place.photo ? place.photo.images.large.url : 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
            title={place.name}
            alt={place.name} 
            />
        <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" className={classes.title}>{place.name}</Typography>
            <Box className={classes.ratingBox}>
                <Rating name="read-only" value={Number(place.rating)} readOnly />
                <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
            </Box>
            <Box className={classes.infoRow}>
                <Typography component="legend" className={classes.infoLabel}>Price</Typography>
                <Typography variant="subtitle1" className={classes.infoValue}>
                    {place.price_level}
                </Typography>
            </Box>
            <Box className={classes.infoRow}>
                <Typography component="legend" className={classes.infoLabel}>Ranking</Typography>
                <Typography variant="subtitle1" className={classes.infoValue}>
                    {place.ranking}
                </Typography>
            </Box>
            {place?.awards?.map((award) => (
                <Box className={classes.contactBox} key={award.display_name}>
                    <img src={award.images.small} />
                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                </Box>
            ))}
            <Box className={classes.chipContainer}>
                {place?.cuisine?.slice(0, 4).map(({ name }) => (
                    <Chip
                    key={name}
                    size="small"
                    label={name}
                    className={classes.chip}
                    />
                ))}

                {place?.cuisine?.length > 4 && (
                    <Chip
                    size="small"
                    label={`+${place.cuisine.length - 4} more`}
                    />
                )}
            </Box>
            {place.address && (
                <Box className={classes.contactBox}>
                    <LocationOnIcon className={classes.contactIcon} /><Typography variant="body2"
                    sx={{
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                        flex: 1,
                    }}
                    >{place.address}</Typography>
                </Box>
            )}
            {place.phone && (
                <Box className={classes.contactBox}>
                    <PhoneIcon className={classes.contactIcon} /> <Typography variant="body2">{place.phone}</Typography>
                </Box>
            )}
        </CardContent>
        <CardActions className={classes.actions}>
            <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                Website
            </Button>
        </CardActions>
        </Card>
        </div>
    );
}
export default PlaceDetails;