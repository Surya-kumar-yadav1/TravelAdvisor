import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HeaderContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0d2b77 0%, #052f89 100%)',
  padding: '14px 0',
  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
});

export const ToolbarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '15px',
  },
}));

export const BrandSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '18px',

  '& h5': {
    color: '#fff',
    fontWeight: 700,
    fontSize: '32px',
    letterSpacing: '-0.5px',
  },

  '& p': {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '15px',
  },
});
export const SearchWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '300px',
  height: '48px',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '26px',
  padding: '6px 14px',
  width: '380px',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: 'rgba(255,255,255,0.2)',
  },

  '& .MuiSvgIcon-root': {
    color: '#fff',
    marginRight: '8px',
  },

  '& .MuiAutocomplete-root': {
    flex: 1,
  },

  '& .MuiInputBase-root': {
    color: '#fff',
    padding: 0,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },

  '& input::placeholder': {
    color: 'rgba(255,255,255,0.8)',
    opacity: 1,
  },
});
