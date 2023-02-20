import { Card, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function RentingModalCard({ data, handleChange }) {

   return (
      <Card
         onClick={handleChange}
         sx={{
            maxWidth: 270,
            background: (theme) => theme.palette.primary.main,
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            px: 1,
            pb: 1,
            mx: 'auto',
            position: 'relative',
         }}
      >
         <Typography
            sx={{
               px: 1,
               py: 0.3,
               borderRadius: '8px',
               fontSize: 16,
               fontWeight: 'bold',
               cursor: 'pointer',
               // ml: "55%",
               textAlign: 'center',
               width: '100%',
               color: '#fff',
            }}
         >
            Rank: {data?.rank}
         </Typography>

         <Box
            component='img'
            src={data?.selectImg}
            sx={{
               width: '100%',
               borderRadius: '7px',
               height: '100%',
            }}
         />

         <Typography
            sx={{
               fontSize: 16,
               fontWeight: 'bold',
               zIndex: 4,
               color: '#fff',
               py: 0.3,
               textAlign: 'center',
            }}
         >
            {data?.name}
         </Typography>
      </Card>
   );
}
