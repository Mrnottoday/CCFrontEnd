import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';
import Hidden from "@mui/material/Hidden";
import SeparatorContent from '../controls/SeparatorContent';
import breakpointsNames from '../utils/responsiveConstants';
import Draggable from 'react-draggable';
import ContactForm from './ContactForm';
import { apiUrl } from '../env';

const PaperComponent = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const useStyles = makeStyles(theme => ({
    contentResult: {
        marginTop: '5px',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: 12,
        paddingLeft: 0
    },
    nameColumn: {
        flex: '1 0 100px',
        boxSizing: 'border-box',
        paddingLeft: 10,
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            flex: '1 0 90px'
        }
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
    overflowColumn: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '300px',
        [theme.breakpoints.down(breakpointsNames.xl)]: {
            width: '150px'
        },
        [theme.breakpoints.down(breakpointsNames.lg)]: {
            width: '100px'
        },
        [theme.breakpoints.down(breakpointsNames.md)]: {
            width: '150px'
        },
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            width: '80px'
        }
    },
    overflowEmail: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '300px',
        [theme.breakpoints.down(breakpointsNames.xl)]: {
            width: '200px'
        }
    },
    memberCard: {
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
    gridDeleteButton: {
        marginLeft: 0,
        float: 'right',
        height: 46.500,
        boxShadow: '0px 3px 6px #00000029',
        width: 52,
        background: theme.palette.primary.main,
        borderRadius: '0px'
    },
    gridButton: {
        marginLeft: 0,
        float: 'right',
        height: 46.500,
        borderRadius: '0px 12px 12px 0px',
        boxShadow: '0px 3px 6px #00000029',
        background: theme.palette.primary.main,
        width: 52
    },
    dialogButton: {
        background: theme.palette.primary.main
    },
    divContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '100%',
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 300
    },
    errorMessage: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.palette.redOption2,
        paddingTop: 10
    },
    divActionButton: {
        display: 'flex',
        flex: '0 0 auto',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalConfirmButton: {
        padding: '7px 20px',
        border: 2,
        borderColor: theme.palette.white,
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: '6px',
        opacity: 1,
        marginRight: 15,
        background: theme.palette.grayOption3,
        color: theme.palette.white
    },
}));

const ContactRow = (props) => {
    const {
        contact,
        onDeleteContact,
        refreshContacts
    } = props;

    const classes = useStyles();
    const [showEdit, setShowEdit] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [editContact, setEditContact] = React.useState(contact);

    const handleDelete = () => {
        onDeleteContact(contact.id);
    }

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    }

    const onEditSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        fetch(`${apiUrl}api/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editContact)
        })
            .then(() => {
                refreshContacts();
                setShowEdit(false);
            })
            .catch(error => setErrorMessage(`Unable to update item. ${error}`));
    }

    const onPreventSubmit = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            return false;
        }
        return true;
    };

    return (
        <div>
            <Paper
                id={contact.id}
                className={classes.contentResult}
            >
                <div className={classes.memberCard}>
                    <div className={classes.nameColumn}>
                        <div className={classes.overflowName}><strong>{contact.firstName}</strong></div>
                    </div>
                    <SeparatorContent />
                    <div className={classes.lastNameColumn}>
                        <div className={classes.overflowColumn}><strong>{contact.lastName}</strong></div>
                    </div>
                    <Hidden mdDown>
                        <SeparatorContent />
                        <div className={classes.phoneColumn}>
                            <div className={classes.overflowColumn}><strong>{contact.mobileNumber}</strong></div>
                        </div>
                        <SeparatorContent />
                    </Hidden>
                    <Hidden lgDown>
                        <div className={classes.emailColumn}>
                            <div className={classes.overflowEmail}><strong>{contact.email}</strong></div>
                        </div>
                        <SeparatorContent />
                    </Hidden>
                    <div className={classes.details}>
                        <Button
                            className={classes.gridButton}
                            onClick={handleShowEdit}
                        >
                            {showEdit ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                        <Button
                            className={classes.gridDeleteButton}
                            onClick={() => setOpenModal(true)}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                </div>
            </Paper>
            {showEdit &&
                <Paper className={classes.contentResult}>
                    <form
                        autoComplete="off"
                        method="post"
                        name={`contactForm_${contact.id}`}
                        onSubmit={e => onEditSubmit(e)}>
                        <div role="presentation" onKeyPress={e => onPreventSubmit(e)}>
                            <Grid container className={classes.divContainer}>
                                <div className={classes.errorMessage}>
                                    {errorMessage}
                                </div>
                                <ContactForm
                                    contact={editContact}
                                    setContact={setEditContact}
                                />
                            </Grid>
                            <div className={classes.divActionButton}>
                                <Input
                                    type="submit"
                                    disableUnderline
                                    color="primary"
                                    className={classes.modalConfirmButton}
                                    id={`SubmitEdit_${contact.id}`}
                                    value="Save Changes"
                                />
                            </div>
                        </div>
                    </form>
                </Paper>
            }
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete Contact
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this contact?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.dialogButton} autoFocus onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button className={classes.dialogButton} onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ContactRow;
