import {apiAuth} from "../../utils/api";
import {changeLoading} from "./loading.actions";

export const actionTypes = {
    CHANGE : "VEHICLE_CHANGE",
    SUCCESS : "SUCCESS_VEHICLE",
    ERROR : "ERROR_VEHICLE",
    INDEX : "VEHICLE_INDEX",
    DESTROY : "VEHICLE_DESTROY"
}

export const changeVehicle = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const successVehicle = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const errorVehicles = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const indexResponse = (payload, isLoadMore) => ({
    type: actionTypes.INDEX,
    payload,
    isLoadMore
})

export const index = (query, isLoadMore) => dispatch => {
    return apiAuth.get('/vehicles?' + new URLSearchParams(query))
        .then(res => {
            if (typeof res !== 'undefined') {
                dispatch(indexResponse(res.data, isLoadMore))
            }
        })
}

export const store = () => dispatch => {
    return apiAuth.post('/vehicles')
        .then(res => {
            if (typeof res !== 'undefined') {
                dispatch(indexResponse(res.data))
            }
        })
}
export const show = (id) => dispatch => {
    return apiAuth.get('/vehicles/' + id)
        .then(res => {
            if (typeof res !== 'undefined') {
                dispatch(indexResponse(res.data))
            }
        })
}

export const update = (data) => dispatch => {
    dispatch(changeLoading({open: true}))
    apiAuth.put('/vehicles/' + data.id, data)
        .then(res => {
            dispatch(changeLoading({open: false}))
            if (typeof res !== "undefined") {
                if (res.data.error) {
                    dispatch(successVehicle(false))
                    dispatch(errorVehicles(res.data.error))
                }
                if (res.data.status === 200) {
                    dispatch(successVehicle(true))
                }
            }
        })
}

export const destroyResponse = (payload) => ({
    type: actionTypes.DESTROY,
    payload
})

export const destroy = (id) => dispatch =>{
    apiAuth.delete('/vehicles/' + id)
        .then(res => {
            if( typeof res !== "undefined"){
                if (res.data.status === 200){
                    dispatch(destroyResponse(id))
                }
            }
        })
}

export const cep = (zipCode) => dispatch => {
    if(zipCode.length > 8 ) {
        return apiAuth.post('webservice/cep', {
            cep: zipCode
        }).then(res => typeof res !== "undefined" && dispatch(changeVehicle(res.data)))
    }
}

export const brand = (vehicle_type) => dispatch => {
    dispatch(changeLoading({open:true}))
    return apiAuth.get('vehicles/' + vehicle_type + '/brand')
        .then(res => {
            dispatch(changeLoading({open:false}))
            if(typeof res !== "undefined") {
                dispatch(indexResponse(res.data))
            }
        })
}

export const model = (vehicle_type, vehicle_brand) => dispatch => {
    dispatch(changeLoading({open:true}))
    return apiAuth.get('vehicles/' + vehicle_type + '/' + vehicle_brand + '/model')
        .then(res => {
            dispatch(changeLoading({open:false}))
            if(typeof res !== "undefined") {
                dispatch(indexResponse(res.data))
            }
        })
}

export const version = (vehicle_brand, vehicle_model) => dispatch => {
    dispatch(changeLoading({open:true}))
    return apiAuth.get('vehicles/' + vehicle_brand + '/' + vehicle_model + '/version')
        .then(res => {
            dispatch(changeLoading({open:false}))
            if(typeof res !== "undefined") {
                dispatch(indexResponse(res.data))
            }
        })
}
