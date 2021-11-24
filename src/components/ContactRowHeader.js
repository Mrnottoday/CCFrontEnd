import React from 'react';
import { Paper, Hidden } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

import SeparatorHeader from '../controls/SeparatorHeader';
import breakpointsNames from '../utils/responsiveConstants';

const useStyles = theme => ({
    headerGrid: {
        height: 32,
        width: '100%',
        background: theme.palette.lightSteelBlueOption2,
        paddingLeft: 0
    },
    nameColumn: {
        flex: '1 0 100px',
        boxSizing: 'border-box',
        paddingLeft: 10
    },
    lastNameColumn: {
        flex: '1 0 100px',
        boxSizing: 'border-box'
    },
    phoneColumn: {
        flex: '1 0 80px',
        boxSizing: 'border-box'
    },
    emailColumn: {
        flex: '1 0 180px',
        boxSizing: 'border-box'
    },
    details: {
        minWidth: 130,
        maxWidth: 130
    },
    hideMobileSize: {
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            display: 'none!important'
        }
    },
    memberCard: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: 32,
        '& .item': {
            flex: '1 0 180px',
            boxSizing: 'border-box',
            '&> :last-of-type': {
                flex: '1 0 300px'
            }
        }
    }
});

const ContactRowHeader = ({ classes }) => (
    <Paper className={classes.headerGrid}>
        <div className={classes.memberCard}>
            <div className={classes.nameColumn}>
                <div>
                    <strong>First Name</strong>
                </div>
            </div>
            <SeparatorHeader />
            <div className={classes.lastNameColumn}>
                <div>
                    <strong>Last Name</strong>
                </div>
            </div>
            <Hidden mdDown>
                <SeparatorHeader />
                <div className={classes.phoneColumn}>
                    <div>
                        <strong>Mobile Number</strong>
                    </div>
                </div>
                <SeparatorHeader />
            </Hidden>
            <Hidden lgDown>
                <div className={classes.emailColumn}>
                    <div>
                        <strong>Email</strong>
                    </div>
                </div>
                <SeparatorHeader />
            </Hidden>
            <div className={classes.details}>
                <div>
                    <strong>
                        Details
                    </strong>
                </div>
            </div>
        </div>
    </Paper>
)

export default withStyles(useStyles)(ContactRowHeader);
