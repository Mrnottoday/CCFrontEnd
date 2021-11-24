import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    separator:{
        marginRight: 10,
        border: '1px dashed #515E71',
        opacity: 0.3,
        height: 38
    }
}));

const SeparatorContent = () => {
    const classes = useStyles();
    return (
        <div className={classes.separator}> </div>
    );
}

export default SeparatorContent;