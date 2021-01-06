// @flow
import * as React from 'react';
import {Link} from "react-router-dom";
import logo from '../assets/images/logo-car.png'
import {FaCar, FaUsers, FaLaptop, FaCreditCard, FaWhatsapp, FaSignOutAlt, FaAngleDown, FaAngleUp} from 'react-icons/fa'
import { Menu } from '@material-ui/icons'
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";

export const Header = (props) => {
    const [open, setOpen] = useState({open: false})
    const [drawerOpen, setDrawerOpen] = useState({site: false, financeiro: false})


    return (
        <div>
            {(window.innerWidth > 577) ?
                <nav className="header navbar navbar-expand-lg navbar-light" >
                    <div className="container">
                        <Link className='navbar-brand' to="/">
                            <img src={logo} alt="logo" width='180px'/>
                        </Link>
                        <ul className='navbar-nav'>
                            <li className='nav-item' >
                                <Link className="menu-link nav-link" to="/veiculos">
                                    <FaCar className="icon-lg mr-2"/>
                                    Veículos
                                </Link>
                            </li>
                            <li className='nav-item' >
                                <button className="menu-link nav-link" style={{background:"#F7F7F7"}}>
                                    <FaUsers className="icon-lg mr-2"/>
                                    Proprietários
                                </button>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link className="menu-link nav-link" to='#' data-toogle="dropdown">
                                    <FaLaptop className="icon-lg mr-2"/>
                                    Site
                                </Link>
                                <MenuList className='dropdown-menu'>
                                    <MenuItem className='dropdown-item'>
                                        Otimização para o Google
                                    </MenuItem>
                                    <MenuItem className='dropdown-item'>
                                        Unidades e Telefone
                                    </MenuItem>
                                    <MenuItem className='dropdown-item'>
                                        Logotipo
                                    </MenuItem>
                                    <MenuItem className='dropdown-item'>
                                        Domínio
                                    </MenuItem>
                                    <MenuItem className='dropdown-item'>
                                        Configurações
                                    </MenuItem>

                                </MenuList>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link className="menu-link nav-link" to='#' data-toogle="dropdown">
                                    <FaCreditCard className="icon-lg mr-2"/>
                                    Financeiro
                                </Link>
                                <MenuList className='dropdown-menu'>
                                    <MenuItem className='dropdown-item'>
                                        Meu Plano
                                    </MenuItem>
                                    <MenuItem className='dropdown-item'>
                                        Minhas Transações
                                    </MenuItem>
                                </MenuList>
                            </li>
                            <li className='nav-item' >
                                <Link className="menu-link nav-link" to="/veiculos">
                                    <FaWhatsapp className="icon-lg"/>
                                    Ajuda
                                </Link>
                            </li>
                            <li className='nav-item' >
                                <Link className="menu-link nav-link" to="/veiculos">
                                    <FaSignOutAlt className="icon-lg"/>
                                        Sair
                                </Link>
                            </li>
                        </ul>
                    </div>

                </nav>
                :
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label="menu" onClick={() => setOpen({open: true})}>
                            <Menu/>
                        </IconButton>
                        <Typography variant='h6'>
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            }
            <Drawer anchor='left' open={open.open} onClose={() => setOpen({open: false})}>
                <div style={{width: 320, maxWidth: window.innerWidth - 70}}>
                    <List component='nav' className="menu-mobile">
                        <ListItem>
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </ListItem>
                        <ListItem className="text-center">
                            user@gmail.com
                        </ListItem>
                        <Divider className="mt-2 mb-4"/>
                        <ListItem className="">
                            <ListItemIcon>
                                <FaCar/>
                            </ListItemIcon>
                            <ListItemText primary="Veículos"/>
                        </ListItem>
                        <ListItem className="">
                            <ListItemIcon>
                                <FaUsers/>
                            </ListItemIcon>
                            <ListItemText primary="Proprietários"/>
                        </ListItem>

                        <ListItem button onClick={() => setDrawerOpen({site: (drawerOpen.site)? false : true})}>
                            <ListItemIcon>
                                <FaLaptop/>
                            </ListItemIcon>
                            <ListItemText primary="Site"/>
                            {(drawerOpen.site) ? <FaAngleUp/> : <FaAngleDown/>}
                        </ListItem>


                        <Collapse in={drawerOpen.site} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText  primary="Otimização para Google" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText  primary="Unidades e telefones" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText  primary="Logos" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText  primary="Domínio" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText  primary="Configurações" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button onClick={() => setDrawerOpen({financeiro: (drawerOpen.financeiro)? false : true})}>
                            <ListItemIcon>
                                <FaCreditCard/>
                            </ListItemIcon>
                            <ListItemText primary="Financeiro"/>
                            {(drawerOpen.financeiro) ? <FaAngleUp/> : <FaAngleDown/>}
                        </ListItem>
                        <Collapse in={drawerOpen.financeiro} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText  primary="Meu Plano" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText  primary="Minhas Transações" style={{paddingLeft: '50px'}}/>
                                </ListItem>
                            </List>
                        </Collapse>
                        <Divider className='mt-2 mb-4'/>
                        <ListItem>
                            <ListItemIcon>
                                <FaWhatsapp/>
                            </ListItemIcon>
                            <ListItemText primary="Ajuda"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FaSignOutAlt/>
                            </ListItemIcon>
                            <ListItemText primary="Sair"/>
                        </ListItem>
                    </List>

                </div>
            </Drawer>
        </div>
    );
};