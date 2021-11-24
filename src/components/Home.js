import React from 'react';
import BannerContent from '../controls/BannerContent';
import PageContent from './PageContent';
import withStyles from '@mui/styles/withStyles';
import { Grid } from '@mui/material';

const useStyles = () => ({
    content: {
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 120
    }
});

const Home = (props) => {
    const { classes } = props;

    return (
        <PageContent idName="contentPage">
            <Grid container>
                <Grid item xs={12} className={classes.content}>
                    <BannerContent
                        title="Code Challenge"
                        content="Welcome to Code Challenge"
                        show
                    />
                </Grid>
            </Grid>
        </PageContent>
    )
}

export default withStyles(useStyles)(Home)