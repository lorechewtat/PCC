import { AppBar, UserMenu } from 'react-admin';
import { styled } from '@mui/material/styles';

const MyAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // usar primary.main
}));

export default MyAppBar;