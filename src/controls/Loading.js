import React from 'react';
import { CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    loadingParagraph: {
        margin: '0 0 10px',
        marginBlockStart: 0,
        marginblockEnd: 0
    },
    tripLoading: {
        marginTop: '24px',
        marginBottom: '24px',
        textAlign: 'center',
        '& > p': {
            textAlign: 'center',
            fontSize: '20px',
            margin: 0
        }
    }
})

const Loading = (props) => {
    const { message } = props;
    const classes = useStyles();
    return (
        <div className={classes.tripLoading} id="searchState">
            <p className={classes.loadingParagraph}>
                {message}
            </p>
            <CircularProgress
                id="memProgress"
                size={80}
                thickness={5} />
        </div>
    );
}

export default Loading;