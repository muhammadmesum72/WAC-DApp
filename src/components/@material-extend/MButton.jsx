import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MButton = ({ label, path, sx, ...other }) => {
   const navigate = useNavigate();

   const handleRoutes = () => {
      navigate(`${path}`);
   };

   return (
      <Button
         variant='contained'
         color='primary'
         onClick={handleRoutes}
         sx={{
            minWidth: 'fit-content',
            filter: 'drop-shadow(0px 4px 15px rgba(255, 255, 255, 0.6))',
            flex: 1,
            ...sx,
         }}
         {...other}
      >
         {label}
      </Button>
   );
};

export default MButton;
