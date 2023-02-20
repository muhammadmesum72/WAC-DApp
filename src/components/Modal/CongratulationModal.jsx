
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import MButton from '../MButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
xs:'93%', md:'auto',
},
    bgcolor: (theme) => theme.palette.secondary.dark,
    boxShadow: 24,
    py: {
        xs: 3, md: 6,
    },
    px: {
        xs: 3, sm: 10,
    },
    borderRadius: '25px',
    textAlign: 'center',
};

export default function CongratulationModal({
    handleClose,
    open,
}) {
    return (
        <div>
            <Modal
               open={open}
               aria-labelledby='modal-modal-title'
               aria-describedby='modal-modal-description'
            >
                <Box>
                    <Box
                       sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            height: 70,
                            alignItems: 'center',
                        }}
                    >
                        <MButton
                           onClick={handleClose}
                           title='Close'
                           sx={{
                                width: 120,
                                mr: 5,
                                fontSize: 18,
                            }}
                        />
                    </Box>

                    <Box sx={style}>
                        <Typography
                           sx={{
                                fontSize: 32,
                            }}
                        >Congratulations!
                            <br />

                            You will receive your incubators<br /> shortly!
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
