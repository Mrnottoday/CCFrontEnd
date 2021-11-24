import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import TopMenu from './TopMenu';
import breakpointsNames from '../utils/responsiveConstants';

const useStyles = theme => ({
    appBar: {
        backgroundColor: theme.palette.white,
        color: theme.palette.primary.main,
        top: 0
    },
    toolbar: {
        height: 80,
        minWidth: 360
    },
    headerMenu: {
        [theme.breakpoints.up(breakpointsNames.sm)]: {
            display:'none!important'
        }
    },
    tabBox: {
        marginLeft: 10,
        '& > h3' : {
            marginTop: 10
        },
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            marginRight: 40,
            '& > h3': {
                fontSize: 18
            }
        }
    },
    hideMobileSize: {
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            display:'none!important'
        },
        padding: '0 !important'
    }
});

const Header = (props) => {
    const { classes } = props;
    const [menuStatus, setMenuStatus] = React.useState(false);

    const onClickMenu = (isOpen) => {
        setMenuStatus(isOpen);
    }

    return (
        <AppBar className={classes.appBar} position="fixed">
            <Toolbar className={classes.toolbar}>
                <Box className={classes.headerMenu}>
                    <TopMenu edge="end" onClickMenu={onClickMenu} />
                </Box>
                <Box
                    flexGrow={1}
                    className={menuStatus ?
                        `${classes.tabBox} ${classes.hideMobileSize}` :
                        classes.tabBox} id="CCTitle">
                    <Typography variant="h3" className={classes.root}>Code Challenge Demo</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(useStyles)(Header);