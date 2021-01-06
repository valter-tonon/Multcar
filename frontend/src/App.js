import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {Routes} from "./routes";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Loading, Notify, Alert} from './components'
import "./global.css"


const theme = createMuiTheme({
    palette: {
        primary:{
            main: '#3f51b5'
        }
    },
    props: {
        MuiTextField: {
            variant: "outlined",
            fullWidth: true
        }
    }
})

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Notify/>
              <Alert/>
              <Loading/>
              <Routes/>
          </ThemeProvider>
        </Provider>
    );
  }
}

export default App;
