import React from 'react';
import { MenuItem, IconButton, ListItemIcon, ClickAwayListener } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import makeStyles from '@mui/styles/makeStyles';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { useHistory } from 'react-router';
import DynamicMenu from "../utils/dynamicMenu";
import breakpointsNames from '../utils/responsiveConstants';
import useWidth from '../utils/customHookWidth';

const useStyles = makeStyles(theme =>({
    back: {
        fontWeight: 'bold',
        color: theme.palette.black,
        paddingLeft: 50,
        background: theme.palette.lightSteelBlueOption2,
        '&disabled': {
            color: theme.palette.black
        }
    },
    button: {
        paddingLeft: 35,
        minWidth: 100,
        height: 40,
        color: theme.palette.white,
        background: theme.leftMenuContainer.background,
        '&:hover': {
            backgroundColor: theme.palette.grayOption3
        }
    },
    buttonB: {
        fontWeight: 'bold',
        paddingLeft: 50,
        minWidth: 100,
        color: theme.palette.grayOption7,
        background: theme.palette.lightSteelBlueOption2
    },
    LastMenuItem: {
        fontWeight: 'bold',
        paddingLeft: 50,
        minWidth: 100,
        color: theme.palette.grayOption7,
        background: theme.palette.lightSteelBlueOption2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    containerPop: {
        top: "12px !important",
        left: "-5px !important",
        width: 400,
        "@media only screen and (max-width: 400px)": {
            width: "100%"
        },
        "@media only screen and (min-width: 600px)": {
            display: "none !important"
        }
    },
    headerMenu: {
        "@media only screen and (min-width: 600px)": {
            display: "none !important"
        }
    },
    contentMenu: {
        top: 12,
        borderRadius: 10
    }
}));

const isFac = () => {
    if (window.location.pathname.toLowerCase().indexOf('/home') === 0) { return 0; }
    if (window.location.pathname.toLowerCase().indexOf('/contact') === 0) { return 1; }

    return 0;
}

const TopMenu = (props) => {
    const { onClickMenu } = props;
    const width = useWidth();
    const history = useHistory();
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dynMenu = DynamicMenu();
    
    const headerOff = () => {
        setIsOpen(false);
        onClickMenu(false);
    }

    const headerOn = () => {
        setIsOpen(true);
        onClickMenu(true);
    }

    const handleClick = (value) => {
        switch (value) {
        case 0:
            history.push('/Home');
            break;
        case 1:
            history.push('/Contact');
            break;
        default:
            break;
        }
        setAnchorEl(null);
        headerOff();
    }
  
    const handleShowOff = event => {
        event.preventDefault();

        if (!isOpen) {
            setAnchorEl(event.currentTarget);
            headerOn();
        } else {
            setAnchorEl(null);
            headerOff();
        }
    }
  
    const handleClose = () => {
        if (isOpen) {
            setAnchorEl(null);
            headerOff();
        }
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setAnchorEl(null);
            headerOff();
        }
    };

    switch(props.width) {
    case breakpointsNames.sm:
    case breakpointsNames.md:
    case breakpointsNames.lg:
    case breakpointsNames.xl:
        if (isOpen) {
            setAnchorEl(null);
            headerOff();
        }
        break;
    default:
        break;
    }

    return (
        <div>
            <IconButton
                edge="start"
                onClick={handleShowOff}
                color="inherit"
                aria-label="menu"
                id="btnHandleEventId"
                size="large">
                {isOpen
                    ? <CancelIcon fontSize="large"/>
                    : <MenuIcon fontSize="large"/>
                }
            </IconButton>
            <Popper
                open={Boolean((width === breakpointsNames.xs) ? anchorEl : null)}
                anchorEl={(width === breakpointsNames.xs) ? anchorEl : null}
                role={undefined}
                transition
                disablePortal
                className={classes.containerPop}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        in={TransitionProps.in}
                        onEnter={TransitionProps.onEnter}
                        onExited={TransitionProps.onExited}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.contentMenu}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={Boolean((width === breakpointsNames.xs) ? anchorEl : null)}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                    disablePadding
                                    className={classes.headerMenu}
                                >
                                    {dynMenu.map(x =>(
                                        <MenuItem
                                            key={x.id}
                                            onClick={() => handleClick(x.id)}
                                            className={classes.button}
                                            selected={x.id === isFac()}
                                        >
                                            <ListItemIcon>{x.icon}</ListItemIcon>
                                            {x.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default TopMenu
