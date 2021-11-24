import React from 'react';
import { Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import breakpointsNames from '../utils/responsiveConstants'

const useStyles = theme => ({
    initialContentResponsive: {
        margin:'auto',
        marginTop: 200,
        textAlign: 'center',
        padding: 15,
        height: 152,
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 0px 6px #00000029',
        borderRadius: 12,
        opacity: 0.8,
        width: 688,
        [theme.breakpoints.down(breakpointsNames.md)]: {
            width: 450,
            marginTop: 280
        },
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            width: 280,
            marginTop: 280
        }
    },
    titleCentralBanner: {
        font: 'Bold 32px/38px Roboto',
        color: theme.palette.black,
        [theme.breakpoints.down(breakpointsNames.md)]: {
            font: 'Bold 24px Roboto'
        },
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            font: 'Bold 20px Roboto'
        }
    },
    paragraphCentralBanner: {
        font: 'normal 28px/24px Roboto',
        textAlign: 'center',
        marginTop: 30,
        [theme.breakpoints.down(breakpointsNames.md)]: {
            font: 'normal 22px Roboto'
        },
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            font: 'normal 18px Roboto'
        }
    }
});

const BannerContent = props => {
    const { title, content, show, classes } = props;

    return (
        show && (
            <div className={classes.initialContentResponsive}>
                <Typography variant="h1" className={classes.titleCentralBanner}>
                    {title}
                </Typography>
                <Typography variant="h3" className={classes.paragraphCentralBanner}>
                    {content}
                </Typography>
            </div>
        )
    );
};

export default withStyles(useStyles)(BannerContent);
