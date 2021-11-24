import React from 'react';
import { Paper, FormControl, Input, InputLabel, IconButton, InputAdornment, Button } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import withStyles from '@mui/styles/withStyles';

const useStyles = theme => ({
    paper: {
        paddingLeft: 0,
        background: theme.palette.lightSteelBlueOption2,
        boxShadow: theme.typography.boxShadow,
        borderRadius:'6px 6px 6px 6px',
        height: 60,
        minWidth: 330
    },
    searchTextField: {
        flex: '1 0 300px',
        '@media only screen and (max-width: 500px)': {
            flex: '1 0 150px'
        }
    },
    forms: {
        marginLeft:15,
        marginRight: 15
    },
    memberCard: {
        paddingLeft: 0,
        background: theme.palette.lightSteelBlueOption2,
        boxShadow: theme.typography.boxShadow,
        borderRadius:'6px 6px 6px 6px',
        height: 60,
        minWidth: 330,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& .item': {
            flex: '1 0 180px',
            boxSizing: 'border-box',
            '&> :last-of-type': {
                flex: '1 0 300px'
            }
        }
    },
    itemButton: {
        maxWidth: 48,
        marginRight: 15
    },
    addButton: {
        background: theme.palette.primary.main,
        height: 60,
        borderRadius: '6px 0px 0px 6px',
        boxShadow: theme.boxShadow
    }
})

const FilterSearchBar = ({
    classes,
    filterLabel,
    filterValue,
    onChangeFilter,
    onClickAddButton
}) => {

    const onLostFocus = (event) => {
        if (event.key === 'Enter') {
            document.activeElement.blur();
        }
    }

    const handleMouseDownClear = event => {
        event.preventDefault();
    };

    const classesItemButton = `item ${classes.itemButton}`;

    return (
        <Paper className={classes.memberCard}>
            <div className={classesItemButton}>
                <Button
                    className={classes.addButton}
                    onClick={onClickAddButton}
                >
                    <Add fontSize="large" />
                </Button>
            </div>
            <div className={classes.searchTextField}>
                <form autoComplete="off"
                    className={classes.forms}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <FormControl fullWidth>
                        <InputLabel htmlFor="filterSearch">
                            {filterLabel}
                        </InputLabel>
                        <Input
                            fullWidth
                            id="filterSearch"
                            value={filterValue}
                            onChange={(e)=> onChangeFilter(e.target.value)}
                            onKeyPress={(e)=> onLostFocus(e)}
                            autoFocus
                            type="text"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={()=> onChangeFilter('')}
                                        onMouseDown={handleMouseDownClear}
                                        edge="end"
                                        size="large">
                                        {filterValue.length > 0 ? <Close /> : null}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
            </div>
        </Paper>
    );
}

export default withStyles(useStyles)(FilterSearchBar);