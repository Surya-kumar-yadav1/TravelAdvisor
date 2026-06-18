import { styled } from '@mui/material/styles';
import { Box, FormControl } from '@mui/material';

export const FilterContainer = styled(Box)({
  maxWidth: '900px',
  margin: '0 auto 30px auto',
  padding: '30px',
  borderRadius: '16px',

  background: 'rgba(255,255,255,0.85)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  border: '1px solid #e9ecef',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
  },
});

export const TitleWrapper = styled(Box)({
  textAlign: 'center',
  marginBottom: '25px',
});

export const FiltersWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
}));

export const StyledFormControl = styled(FormControl)({
  minWidth: '220px',

  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
});
