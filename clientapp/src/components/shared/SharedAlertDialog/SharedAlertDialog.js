import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const SharedAlertDialog = ({ title, message, open, handleCancel, handleOK }) => {
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOK} variant="text" className='text-white bg-danger'>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SharedAlertDialog;