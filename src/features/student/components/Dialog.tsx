import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export interface DialogProps {
  title: string;
  noText: string;
  yesText: string;
  isOpen: boolean;
  content: string;
  confirmOption: (option: 'y' | 'n' | '') => void;
}
export default function AlertDialog({ title, content, noText, yesText, isOpen, confirmOption }: DialogProps) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => confirmOption('')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={() => confirmOption('n')}>
            {noText}
          </Button>
          <Button variant="contained" color="error" onClick={() => confirmOption('y')} autoFocus>
            {yesText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
