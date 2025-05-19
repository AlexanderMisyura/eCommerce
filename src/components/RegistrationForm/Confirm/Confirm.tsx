import { BILLING_ADDRESS_INDEX, SHIPPING_ADDRESS_INDEX } from '@constants';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import type { StepperProps } from '@ts-interfaces';
import { RegistrationContext } from 'context/registration.context';
import { use, useState } from 'react';
import { useSubmit } from 'react-router';

const formatData = (data = '') => (
  <Typography component="span" color="warning">
    {' '}
    {data.length < 25 ? data : `${data.slice(0, 25)}...`}
  </Typography>
);

export function Confirm({ handleBack, handleReset, stepIndex }: StepperProps) {
  const { registrationContext, setRegistrationContext } = use(RegistrationContext)!;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useSubmit();

  const handleBackStep = (): void => {
    setRegistrationContext({
      ...registrationContext,
      step: stepIndex - 1,
    });

    if (handleBack) handleBack();
  };

  const register = (): void => {
    setIsSubmitting(true);

    void submit(JSON.stringify(registrationContext.customerDraft), {
      action: `/${UrlPath.REGISTRATION}`,
      method: 'post',
      encType: 'application/json',
    }).then(() => setIsSubmitting(false));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Confirm Your Data
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom color="info" fontWeight="bold">
          Credentials
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>Email: {formatData(registrationContext.customerDraft.email)}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              First Name: {formatData(registrationContext.customerDraft.firstName)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              Last Name: {formatData(registrationContext.customerDraft.lastName)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              Date of Birth: {formatData(registrationContext.customerDraft.dateOfBirth)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom color="info" fontWeight="bold">
          Addresses
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Shipping Address
          {registrationContext.customerDraft.defaultShippingAddress === undefined
            ? ''
            : ' (Set as Default)'}
        </Typography>

        <Divider variant="middle" />

        <Box sx={{ marginBottom: 2 }}>
          <Typography>
            Street:{' '}
            {formatData(
              registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].streetName
            )}
          </Typography>
          <Typography>
            City:{' '}
            {formatData(registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].city)}
          </Typography>
          <Typography>
            Postal Code:{' '}
            {formatData(
              registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].postalCode
            )}
          </Typography>
          <Typography>
            Country:{' '}
            {formatData(
              registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].country
            )}
          </Typography>
        </Box>
        <Typography variant="subtitle2" gutterBottom>
          Billing Addresses
          {registrationContext.customerDraft.defaultBillingAddress === undefined
            ? ''
            : ' (Set as Default)'}
        </Typography>

        <Divider variant="middle" />

        <Divider variant="inset" />
        {registrationContext.customerDraft.billingAddresses![0] === SHIPPING_ADDRESS_INDEX ? (
          <Box sx={{ marginBottom: 2 }}>
            <Typography>
              Street:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].streetName
              )}
            </Typography>
            <Typography>
              City:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].city
              )}
            </Typography>
            <Typography>
              Postal Code:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].postalCode
              )}
            </Typography>
            <Typography>
              Country:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![SHIPPING_ADDRESS_INDEX].postalCode
              )}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ marginBottom: 2 }}>
            <Typography>
              Street:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].streetName
              )}
            </Typography>
            <Typography>
              City:{' '}
              {formatData(registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].city)}
            </Typography>
            <Typography>
              Postal Code:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].postalCode
              )}
            </Typography>
            <Typography>
              Country:{' '}
              {formatData(
                registrationContext.customerDraft.addresses![BILLING_ADDRESS_INDEX].country
              )}
            </Typography>
          </Box>
        )}
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', pt: 2 }}>
        <Button type="button" onClick={handleBackStep} variant="text" disabled={isSubmitting}>
          Back
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="outlined"
          color="error"
          disabled={isSubmitting}
        >
          Reset and Return
        </Button>
        <Button
          type="button"
          onClick={register}
          variant="contained"
          loading={isSubmitting}
          loadingPosition="start"
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
