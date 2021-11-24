import React from 'react';
import { Grid, TextField } from '@mui/material';

const ContactForm = (props) => {
    const { contact, setContact } = props;

    const handleFieldChange = (event) => {
        setContact({...contact, [event.target.name]: event.target.value })
    }

    return (
        <Grid container spacing={2} sx={{ paddingTop: 5 }}>
            <Grid item xs={12} md={6}>
                <TextField
                    label="First Name"
                    fullWidth
                    required
                    name="firstName"
                    variant="filled"
                    value={contact.firstName}
                    onChange={handleFieldChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Last Name"
                    fullWidth
                    required
                    name="lastName"
                    variant="filled"
                    value={contact.lastName}
                    onChange={handleFieldChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Mobile Number"
                    fullWidth
                    required
                    name="mobileNumber"
                    variant="filled"
                    value={contact.mobileNumber}
                    onChange={handleFieldChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Email"
                    fullWidth
                    required
                    name="email"
                    variant="filled"
                    value={contact.email}
                    onChange={handleFieldChange}
                />
            </Grid>
        </Grid>
    )
}

export default ContactForm;