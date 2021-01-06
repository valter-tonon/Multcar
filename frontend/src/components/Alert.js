import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Error, CheckCircle} from '@material-ui/icons'
import {Modal} from "@material-ui/core";
import {changeAlert} from "../store/actions/alert.actions";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

export const Alert = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state => state.alertReducer)
    if(alert.open) {
        setTimeout(() => {
            dispatch(changeAlert({open: false}))
        }, alert.time)
    }
    return (
        <Modal open={alert.open}
            onClose={()=>dispatch(changeAlert({open:false}))}
               className="d-flex flex-column align-items-center justify-content-center h-100"
        >
            <Fade in={alert.open} timeout={500}>
                <div className="bg-white rounded d-flex align-items-center outline-none p-4">
                    {(alert.class === 'success') &&
                    <CheckCircle style={{fontSize: '2.5rem'}} className='mr-3 text-success'/>}
                    {(alert.class === 'error') &&
                    <Error style={{fontSize: '2.5rem'}} className='mr-3 text-danger'/>}
                    <Typography variant='subtitle2' className='font-weight-bold'>
                        {alert.msg}
                    </Typography>
                </div>
            </Fade>

        </Modal>
    );
};