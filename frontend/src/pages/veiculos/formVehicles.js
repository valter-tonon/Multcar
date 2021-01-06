// @flow
import * as React from 'react';
import {Header} from "../../components/Header";
import {useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch, useSelector} from "react-redux";
import {brand, cep, changeVehicle, model, show, store, version} from "../../store/actions/vehicles.actions";
import TextField from "@material-ui/core/TextField";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import {InputAdornment} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NumberFormat from 'react-number-format'
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const TextMaskedCustom = (props) => {
    const { inputRef, ...other} = props
    let mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/ ,/\d/ ,/\d/]

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={mask}
            guide={false}
        />
    )
}

const numberFormatCustom = (props) => {
    const {inputRef, onChange, ...other} = props
    return (
        <NumberFormat
            {...other}
            decimalSeparator=","
            thousandSeparator='.'
            prefix={other.name}
        />
    )
}

export const FormVehicles = (props) => {
    const [state,  setState] = useState({
        isLoading: true,
        isLoadingCep: false,
        isDeleted: null,
        redirect: false,
        types: 0,
        confirm: null,
        vehicleId: (props.match.params.id) ? props.match.params.id : null
    })

    const dispatch = useDispatch()
    const data = useSelector(state => state.vehiclesReducer)
    const index = () => {
        if(state.vehicleId) {
            dispatch(show(state.vehicleId)).then(res => {
                if (res){
                    setState({isLoading: false})
                }
            })
        }else{
            dispatch(store()).then(res => {
                    setState({isLoading: false})
            })
        }
    }

    useEffect(() => {
        index()
    },[])
    return (

        <div>
            <Header title="Gerenciar Veículos"/>
            <div className='container mt-4 pt-3' >
                {(state.isLoading)
                    ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div>
                    :
                    <div className="row">
                        <div className="col-md-7 form-group">
                            <h3 className="font-weight-normal mb-4">Localização do Veículo</h3>
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-md-7">
                                        <label className="label-custom mb-2">CEP</label>
                                        <TextField
                                            style={(state.isLoadingCep) ? {opacity: 0.5} : {}}
                                            error={(data.error.zipCode) && true}
                                            type='tel'
                                            InputProps={{ inputComponent: TextMaskedCustom,
                                                value: data.vehicle.zipCode,
                                                onChange: text => {
                                                    dispatch(changeVehicle({zipCode: text.target.value}))
                                                    if(text.target.value.length > 8){
                                                        setState({ isLoadingCep: true })
                                                        dispatch(cep(text.target.value)).then(res => res && setState({isLoadingCep: false}))
                                                        if(data.error.zipCode){
                                                            delete data.error.zipCode
                                                            delete data.error.uf
                                                            delete data.error.city
                                                        }
                                                    }
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        {(state.isLoadingCep) ? <CircularProgress size={30}/>:<div></div>}
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {(data.error.zipCode) &&
                                            <strong className="text-danger">{data.error.zipCode[0]}</strong>
                                        }
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <label className="label-custom mb-2">Cidade</label>
                                        <TextField
                                            error={(data.error.city) && true}
                                            disabled
                                            value={data.vehicle.city || ''}
                                        />

                                        {(data.error.city) &&
                                        <strong className="text-danger">{data.error.city[0]}</strong>
                                        }
                                    </div>
                                    <div className="col-md-3">
                                        <label className="label-custom mb-2">UF</label>
                                        <TextField
                                            error={(data.error.uf) && true}
                                            disabled
                                            value={data.vehicle.uf || ''}
                                        />

                                        {(data.error.uf) &&
                                        <strong className="text-danger">{data.error.uf[0]}</strong>
                                        }
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-weight-normal mb-4 mt-4">Dados do Veículo</h3>
                            <div className="card card-body">
                                <div className="form-group">
                                    <FormControl variant="outlined" fullWidth>
                                        <label className="label-custom mb-2">Categoria</label>
                                        <Select
                                            error={data.error.vehicle_types && true}
                                            value={data.vehicle.vehicle_types || " "}
                                            onChange={(event) =>{
                                                dispatch(changeVehicle({
                                                    vehicle_type: event.target.value,
                                                    vehicle_brand: null,
                                                    vehicle_model:null,
                                                    vehicle_version: null,
                                                    vehicle_gearbox: null,
                                                    vehicle_fuel: null,
                                                    vehicle_steering: null,
                                                    vehicle_motorpower: null,
                                                    vehicle_doors: null
                                                    
                                                }))
                                                dispatch(brand(event.target.value))
                                                if (data.error.vehicle_type){
                                                    delete  data.error.vehicle_type
                                                }
                                            }}
                                            fullWidth
                                            displayEmpty
                                        >
                                            <option value="" disabled>
                                                Selecione
                                            </option>

                                            {data.vehicle_types.map(item =>(
                                                <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {(data.error.vehicle_type) &&
                                    <strong className="text-danger">{data.error.vehicle_type[0]}</strong>
                                    }
                                </div>
                                <div className="form-group">
                                    <FormControl variant="outlined" fullWidth>
                                        <label className="label-custom mb-2 mt-3">Marcas</label>
                                        <Select
                                            error={data.error.vehicle_brand && true}
                                            value={data.vehicle.vehicle_brand || ''}
                                            onChange={(event) =>{
                                                dispatch(changeVehicle({
                                                    vehicle_brand: event.target.value,
                                                    vehicle_model:null,
                                                    vehicle_version: null,
                                                }))
                                                dispatch(model(data.vehicle.vehicle_type, event.target.value))
                                                if (data.error.vehicle_brand){
                                                    delete  data.error.vehicle_brand
                                                }
                                            }}
                                            fullWidth
                                            displayEmpty
                                        >
                                            <option value="" disabled>
                                                Selecione
                                            </option>

                                            {data.vehicle_brand.map(item =>(
                                                <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {(data.error.vehicle_brand) &&
                                    <strong className="text-danger">{data.error.vehicle_brand[0]}</strong>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <FormControl variant="outlined" fullWidth>
                                            <label className="label-custom mb-2 mt-3">Modelos</label>
                                            <Select
                                                error={data.error.vehicle_model && true}
                                                value={data.vehicle.vehicle_model || ''}
                                                onChange={(event) =>{
                                                    dispatch(changeVehicle({
                                                        vehicle_model: event.target.value,
                                                        vehicle_version: null,
                                                    }))
                                                    dispatch(version(data.vehicle.vehicle_brand, event.target.value))
                                                    if (data.error.vehicle_model){
                                                        delete  data.error.vehicle_model
                                                    }
                                                }}
                                                fullWidth
                                                displayEmpty
                                            >
                                                <option value="" disabled>
                                                    Selecione
                                                </option>

                                                {data.vehicle_model.map(item =>(
                                                    <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {(data.error.vehicle_model) &&
                                        <strong className="text-danger">{data.error.vehicle_model[0]}</strong>
                                        }

                                    </div>
                                    <div className="col-md-6">
                                        <FormControl variant="outlined" fullWidth>
                                            <label className="label-custom mb-2 mt-3">Ano do Modelo</label>
                                            <Select
                                                error={data.error.vehicle_regdate && true}
                                                value={data.vehicle.vehicle_regdate || ''}
                                                onChange={(event) =>{
                                                    dispatch(changeVehicle({
                                                        vehicle_regdate: event.target.value,
                                                    }))
                                                    if (data.error.vehicle_regdate){
                                                        delete  data.error.vehicle_regdate
                                                    }
                                                }}
                                                fullWidth
                                                displayEmpty
                                            >
                                                <option value="" disabled>
                                                    Selecione
                                                </option>

                                                {data.regdate.map(item =>(
                                                    <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {(data.error.vehicle_regdate) &&
                                        <strong className="text-danger">{data.error.vehicle_regdate[0]}</strong>
                                        }
                                    </div>

                                </div>
                                <div className="form-group">
                                    <FormControl variant="outlined" fullWidth>
                                        <label className="label-custom mb-2 mt-3">Versão</label>
                                        <Select
                                            error={data.error.vehicle_version && true}
                                            value={data.vehicle.vehicle_version || ''}
                                            onChange={(event) =>{
                                                dispatch(changeVehicle({
                                                    vehicle_version: event.target.value
                                                }))
                                                if (data.error.vehicle_version){
                                                    delete  data.error.vehicle_version
                                                }
                                            }}
                                            fullWidth
                                            displayEmpty
                                        >
                                            <option value="" disabled>
                                                Selecione
                                            </option>

                                            {data.vehicle_version.map(item =>(
                                                <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {(data.error.vehicle_version) &&
                                    <strong className="text-danger">{data.error.vehicle_version[0]}</strong>
                                    }

                                </div>

                            </div>
                            <div className="card card-body mt-4 mb-4 p-4">
                                {(data.vehicle.vehicle_type === 2020) &&
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <FormControl variant="outlined" fullWidth>
                                                <label className="label-custom mb-2">Câmbio</label>
                                                <Select
                                                    value={data.vehicle.vehicle_gearbox || ''}
                                                    onChange={event => dispatch(changeVehicle({vehicle_gearbox: event.target.value}))}
                                                    fullWidth
                                                >
                                                    {data.gearbox.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className=" col-md-6 form-group">
                                            <FormControl variant="outlined" fullWidth>
                                                <label className="label-custom mb-2">Combustível</label>
                                                <Select
                                                    value={data.vehicle.vehicle_fuel || ''}
                                                    onChange={event => dispatch(changeVehicle({vehicle_fuel: event.target.value}))}
                                                    fullWidth
                                                >
                                                    {data.fuel.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="row mt-3" >
                                            <div className="col-md-6 form-group">
                                                <FormControl variant="outlined" fullWidth>
                                                    <label className="label-custom mb-2">Potência do Motor</label>
                                                    <Select
                                                        value={data.vehicle.vehicle_motorpower || ''}
                                                        onChange={event => dispatch(changeVehicle({vehicle_motorpower: event.target.value}))}
                                                        fullWidth
                                                    >
                                                        {data.motorpower.map(item => (
                                                            <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className=" col-md-6 form-group">
                                                <FormControl variant="outlined" fullWidth>
                                                    <label className="label-custom mb-2">Portas</label>
                                                    <Select
                                                        value={data.vehicle.vehicle_doors || ''}
                                                        onChange={event => dispatch(changeVehicle({vehicle_doors: event.target.value}))}
                                                        fullWidth
                                                    >
                                                        {data.doors.map(item => (
                                                            <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                    </div>

                                }
                                {(data.vehicle.vehicle_type === 2060) &&
                                    <div className=" col-md-6 form-group mb-4">
                                        <FormControl variant="outlined" fullWidth>
                                            <label className="label-custom mb-2">Cilindradas</label>
                                            <Select
                                                value={data.vehicle.vehicle_cubiccms || ''}
                                                onChange={event => dispatch(changeVehicle({vehicle_cubiccms: event.target.value}))}
                                                fullWidth
                                            >
                                                {data.cubiccms.map(item => (
                                                    <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </div>
                                }
                                <div className="row mt-3">

                                    <div className=" col-md-6 form-group mb-4">
                                        <FormControl variant="outlined" fullWidth>
                                            <label className="label-custom mb-2">Cor</label>
                                            <Select
                                                value={data.vehicle.vehicle_color || ''}
                                                onChange={event => dispatch(changeVehicle({vehicle_color: event.target.value}))}
                                                fullWidth
                                            >
                                                {data.carcolor.map(item => (
                                                    <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className=" col-md-6 form-group mb-4">
                                        <label className="label-custom mb-2">Quilometragem</label>
                                        <TextField
                                            type='tel'
                                            InputProps={{
                                                inputComponent: numberFormatCustom,
                                                value: data.vehicle.vehicle_mileage || '',
                                                onChange: text => dispatch(changeVehicle({vehicle_mileage: text.target.value}))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {(data.vehicle.vehicle_type) &&
                                <div>
                                    <h3 className="font-weight-normal mt-4 mb-4">Itens e Opcionais</h3>
                                        <div className="card card-body mb-5">
                                        <div className="row">
                                        {data.features.map(item => (item.vehicle_type_id === data.vehicle.vehicle_type) && (
                                            <div className="col-md-6" key={item.id}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={data.vehicle.vehicle_features[item.value] ? true : false}
                                                            onChange={() => {
                                                                let checked = data.vehicle.vehicle_features[item.value] ?
                                                                    delete data.vehicle.vehicle_features[item.value]
                                                                    : {[item.value]: item}
                                                                dispatch(changeVehicle({
                                                                    vehicle_features: {
                                                                        ...data.vehicle.vehicle_features,
                                                                        ...checked
                                                                    }
                                                                }))
                                                            }}

                                                        />

                                                    }
                                                    label={item.label}
                                                />

                                            </div>
                                        ))}
                                        </div>

                                    </div>
                                </div>
                            }
                            <h3 className="font-weight-normal mt-4 mb-4">Financeiro</h3>
                            <div className="card card-body mb-5">
                                <div className="form-group">
                                    <label className="label-custom">Estado Financeiro</label>
                                    <div className='row'>
                                        {data.financial.map(item => (
                                            <div className="col-md-6" key={item.id}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={data.vehicle.vehicle_financial[item.value] ? true : false}
                                                            onChange={ () => {
                                                                let checked = data.vehicle.vehicle_financial[item.value] ?
                                                                    delete data.vehicle.vehicle_financial[item.value]
                                                                    : {[item.value]: item}
                                                                dispatch(changeVehicle({vehicle_financial: {
                                                                        ...data.vehicle.vehicle_financial,
                                                                        ...checked
                                                                    }}))
                                                            }}

                                                        />

                                                    }
                                                    label={item.label}
                                                />

                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-6 form-group">
                                        <label className="label-custom mb-2">Preço</label>
                                        <TextField
                                            type="tel"
                                            name="R$ "
                                            InputProps={{
                                                inputComponent: numberFormatCustom,
                                                value: data.vehicle.vehicle_price || '',
                                                onChange: text => {
                                                    dispatch(changeVehicle({
                                                        vehicle_price: text.target.value
                                                    }))
                                                    if (data.error.vehicle_price) {
                                                        delete data.error.vehicle_price
                                                    }
                                                }
                                            }}
                                        />
                                        {
                                            (data.error.vehicle_price) &&
                                                <strong className="text-danger">{data.error.vehicle_price[0]}</strong>
                                        }
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-weight-normal mt-4 mb-4">Descrição do Anúncio</h3>
                            <div className="card car-body mb-5 p-3">
                                <div className="form-group">
                                    <label className="label-custom mb-2">Título do anúncio</label>
                                    <TextField
                                        value={data.vehicle.title || ""}
                                        onChange={text => dispatch(changeVehicle({
                                            title : text.target.value
                                        }))}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="label-custom mb-2">Descrição do anúncio</label>
                                    <TextField
                                        multiline
                                        rows='5'
                                        rowsMax="5"
                                        value={data.vehicle.description || ""}
                                        onChange={text => dispatch(changeVehicle({
                                            description : text.target.value
                                        }))}
                                    />
                                </div>
                            </div>


                        </div>


                    </div>
                }
            </div>
        </div>
    );
};