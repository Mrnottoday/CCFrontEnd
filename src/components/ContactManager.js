import React, { useEffect } from 'react'
import withStyles from '@mui/styles/withStyles';
import Loading from '../controls/Loading';
import PageContent from './PageContent';
import { Grid, IconButton, Typography, Paper, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BannerContent from '../controls/BannerContent';
import breakpointsNames from '../utils/responsiveConstants';
import { apiUrl } from '../env';
import ContactRow from './ContactRow';
import ContactRowHeader from './ContactRowHeader';
import FilterSearchBar from './FilterSearchBar';
import ContactForm from './ContactForm';

const useStyles = theme => ({
    result: {
        marginBottom: 20,
        marginTop: 155,
        paddingLeft: 15,
        paddingRight: 15,
        minWidth: 360
    },
    resultContent: {
        marginTop: 220,
        paddingRight: 15,
        paddingLeft: 15,
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            marginTop: 320
        }
    },
    resultFixed: {
        width: '100%',
        minWidth: 360
    },
    positionFixed: {
        position: 'fixed',
        zIndex: 2,
        paddingLeft: 15,
        paddingRight: 15,
        minWidth: 360,
        backgroundColor: theme.palette.secondary.second,
        [theme.breakpoints.up(breakpointsNames.sm)]: {
            width: 'calc(100% - 130px)'
        },
        [theme.breakpoints.down(breakpointsNames.sm)]: {
            width: 'calc(100% - 30px)'
        }
    },
    resultHeader: {
        paddingTop: 10,
        float: 'left',
        width: '100%'
    },
    title: {
        marginLeft: 0,
        marginTop: 10
    },
    addForm: {
        marginBottom: 20,
        marginTop: 155,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15
    },
    contentAddForm: {
        marginTop: '5px',
        paddingLeft: 0,
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: 12
    },
    divHeaderAddForm: {
        borderRadius: '10px 10px 0 0',
        background: theme.palette.grayOption3,
        height: 40,
        justifyContent: 'space-between',
        display: 'flex'
    },
    divHeaderTitle: {
        fontWeight: 'bold',
        color: theme.palette.white,
        paddingLeft: 20,
        paddingTop: 10
    },
    divHeaderCloseButton: {
        float: 'right'
    },
    modalCloseButton: {
        color: theme.palette.grey[500]
    },
    divFormContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '100%',
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 300
    },
    divActionButton: {
        display: 'flex',
        flex: '0 0 auto',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalConfirmButton: {
        padding: 5,
        marginBottom: 15,
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: '6px',
        opacity: 1,
        marginRight: 15,
        background: theme.palette.grayOption3,
        color: theme.palette.white
    },
    errorMessage: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.palette.redOption2
    },
});

const Contact = (props) => {
    const { classes } = props;
    const [isLoading, setIsLoading] = React.useState(false);
    const [contact, setContact] = React.useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: ''
    })
    const [contacts, setContacts] = React.useState([]);
    const [term, setTerm] = React.useState('');
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [filteredContacts, setFilteredContacts] = React.useState(contacts);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        setIsLoading(true);
        fetch(`${apiUrl}api/contacts`)
            .then(response => response.json())
            .then(data => {
                setContacts(data);
                setFilteredContacts(data);
                setTerm('');
                setIsLoading(false);
            })
            .catch(error => console.error('Unable to get items.', error));
    }

    const renderNoResults = () => (
        <BannerContent
            title="No Contacts Found"
            content="Find a contact above. Results will be displayed here."
            show={contacts.length === 0}
        />
    );

    const deleteContact = (id) => {
        setIsLoading(true);
        fetch(`${apiUrl}api/contacts/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setIsLoading(false);
                loadContacts();
            })
            .catch(error => console.error('Unable to delete item.', error));
    }


    const renderContacts = () => {
        const result = filteredContacts.map(c => (
            <ContactRow key={c.id} contact={c} onDeleteContact={deleteContact} refreshContacts={loadContacts} />
        ));

        return (
            contacts.length > 0 && <div className={classes.result}>{result}</div>
        );
    };

    const renderResults = () => (
        !isLoading && (
            <div>
                {renderContacts()}
                {renderNoResults()}
            </div>
        )
    );

    const renderHeaders = () => (
        contacts.length > 0 && (
            <ContactRowHeader />
        )
    );

    const renderLoading = () => (
        isLoading && (
            <div className={classes.resultContent}>
                <Loading message="Loading Contacts..." />
            </div>
        )
    );

    const contactFilter = (c, term) => {
        const param = term.toLowerCase().trim();
        let firstName = '';
        let lastName = '';
        let email = '';
        if (c.firstName != null) {
            firstName = c.firstName.toLowerCase();
        }
        if (c.lastName != null) {
            lastName = c.lastName.toLowerCase();
        }
        if (c.email != null) {
            email = c.email.toLowerCase();
        }
        const fullName = `${firstName} ${lastName} ${email}`;
        const nameEmail = `${firstName} ${email}`;
    
        return (
            nameEmail.indexOf(param) > -1 ||
            fullName.indexOf(param) > -1 ||
            firstName.indexOf(param) > -1 ||
            lastName.indexOf(param) > -1 ||
            email.indexOf(term) > -1
        );
    };

    const onFilterContact = (value) => {
        setTerm(value);
        setFilteredContacts(contacts.filter(c => contactFilter(c, value)));
    }

    const onAddContact = () => {
        setShowAddForm(true);
    }

    const onHandleAddFormClose = () => {
        setShowAddForm(false);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(contact);
        setIsLoading(true);
        fetch(`${apiUrl}api/contacts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then(response => {
                console.log(response);
                response.text();
            })
            .then(() => {
                setIsLoading(false);
                setShowAddForm(false);
                setErrorMessage('');
                setContact({
                    firstName: '',
                    lastName: '',
                    mobileNumber: '',
                    email: ''
                });
                loadContacts();
            })
            .catch(error => {
                setErrorMessage(`Unable to add item. ${error}`);
                setIsLoading(false);
            });
    }

    const onPreventSubmit = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            return false;
        }
        return true;
    };

    const renderAddForm = () => (
        showAddForm && (
            <div className={classes.addForm}>
                <Paper className={classes.contentAddForm}>
                    <div className={classes.divHeaderAddForm}>
                        <div className={classes.divHeaderTitle}>
                            Add Contact
                        </div>
                        <div className={classes.divHeaderCloseButton}>
                            <IconButton
                                className={classes.modalCloseButton}
                                onClick={() => onHandleAddFormClose()}
                                size="large">
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                    <form
                        autoComplete="off"
                        method="post"
                        name="addContactForm"
                        onSubmit={e => onSubmit(e)}
                    >
                        <div role="presentation" onKeyPress={e => onPreventSubmit(e)}>
                            <Grid container className={classes.divFormContainer}>
                                <div className={classes.errorMessage}>{errorMessage}</div>
                                <ContactForm
                                    contact={contact}
                                    setContact={setContact}
                                />
                            </Grid>
                            <div className={classes.divActionButton}>
                                <Input
                                    type="submit"
                                    disableUnderline
                                    color="primary"
                                    className={classes.modalConfirmButton}
                                    id="SubmitAddForm"
                                    value="Save Contact"
                                />
                            </div>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    )

    return (
        <PageContent>
            <Grid container>
                <div className={classes.positionFixed}>
                    <Grid item xs={12}>
                        <Typography variant="h3" className={classes.title}>
                            Contact Manager
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FilterSearchBar
                            filterLabel="Find Contact"
                            filterValue={term}
                            onChangeFilter={onFilterContact}
                            onClickAddButton={onAddContact}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.resultHeader}>
                        {renderHeaders()}
                    </Grid>
                </div>
                {!showAddForm && <div className={classes.resultFixed}>
                    <Grid item xs={12}>
                        {renderResults()}
                        {renderLoading()}
                    </Grid>
                </div>}
                {renderAddForm()}
            </Grid>
        </PageContent>
    )
}

export default withStyles(useStyles)(Contact)