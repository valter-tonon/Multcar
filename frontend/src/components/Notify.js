import * as React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles, SnackbarContent} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {green, red} from "@material-ui/core/colors";
import {changeNotify} from "../store/actions/notify.actions";

const useStyles = makeStyles({
    success: {
        backgroundColor: green[500]
    } ,
    error: {
        backgroundColor: red[600]
    }
})

export const Notify = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const notify = useSelector(state => state.notifyReducer)
    return (
        <Snackbar
            anchorOrigin={{
                horizontal: notify.horizontal,
                vertical: notify.vertical
            }}
            open={notify.open}
            autoHideDuration={notify.time}
            onClose={() => dispatch(changeNotify({open:false}))}
        >
            <SnackbarContent className={'d-flex justify-content-center ' + classes[notify.class]}
                message={
                    <span className='d-flex align-items-center'>{notify.msg}</span>
                }
            >
            </SnackbarContent>
        </Snackbar>

    );
};
