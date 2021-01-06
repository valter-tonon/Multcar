// @flow
import * as React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


export const Confirm = (props) => {
    return (
        <Dialog
            open={open}
            onClose={()=>props.onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Excluir"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deseja mesmo excluir este item?
                </DialogContentText>
            </DialogContent>
            <DialogActions className="justify-content-center mb-2">
                <Button onClick={() => props.onClose()}
                        color="primary"
                        variant='outlined'>
                    Cancelar
                </Button>
                <Button onClick={() => props.onConfirm()}
                        color="secondary"
                        variant='contained'>
                    Exluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};