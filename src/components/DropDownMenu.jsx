import * as React from 'react';

import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        background: '#2e2d2b',
        fontWeight: 'normal',

        '& .MuiMenu-list': {
            padding: '4px 0',
            fontWeight: 100,

        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const MENU_ITEMS = [
    {
        id: 0,
        name: 'GWAC on Ebisu\'s Bay',
        link: 'https://app.ebisusbay.com/collection/weird-apes-club',
    },
    {
        id: 1,
        name: 'BWAC on Ebisu\'s Bay',
        link: 'https://app.ebisusbay.com/collection/baby-weird-apes',
    },
    {
        id: 2,
        name: 'GWAC on Crypto.com',
        link: 'https://crypto.com/nft/collection/1db6b60ec49a519eea1d0a84ac0fcc1f',
    },
    {
        id: 3,
        name: 'BWAC on Crypto.com',
        link: 'https://crypto.com/nft/collection/1deb361df25a6d67ea3af85c081362b4',
    }
];

export default function MenuDropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id='demo-customized-button'
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                variant='contained'
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    maxWidth: '160px',
                    width: '100%',
                    background: (theme) => theme.palette.primary.main,
                    color: '#fff',
                    borderRadius: 1,
                    fontSize: 20,
                    letterSpacing: '0.06em',
                    boxShadow: 'none',
                    '&:hover': {
                        background: '#919190',
                        color: '#fff',
                    },
                }}
            >
                Market
            </Button>

            <StyledMenu
                id='demo-customized-menu'
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {MENU_ITEMS.map(item => (
                    <MenuItem
                        key={item.id}
                        component={Link}
                        href={item.link}
                        onClick={handleClose}
                        disableRipple
                        sx={{
                            fontWeight: '100 !important', fontSize: 20, letterSpacing: '0.03em',
                            '&:hover':{
                                background:
                  'linear-gradient(180deg, #FFD494 0%, #C57600 99.98%, #FF9900 99.99%)',
                                color:'#fff',
                            },
                        }}
                    >
                        {item.name}
                    </MenuItem>
                ))}

            </StyledMenu>
        </div>
    );
}
