import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SharedAlertDialog = ({ title, message, open, handleCancel, handleOK }) => {
    const { t } = useTranslation();

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>{t('Cancel')}</Button>
                    <Button onClick={handleOK} variant="text" className='text-white bg-danger'>{t('OK')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SharedAlertDialog;