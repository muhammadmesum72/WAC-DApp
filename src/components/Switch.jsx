import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import { ThreeD, TwoD, Rank, Id } from '@/assets';

const MaterialUISwitch = styled(Switch)(
    ({
        theme,
        leftlabel = '2D',
        rightlabel = '3D',
        dimensionalswitch,
        idrankswitch,
    }) => ({
        // width: 118,
        width: 138,
        height: '100%',
        padding: 0,
        borderRadius: '22px',

        '& .MuiSwitch-switchBase': {
            margin: 0,
            marginTop: 0,
            padding: 0,
            transform: 'translateX(1px)',
            '&.Mui-checked': {
                background: '#5a5856',
                fontSize: 20,

                transform: 'translateX(61px)',
                '& .MuiSwitch-thumb:before': {
                    content: `"${rightlabel}"`,
                    width: '100%',
                    height: '100%',
                    fontSize: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: '1px 1px 1px #000',
                },
                '&+ .MuiSwitch-track': {
                    opacity: 2,
                    background: `url(${
                        (dimensionalswitch && TwoD) || (idrankswitch && Id)
                    }), #9b958a96`,
                    backgroundSize: '20% 45%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '20% 48%',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            // width: 55.8,
            width: 75,
            height: 35,
            borderRadius: '22px',
            background: '#f9f7f7a8',

            '&:before': {
                content: `"${leftlabel}"`,
                width: '100%',
                height: '100%',
                fontSize: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textShadow: '1px 1px 1px #000',

                [theme.breakpoints.down('md')]: {
                    // backgroundImage: 'url(/static/svg/lightModeIcon2.svg)',
                },
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            paddingTop: '20px',
            height: 35,
            background: `url(${
                (dimensionalswitch && ThreeD) || (idrankswitch && Rank)
            }), #9b958a96`,
            backgroundSize: '20% 45%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '83% 50%',
        },
    })
);

export default function MSwitch({
    leftlabel,
    rightlabel,
    dimensionalswitch,
    idrankswitch,
    handleSwitch,
    ...other
}) {
    const switchHandler = (event) => {
        // THIS IS THE SOLUTION - use event.target.checked to get value of switch
        // setIsDark(event.target.checked);
        //  dispatch(changeAppTheme(event.target.checked));
        if (handleSwitch) handleSwitch(event.target.checked);
    };

    return (
        <FormControlLabel
            sx={{
                m: '0px',
            }}
            control={(
                <MaterialUISwitch
                    // checked={isDark}
                    leftlabel={leftlabel}
                    rightlabel={rightlabel}
                    dimensionalswitch={dimensionalswitch}
                    idrankswitch={idrankswitch}
                    onChange={switchHandler}
                    sx={{
                        m: 0,
                        p: 0,
                    }}
                    {...other}
                />
            )}
        />
    );
}
