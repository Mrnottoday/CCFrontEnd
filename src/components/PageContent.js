import React from 'react';
import { withRouter } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import breakpointsNames from '../utils/responsiveConstants';

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: 80,
        marginLeft: 100,
        zIndex: -2,
        minHeight: 'calc(100vh - 100px)',
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            marginLeft: 0
        }
    },
    groupContent: {
        position: 'fixed',
        zIndex: -1,
        opacity: 0.5,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundImage: 'url("/img/ccbg.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
    },
    resetHeight: {
        height: 'auto !important'
    }
}));

const PageContent = (props) => {
    const { children, idName} = props;
    const classes = useStyles();
    
    return (
        <div id={idName} className={classes.content}>
            <div id="contentBackgroundPage" className={classes.groupContent} />
            {children}
        </div>
    );
}

const ConnectedPageContent = withRouter(PageContent);

export default ConnectedPageContent;
