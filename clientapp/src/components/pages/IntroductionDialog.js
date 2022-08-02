import { DialogTitle, Dialog, Button, DialogActions, DialogContentText, DialogContent } from '@mui/material';
import anime from '../../assets/img/anime.png';
import { useState } from 'react';

const IntroductionDialog = () => {

    const [openDialog, setOpenDialog] = useState(true);
    const dontRemind = () => {
        localStorage.setItem("remind", false);
        setOpenDialog(false);
    }

    return (
        <Dialog open={localStorage.getItem("remind") !== "false" && openDialog}>
            <img src={anime} alt="anime" className='w-50 mx-auto' />
            <DialogTitle>Unofficial Swinburne GPA Calculator</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hi! This application is not OFFICIAL. It is made to make calculating Swinburne CGPAs easier rather than
                    manual math. This is just a pet project written in React.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} autoFocus>
                    OK!
                </Button>
                <Button onClick={() => dontRemind()} autoFocus variant="outlined">
                    Don't Remind Me Again
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default IntroductionDialog;