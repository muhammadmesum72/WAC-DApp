


import {AppBar,
   Box,
   Button,
   IconButton,
   Link,
   Toolbar,
   Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Container from '@/components/Container';
import MenuDropDown from '@/components/DropDownMenu';
import WalletConnectButton from '@/components/WalletConnectButton';
import { useQueryBalance } from '@/hooks/react-query';
import { useQueryGetUserAssetsData } from '@/hooks/react-query/queries/myWapes-query';

import {bolt,
   discordIcon,
   gitbookIcon,
   medioIcon,
   twitterIcon,
   YellowCoin} from '../../assets';
import Iconify from '../../components/Iconify';
import Logo from '../../components/Logo';

//

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 83;

const RootStyle = styled(AppBar)(({ theme }) => ({
   boxShadow: 'none',
   // backgroundColor: transparent ? 'transparent' : theme.palette.main,
   zIndex: theme.zIndex.drawer + 1,
   [theme.breakpoints.down('sm')]: {
      background: '#2e2d2df7',
   },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
   display: 'flex',
   flexGrow: 1,
   background: theme.palette.main,
   minHeight: APPBAR_MOBILE,
   [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
   },
}));

// ----------------------------------------------------------------------

export const BUTTON_ARRAY = [
   {
      id: 0,
      title: 'Home',
      // link:' https://app.ebisusbay.com/collection/weird-apes-club '
      link: 'https://weirdapesclub.com/',

   }
  // {
  //    id: 1,
  //    title: 'Dashboard',
  //    link: ' https://weirdapesclub.com/',

  // }
   // {
   //   id: 2,
   //   title: 'Market',
   //   link: 'https://app.ebisusbay.com/collection/weird-apes-club',

   // }
];

export const ICON_BTN_ARRAY = [
   {
      id: 0,
      src: discordIcon,
      link: 'https://discord.gg/BmxRQnz6Nw',
   },
   {
      id: 1,
      src: gitbookIcon,
      link: 'https://weirdape.gitbook.io/weird-apes-club/weird-apes-club/summary',
   },
   {
      id: 2,
      src: medioIcon,
      link: 'https://medium.com/@WeirdApesClub',
   },
   {
      id: 3,
      src: twitterIcon,
      link: 'https://twitter.com/WeirdApesClub ',
   },
   {
      id: 3,
      src: bolt,
      link: 'https://snapshot.org/#/weirdapesclub.eth',
   }
];

export default function DashboardNavbar({ onOpenSidebar }) {

  const { data: getBalanceDetails } = useQueryGetUserAssetsData();

  let tokenBalance = getBalanceDetails?.userNFTsDetails?.[0];

  tokenBalance = Math.floor(tokenBalance / 10 ** 18);

  // const { isLoading: isLoadingBalance, data: balance } = useQueryBalance();
  // const token = balance?.tokenBalance;
  // const tokenBalance = token;

   return (
      <RootStyle id='header'>
         <Container
            sx={{
 px:{
xs:'0px !important', md:'24px !important', 
}, 
}}
         >
            <ToolbarStyle>
               <Box
                  sx={{
                     display: 'flex',
                     flexGrow: {
                        xs: 1,
                        xl: 0.3,
                     },
                     alignItems: 'center',
                     gap: {
                        md: 3,
                        xl: 6,
                     },
                     justifyContent: {
                        xs: 'space-between',
                        lg: 'start',
                     },
                     pr: 2,
                  }}
               >
                  <Logo />

                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: -1,
                     }}
                  >
                     <WalletConnectButton />

                     <Box
                        sx={{
                           display: {
                              xs: 'none',
                              sm: 'flex',
                           },
                           alignItems: 'center',
                           ml: 2,
                           // maxWidth:155,
                           width: 150,
                           justifyContent: 'center',
                           flexDirection: {
                              xs: 'column',
                              sm: 'row',
                           },
                           height: '100%',
                           background: (theme) => theme.palette.primary.lighter,
                           px: 1.5,
                           borderRadius: '7px',
                           py: {
                              sx: 0.6,
                              sm: 0.9,
                              md: 1.1,
                           },
                           mt: 1,

                           '& p': {
                              fontSize: {
                                 xs: '16px',
                                 sm: '20px',
                              },
                              px: 0.5,
                           },
                        }}
                     >
                        <Typography>{tokenBalance || 0}</Typography>

                        <Box
                           component='img'
                           src={YellowCoin}
                        />
                     </Box>
                  </Box>
               </Box>

               <Box
                  sx={{
                     flexGrow: 1,
                     display: {
                        xs: 'none',
                        lg: 'flex',
                     },
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: 'right',
                        gap: {
                           xs: 2,
                           lg: 1,
                        },
                        fontWeight: 'bold',
                        pr: 2.7,
                     }}
                  >
                     {BUTTON_ARRAY.map((btn, idx) => (
                        <Button
                           component={Link}
                           href={btn.link}
                           target='_blank'
                           key={idx + btn.id}
                           sx={{
                              maxWidth: idx === 1 ? '155px' : '160px',
                              width: '100%',
                              background: (theme) => theme.palette.primary.main,
                              color: '#fff',
                              borderRadius: 1,
                              px: idx === 1 && 4,
                              fontSize: 19,
                              letterSpacing: '0.06em',
                              '&:hover': {
                                 background: '#919190',
                                 color: '#fff',
                              },
                           }}
                        // onClick=''
                        >
                           {btn.title}
                        </Button>
                     ))}

                     <MenuDropDown />
                  </Box>

                  {/* <> */}

                  <Box
                     sx={{
                        '& svg': {
                           fill: '#fff !important',
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexGrow: 0.15,
                     }}
                  >
                     {ICON_BTN_ARRAY.map((icon, idx) => (
                        <IconButton
                           component={Link}
                           target='_blank'
                           href={icon.link}
                           key={idx + icon.id}
                           sx={{
                              color: 'common.white',
                              background: 'rgba(255, 255, 255, 0.5)',
                              borderRadius: 1,
                              width: idx === 4 ? 40 : 42,
                              ml: idx === 4 ? 2 : 0,
                              // height:'100%',
                              px: {
                                 xs: 1,
                                 xl: 1,
                              },
                           }}
                        >
                           <Box
                              component='img'
                              src={icon.src}
                              sx={{
                                 color: '#fff',
                                 width: 30,
                              }}
                           />
                        </IconButton>
                     ))}
                  </Box>
               </Box>

               <IconButton
                  onClick={onOpenSidebar}
                  sx={{
                     mr: 1,
                     color: 'common.white',
                     display: {
                        lg: 'none',
                     },
                     // width: 10,
                     border: 'none !important',
                  }}
               >
                  <Iconify icon='eva:menu-2-fill' />
               </IconButton>
            </ToolbarStyle>
         </Container>
      </RootStyle>
   );
}
