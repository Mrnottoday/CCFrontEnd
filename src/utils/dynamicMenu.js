import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    icon : { color: theme.palette.white }
}));

const DynamicMenu = () => {
    const classes = useStyles();
    
    const menuHome = {
        id: 0,
        menu: "Home",
        label: "Home",
        icon: <HomeIcon fontSize="large" className={classes.icon} />
    };
    const menuContact = {
        id: 1,
        menu: "Contact",
        label: "Contact",
        icon: <ContactsIcon fontSize="large" className={classes.icon} />
    };
   
    const menuList = [];

    menuList.push(menuHome); 
    menuList.push(menuContact); 
    
    return menuList;
}

export default DynamicMenu;