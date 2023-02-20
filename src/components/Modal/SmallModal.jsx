import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';

import MButton from '../MButton';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 'auto',
   bgcolor: (theme) => theme.palette.secondary.dark,
   boxShadow: 24,
   py: 2,
   px: 3,
   borderRadius: '25px',
   textAlign: 'center',
};

export default function SmallModal({
   handleChange,
   smallHandleClose,
   smallOpen,
   heading,
   inputValue,
   setInputValue,
   isLoading,
}) {
   return (
      <div>
         <Modal
            open={smallOpen}
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
                     onClick={smallHandleClose}
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
                        fontSize: 30,
                        mb: 2,
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        // fontFamily: "Inter",
                     }}
                  >
                     {heading}
                  </Typography>

                  <TextareaAutosize
                     aria-label='minimum height'
                     minRows={3}
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     style={{
                        width: 500,
                        textAlign: 'center',
                        outline: 'none',
                        height: 180,
                        borderRadius: '25px',
                        backgroundColor: '#E6E6E6',
                        color: '#000',
                        fontSize: '22px',
                        fontWeight: 'bold',
                     }}
                  />

                  <br />

                  <MButton
                     loading={isLoading}
                     onClick={handleChange}
                     title={heading}
                  />
               </Box>
            </Box>
         </Modal>
      </div>
   );
}
