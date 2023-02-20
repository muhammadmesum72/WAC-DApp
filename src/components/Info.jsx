import React, { useEffect, useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

const Info = ({ message }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef?.current?.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Box
                component='img'
                alt='info icon'
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                // src={open ? '/img/svg/info-icon.svg' : '/img/svg/info-icon.svg'}
                src='/img/svg/info-icon.svg'
                sx={{
                    cursor: 'pointer',
                    width: 20,
                    height: 20,
                }}
                ref={anchorRef}
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
            />

            <Popper
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
                style={{
                    zIndex: 9999999,
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                        placement === 'bottom-start'
                            ? 'left top'
                            : 'left bottom',
                        }}
                    >
                        <Paper
                            sx={{
                                mt: 1,
                                maxWidth: 248,
                                p: 2,
                                zIndex: 99999999,
                                background: 'rgba(66, 75, 152, 0.23)',
                                backdropFilter: 'blur(34px)',
                            }}
                        >
                            <Typography variant='h6'>{message}</Typography>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default Info;
