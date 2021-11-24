import React from 'react';
import { useHistory } from 'react-router';
import { Tabs, Tab, Paper, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DynamicMenu from "../utils/dynamicMenu";

const useStyles = makeStyles(theme => ({
    boxStyle: {
        maxWidth: 100
    },
    button: {
        minWidth: 100,
        color: theme.palette.white,
        minHeight: 90,
        textTransform: 'none',
        "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
            "& > span > svg": {
                margin: 'auto auto 1px auto'
            },
            "& > span": {
                alignItems: 'stretch'
            }
        },
        '& .Mui-selected': {
            color: 'white'
        }
    },
    container: {
        flexGrow: 1,
        height: 'calc( 100vh - 80px )',
        background: theme.leftMenuContainer.background,
        boxShadow: theme.leftMenuContainer.boxShadow,
        opacity: 1,
        zIndex: 2,
        position: 'fixed',
        top: 80,
        "@media only screen and (max-width:599px)": {
            display: 'none!important'
        }
    },
    empty: { height: 100 }
}));

const isFac = () => {
    if (window.location.pathname.toLowerCase().indexOf('/home') === 0) { return 0; }
    if (window.location.pathname.toLowerCase().indexOf('/contact') === 0) { return 1; }

    return 0;
}

const LeftMenu = () => {
    const dynMenu = DynamicMenu();
    const history = useHistory();
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(isFac());

    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 0:
                setTabValue(newValue);
                history.push('/Home');
                break;
            case 1:
                setTabValue(newValue);
                history.push('/Contact');
                break;
            default:
                break;
        }
    }

    return (
        <Paper square className={classes.container} >
            <Hidden xsDown>
                <div className={classes.empty} />
            </Hidden>
            <Tabs
                orientation="vertical"
                className={classes.boxStyle}
                variant="fullWidth"
                value={tabValue}
                onChange={handleChange}
                centered
            >
                {dynMenu.map(x => (
                    <Tab key={x.id} icon={x.icon} label={x.label} value={x.id} className={classes.button} />
                ))}
            </Tabs>
        </Paper>
    )
}

export default LeftMenu;
