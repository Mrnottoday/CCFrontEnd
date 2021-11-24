import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import history from './history';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import Home from './components/Home';
import Contact from './components/ContactManager';
import './css/styles.css';

const useStyles = {
    root: {
        height: '110vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rootLoaded: {
        display: 'flex',
        flexGrow: 1
    },
    mainContent: {
        width: '100%'
    }
};

const muiTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontSize: '0.875rem',
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    margin: '0px !important'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                text: {
                    color: 'white'
                },
                root: {
                    '&:hover': {
                        backgroundColor: '#515E71'
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: 'white',
                        backgroundColor: '#515E71'
                    },
                    fontSize: '12px',
                    lineHeight: 1.75
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: 'white'
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                list: {
                    paddingTop: 0,
                    paddingBottom: 0
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#515E71',
                        '&:hover': {
                            backgroundColor: '#515E71'
                        }
                    }
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#515E71',
                        '&:hover': {
                            backgroundColor: '#515E71'
                        }
                    }
                }
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        primary: {
            main: '#65768D'
        },
        secondary: {
            main: '#F00',
            second: '#FAFAFA'
        },
        black: '#000',
        white: 'white',
        lightSteelBlueOption1: '#C9D2DE',
        lightSteelBlueOption2: '#E3E8EE',
        grayOption3: '#515E71',
        grayOption7: '#65768D',
        redOption2: 'red'
    },
    leftMenuContainer: {
        background: '#65768D 0% 0% no-repeat padding-box',
        boxShadow: '2px 0px 7px #00000052'
    },
    boxShadow: '0px 3px 6px #00000029',
    typography: {
        fontFamily: 'Roboto, sans-serif;',
        fontSize: 10,
        body1: {
            fontSize: 16,
            margin: 0
        },
        body2: {
            fontSize: 10,
            margin: 0
        },
        h1: {
            fontWeight: 500,
            marginBottom: 10,
            lineHeight: 1.1,
            margin: '.67em 0'
        },
        h2: {
            fontWeight: 300,
            fontSize: 30,
            lineHeight: 1.1
        },
        h3: {
            color: '#000',
            fontWeight: 'Bold',
            fontSize: 20,
            letterSpacing: 0,
            opacity: 1,
            marginTop: 20,
            marginBottom: 10
        },
        h4: {
            fontWeight: 300,
            fontSize: 20,
            marginTop: 10,
            marginBottom: 10,
            fontFamily: 'inherit',
            lineHeight: 1.1,
            color: 'inherit'
        },
        h5: {
            marginTop: 10,
            marginBottom: 10,
            fontSize: 14,
            fontFamily: 'inherit',
            fontWeight: 500,
            lineHeight: 1.1,
            color: 'inherit'
        }
    }
});

const Root = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <Router history={history}>
                    <div>
                        <Header />
                        <div style={useStyles.rootLoaded}>
                            <LeftMenu />
                            <div style={useStyles.mainContent}>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/home"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/contact"
                                        component={Contact}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

render(<Root />,
    document.getElementById('root'));
