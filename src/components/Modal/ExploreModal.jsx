import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ModalCard from '../card/ModalCard';
import MButton from '../MButton';
import Scrollbar from '../Scrollbar';
import ModalContent from './ModalContent';
import SmallModal from './SmallModal';

export default function ExploreModal({ selectedCard, open, handleClose }) {
   // for transfer Modal
   const [transfer, setTransfer] = useState(false);
   const handleOpenTransferModal = () => setTransfer(true);
   const handleCloseTransferModal = (inputValue) => {
      setTransfer(false);
   };
   // for Change Name Modal
   const [changeName, setChangeName] = useState(false);
   const handleOpenChangeNameModal = () => setChangeName(true);
   const handleCloseChangeNameModal = (inputValue) => {
      setChangeName(false);
   };

   // for change Lore Modal
   const [changeLore, setChangeLore] = useState(false);
   const handleOpenChangeLoreModal = () => setChangeLore(true);
   const handleCloseChangeLoreModal = (inputValue) => {
      setChangeLore(false);
   };

   return (
      <div>
         <Modal
            open={open}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box
               sx={{
                  border: 'none !important',
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'end',
                     height: 70,
                     alignItems: 'center',
                  }}
               >
                  <Button
                     onClick={handleClose}
                     sx={{
                        bgcolor: 'red !important',
                        color: '#fff',
                        width: 120,
                        borderRadius: '20px',
                        mr: 5,
                        fontSize: 18,
                  
                     }}
                  >
                     Close
                  </Button>
               </Box>

               <Box
                  sx={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     bgcolor: '#7e7d7d',
                     boxShadow: 24,
                     p: {
                        xs: 2,
                        sm: 3,
                        md: 3,
                        lg: 4,
                     },
                     borderRadius: '40px',
                     maxWidth: 1272,
                     width: '100%',
                     height: '80vh',
                     mt: 2,
                     border: '0px solid #000 !important',
                     overflow: 'auto',
                  }}
               >
                  <Scrollbar>
                     <Grid
                        item
                        container
                        xs={12}
                        sx={{
                           justifyContent: 'space-around',
                        }}
                     >
                        <Grid
                           item
                           container
                           xs={12}
                           sx={{
                              py: 2,
                              gap: 2,
                              display: {
                                 xs: 'grid',
                                 sm: 'flex',
                              },
                              gridTemplateColumns: {
                                 xs: 'auto auto',
                              },
                           }}
                        >
                           <MButton
                              onClick={handleOpenChangeNameModal}
                              title='Change Name'
                              sx={{
                                 fontSize: 22,
                              }}
                           />

                           <MButton
                              onClick={handleOpenChangeLoreModal}
                              title='Change Lore'
                              sx={{
                                 fontSize: 22,
                              }}
                           />

                           <MButton
                              onClick={handleOpenTransferModal}
                              title='Transfer'
                              sx={{
                                 fontSize: 22,
                              }}
                           />

                           <MButton
                              title='Stake'
                              sx={{
                                 fontSize: 22,
                              }}
                           />
                        </Grid>

                        <SmallModal
                           open={transfer}
                           smallHandleClose={handleCloseTransferModal}
                           heading='Transfer'
                        />

                        <SmallModal
                           open={changeName}
                           smallHandleClose={handleCloseChangeNameModal}
                           heading='Change Name'
                           // setNewInput={setNewInput}
                           // newInput={newInput}
                        />

                        <SmallModal
                           open={changeLore}
                           smallHandleClose={handleCloseChangeLoreModal}
                           heading='Change Lore'
                        />

                        <Grid
                           item
                           xs={12}
                           sm={12}
                           md={4.5}
                           lg={4.5}
                        >
                        {/*  */}
                        </Grid>

                        <Grid
                           item
                           xs={12}
                           sm={12}
                           md={7.5}
                           lg={7.5}
                           sx={{
                              px: {
                                 xs: 0,
                                 sm: 0,
                                 md: 2,
                                 lg: 2,
                              },
                              mt: {
                                 xs: 3,
                                 sm: 4,
                                 md: 1,
                                 lg: 0,
                              },
                           }}
                        >
                           <ModalContent />
                        </Grid>
                     </Grid>
                  </Scrollbar>
               </Box>
            </Box>
         </Modal>
      </div>
   );
}
