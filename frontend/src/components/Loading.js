import * as React from 'react';

import {Typography, Modal, CircularProgress, makeStyles} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {changeLoading} from "../store/actions/loading.actions";

const useStyles = makeStyles((theme) => ({
    label: {
        marginRight: '20px'
    }
}))

export const Loading = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loading  = useSelector(state=> state.loadingReducer)
    return (
        <Modal
            open={loading.open}
            onClose={() => dispatch(changeLoading({open: false}))}
            className="d-flex justify-content-center align-items-center h-100 outline-none"
        >
            <div className="bg-white d-flex align-items-center rounded p-3 outline-none">
                <CircularProgress size={25} className={classes.label}/>
                <Typography variant='subtitle1' >
                    {loading.msg}
                </Typography>
            </div>
        </Modal>
    );
};