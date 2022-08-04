import { DialogTitle, Dialog, Button, DialogActions, DialogContentText, DialogContent } from '@mui/material';
import anime from '../../../assets/img/anime.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const IntroductionDialog = () => {

    const {t} = useTranslation();    
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
                    {t('IntroductionMessage')}                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} autoFocus>
                    {t('OK')}
                </Button>
                <Button onClick={() => dontRemind()} autoFocus variant="outlined">
                    {t('DoNotRemind')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default IntroductionDialog;