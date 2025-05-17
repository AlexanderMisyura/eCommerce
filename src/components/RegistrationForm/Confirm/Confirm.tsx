import { BILLING_ADDRESS_INDEX, SHIPPING_ADDRESS_INDEX } from '@constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import type { StepperProps } from '@ts-interfaces';
import { RegistrationContext } from 'context/registration.context';
import { use } from 'react';
import { useSubmit } from 'react-router';

export function Confirm({ handleBack, handleReset, stepIndex }: StepperProps) {
  const { registrationContext, setRegistrationContext } = use(RegistrationContext)!;

  const submit = useSubmit();

  const handleBackStep = (): void => {
    setRegistrationContext({
      ...registrationContext,
      step: stepIndex - 1,
    });

    if (handleBack) handleBack();
  };

  const register = (): void => {
    void submit(JSON.stringify(registrationContext.customerDraft), {
      action: `/${UrlPath.REGISTRATION}`,
      method: 'post',
      encType: 'application/json',
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Confirm Your Data
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Credentials
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>Email: {registrationContext.customerDraft.email}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>First Name: {registrationContext.customerDraft.firstName}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>Last Name: {registrationContext.customerDraft.lastName}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>Date of Birth: {registrationContext.customerDraft.dateOfBirth}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Addresses
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Shipping Address
          {registrationContext.customerDraft.defaultShippingAddress === undefined
            ? ''
            : ' (Set as Default)'}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography>
            Street:{' '}
            {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].streetName}
          </Typography>
          <Typography>
            City: {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].city}
          </Typography>
          <Typography>
            Postal Code:{' '}
            {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].postalCode}
          </Typography>
          <Typography>
            Country: {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].country}
          </Typography>
        </Box>
        <Typography variant="subtitle2" gutterBottom>
          Billing Addresses
          {registrationContext.customerDraft.defaultBillingAddress === undefined
            ? ''
            : ' (Set as Default)'}
        </Typography>
        {registrationContext.customerDraft.billingAddresses![0] === SHIPPING_ADDRESS_INDEX ? (
          <Box sx={{ marginBottom: 2 }}>
            <Typography>
              Street:{' '}
              {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].streetName}
            </Typography>
            <Typography>
              City: {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].city}
            </Typography>
            <Typography>
              Postal Code:{' '}
              {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].postalCode}
            </Typography>
            <Typography>
              Country:{' '}
              {registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].country}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ marginBottom: 2 }}>
            <Typography>
              Street:{' '}
              {registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].streetName}
            </Typography>
            <Typography>
              City: {registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].city}
            </Typography>
            <Typography>
              Postal Code:{' '}
              {registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].postalCode}
            </Typography>
            <Typography>
              Country: {registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].country}
            </Typography>
          </Box>
        )}
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', pt: 2 }}>
        <Button type="button" onClick={handleBackStep} variant="text">
          Back
        </Button>
        <Button type="button" onClick={handleReset} variant="outlined" color="error">
          Reset and Return
        </Button>
        <Button type="button" onClick={register} variant="contained">
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
