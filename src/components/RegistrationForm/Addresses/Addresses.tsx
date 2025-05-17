import {
  ADDRESSES_OPTIONS_DEFAULT,
  BILLING_ADDRESS_INDEX,
  CHECKBOX_NAME,
  COUNTRY,
  CUSTOMER_ADDRESSES_STATE_DEFAULT,
  DEBOUNCE_TIMEOUT,
  FIELD_NAME,
  SHIPPING_ADDRESS_INDEX,
} from '@constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import type { Address, AddressesState, StepperProps } from '@ts-interfaces';
import {
  stateAddressesDebounceWrapper,
  validateAddresses,
  validateCountry,
  validatePostalCode,
  validateProperName,
  validateStreetName,
} from '@utils';
import { RegistrationContext } from 'context/registration.context';
import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function Addresses({
  handleBack,
  handleNext,
  handleReset,
  setStepErrors,
  stepIndex,
}: StepperProps) {
  const [addressesState, setAddressesState] = useState<AddressesState>(
    CUSTOMER_ADDRESSES_STATE_DEFAULT
  );
  const [addressesOptions, setAddressesOptions] = useState(ADDRESSES_OPTIONS_DEFAULT);
  const { registrationContext, setRegistrationContext } = use(RegistrationContext)!;

  useEffect(() => {
    if (registrationContext.addressesState) {
      setAddressesState(registrationContext.addressesState);
    }
    if (registrationContext.addressesOptions) {
      setAddressesOptions(registrationContext.addressesOptions);
    }
  }, [registrationContext.addressesState, registrationContext.addressesOptions]);

  const references = {
    useDefaultShipping: useRef<HTMLInputElement>(null),
    useDefaultBilling: useRef<HTMLInputElement>(null),
    useShippingAsBilling: useRef<HTMLInputElement>(null),
  };

  const markStep = useCallback(
    (isError: boolean): void => {
      setStepErrors((previous) => {
        if (previous[stepIndex] === isError) return previous;

        const newStepErrors = [...previous];
        newStepErrors[stepIndex] = isError;
        return newStepErrors;
      });
    },
    [setStepErrors, stepIndex]
  );

  useEffect(() => {
    const hasErrors = Object.values(addressesState).some(
      (field: AddressesState[keyof AddressesState]) => field.error
    );

    markStep(hasErrors);
  }, [addressesState, markStep]);

  const debouncedValidateField = useMemo(
    () =>
      stateAddressesDebounceWrapper((fieldName: keyof AddressesState, value: string) => {
        let error = false;
        let errorMessage = '';

        switch (fieldName) {
          case FIELD_NAME.SHIPPING_CITY: {
            const shippingCityErrors = validateProperName(value, 'city');
            error = shippingCityErrors.length > 0;
            errorMessage = shippingCityErrors[0];
            break;
          }
          case FIELD_NAME.SHIPPING_COUNTRY: {
            const shippingCountryErrors = validateCountry(value);
            error = shippingCountryErrors.length > 0;
            errorMessage = shippingCountryErrors[0];
            break;
          }
          case FIELD_NAME.SHIPPING_STREET_NAME: {
            const shippingStreetNameErrors = validateStreetName(value);
            error = shippingStreetNameErrors.length > 0;
            errorMessage = shippingStreetNameErrors[0];
            break;
          }
          case FIELD_NAME.SHIPPING_POSTAL_CODE: {
            const shippingPostalCodeErrors = validatePostalCode(value);
            error = shippingPostalCodeErrors.length > 0;
            errorMessage = shippingPostalCodeErrors[0];
            break;
          }
          case FIELD_NAME.BILLING_CITY: {
            const billingCityErrors = validateProperName(value, 'city');
            error = billingCityErrors.length > 0;
            errorMessage = billingCityErrors[0];
            break;
          }
          case FIELD_NAME.BILLING_COUNTRY: {
            const billingCountryErrors = validateCountry(value);
            error = billingCountryErrors.length > 0;
            errorMessage = billingCountryErrors[0];
            break;
          }
          case FIELD_NAME.BILLING_STREET_NAME: {
            const billingStreetNameErrors = validateStreetName(value);
            error = billingStreetNameErrors.length > 0;
            errorMessage = billingStreetNameErrors[0];
            break;
          }
          case FIELD_NAME.BILLING_POSTAL_CODE: {
            const billingPostalCodeErrors = validatePostalCode(value);
            error = billingPostalCodeErrors.length > 0;
            errorMessage = billingPostalCodeErrors[0];
            break;
          }
        }

        setAddressesState((previousState) => {
          const previousField = previousState[fieldName];

          if (previousField.error === error && previousField.errorMessage === errorMessage) {
            return previousState;
          }

          return {
            ...previousState,
            [fieldName]: { ...previousState[fieldName], error, errorMessage },
          };
        });
      }, DEBOUNCE_TIMEOUT),
    []
  );

  const handleInputChange =
    (fieldName: keyof AddressesState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setAddressesState((previousState) => ({
        ...previousState,
        [fieldName]: { ...previousState[fieldName], value: value || '' },
      }));

      debouncedValidateField(fieldName, value);
    };

  const handleAddressOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setAddressesOptions((previousState) => ({
      ...previousState,
      [name]: checked,
    }));
  };

  const handleBlur =
    (field: keyof AddressesState) => (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value === '') {
        setAddressesState((previousState) => {
          const previousField = previousState[field];

          if (previousField.error === false && previousField.errorMessage === '') {
            return previousState;
          }

          return {
            ...previousState,
            [field]: { ...previousField, error: false, errorMessage: '' },
          };
        });
      }
    };

  const handleBackStep = (): void => {
    setRegistrationContext({
      ...registrationContext,
      addressesState,
      addressesOptions,
      step: stepIndex - 1,
    });

    if (handleBack) handleBack();
  };

  const handleNextStep = (): void => {
    const shippingStreetName = addressesState.shippingStreetName.value;
    const shippingCity = addressesState.shippingCity.value;
    const shippingPostalCode = addressesState.shippingPostalCode.value;
    const shippingCountry = addressesState.shippingCountry.value;
    const billingStreetName = addressesState.billingStreetName.value;
    const billingCity = addressesState.billingCity.value;
    const billingPostalCode = addressesState.billingPostalCode.value;
    const billingCountry = addressesState.billingCountry.value;

    const validationErrors = validateAddresses({
      shippingStreetName,
      shippingCity,
      shippingPostalCode,
      shippingCountry,
      billingStreetName,
      billingCity,
      billingPostalCode,
      billingCountry,
    });

    const useDefaultShipping = references.useDefaultShipping.current?.checked;
    const useDefaultBilling = references.useDefaultBilling.current?.checked;
    const useShippingAsBilling = references.useShippingAsBilling.current?.checked;

    setAddressesState((previousState) => ({
      ...previousState,
      shippingStreetName: {
        ...previousState.shippingStreetName,
        error: validationErrors.shippingStreetNameErrors.length > 0,
        errorMessage: validationErrors.shippingStreetNameErrors[0] || '',
      },
      shippingCity: {
        ...previousState.shippingCity,
        error: validationErrors.shippingCityErrors.length > 0,
        errorMessage: validationErrors.shippingCityErrors[0] || '',
      },
      shippingPostalCode: {
        ...previousState.shippingPostalCode,
        error: validationErrors.shippingPostalCodeErrors.length > 0,
        errorMessage: validationErrors.shippingPostalCodeErrors[0] || '',
      },
      shippingCountry: {
        ...previousState.shippingCountry,
        error: validationErrors.shippingCountryErrors.length > 0,
        errorMessage: validationErrors.shippingCountryErrors[0] || '',
      },
      billingStreetName: {
        ...previousState.billingStreetName,
        error: validationErrors.billingStreetNameErrors.length > 0,
        errorMessage: validationErrors.billingStreetNameErrors[0] || '',
      },
      billingCity: {
        ...previousState.billingCity,
        error: validationErrors.billingCityErrors.length > 0,
        errorMessage: validationErrors.billingCityErrors[0] || '',
      },
      billingPostalCode: {
        ...previousState.billingPostalCode,
        error: validationErrors.billingPostalCodeErrors.length > 0,
        errorMessage: validationErrors.billingPostalCodeErrors[0] || '',
      },
      billingCountry: {
        ...previousState.billingCountry,
        error: validationErrors.billingCountryErrors.length > 0,
        errorMessage: validationErrors.billingCountryErrors[0] || '',
      },
    }));

    const hasErrors = useShippingAsBilling
      ? validationErrors.shippingStreetNameErrors.length > 0 ||
        validationErrors.shippingCityErrors.length > 0 ||
        validationErrors.shippingPostalCodeErrors.length > 0 ||
        validationErrors.shippingCountryErrors.length > 0
      : Object.values(validationErrors).some((errorMessages: string[]) => errorMessages.length > 0);

    if (handleNext && !hasErrors) {
      markStep(false);

      const addresses: Address[] = [];
      const shippingAddresses: number[] = [];
      const billingAddresses: number[] = [];

      const shippingAddress: Address = {
        streetName: shippingStreetName,
        city: shippingCity,
        postalCode: shippingPostalCode,
        country: shippingCountry,
      };

      addresses.push(shippingAddress);
      shippingAddresses.push(SHIPPING_ADDRESS_INDEX);

      const defaultShippingAddress = useDefaultShipping ? SHIPPING_ADDRESS_INDEX : undefined;

      let billingAddress;

      if (useShippingAsBilling) {
        billingAddress = shippingAddress;
        billingAddresses.push(SHIPPING_ADDRESS_INDEX);
      } else {
        billingAddress = {
          streetName: billingStreetName,
          city: billingCity,
          postalCode: billingPostalCode,
          country: billingCountry,
        };

        addresses.push(billingAddress);
        billingAddresses.push(BILLING_ADDRESS_INDEX);
      }

      const defaultBillingAddress = useDefaultBilling
        ? useShippingAsBilling
          ? SHIPPING_ADDRESS_INDEX
          : BILLING_ADDRESS_INDEX
        : undefined;

      setRegistrationContext({
        ...registrationContext,
        customerDraft: {
          ...registrationContext.customerDraft,
          addresses,
          shippingAddresses,
          billingAddresses,
          defaultShippingAddress,
          defaultBillingAddress,
        },
        addressesState,
        addressesOptions,
        step: stepIndex + 1,
      });

      handleNext();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <Divider>Shipping Address</Divider>
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  slotProps={{ input: { ref: references.useDefaultShipping } }}
                  checked={addressesOptions.useDefaultShipping}
                  onChange={handleAddressOptionsChange}
                  name={CHECKBOX_NAME.USE_DEFAULT_SHIPPING}
                />
              }
              label="Use as default"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.SHIPPING_CITY}>City</FormLabel>
              <TextField
                value={addressesState.shippingCity.value}
                error={addressesState.shippingCity.error}
                helperText={addressesState.shippingCity.errorMessage}
                id={FIELD_NAME.SHIPPING_CITY}
                type="text"
                name={FIELD_NAME.SHIPPING_CITY}
                autoComplete="shipping address-level2"
                fullWidth
                variant="outlined"
                color={addressesState.shippingCity.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.SHIPPING_CITY)}
                onBlur={handleBlur(FIELD_NAME.SHIPPING_CITY)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.SHIPPING_COUNTRY}>Country</FormLabel>
              <TextField
                value={addressesState.shippingCountry.value}
                error={addressesState.shippingCountry.error}
                select
                helperText={addressesState.shippingCountry.errorMessage}
                id={FIELD_NAME.SHIPPING_COUNTRY}
                type="text"
                name={FIELD_NAME.SHIPPING_COUNTRY}
                fullWidth
                variant="outlined"
                color={addressesState.shippingCountry.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.SHIPPING_COUNTRY)}
                onBlur={handleBlur(FIELD_NAME.SHIPPING_COUNTRY)}
              >
                <MenuItem value="">None</MenuItem>
                {Object.entries(COUNTRY).map(([country, code]) => (
                  <MenuItem key={code} value={code}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.SHIPPING_STREET_NAME}>Street</FormLabel>
              <TextField
                value={addressesState.shippingStreetName.value}
                error={addressesState.shippingStreetName.error}
                helperText={addressesState.shippingStreetName.errorMessage}
                id={FIELD_NAME.SHIPPING_STREET_NAME}
                type="text"
                name={FIELD_NAME.SHIPPING_STREET_NAME}
                autoComplete="shipping street-address"
                fullWidth
                variant="outlined"
                color={addressesState.shippingStreetName.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.SHIPPING_STREET_NAME)}
                onBlur={handleBlur(FIELD_NAME.SHIPPING_STREET_NAME)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.SHIPPING_POSTAL_CODE}>Postal Code</FormLabel>
              <TextField
                value={addressesState.shippingPostalCode.value}
                error={addressesState.shippingPostalCode.error}
                helperText={addressesState.shippingPostalCode.errorMessage}
                id={FIELD_NAME.SHIPPING_POSTAL_CODE}
                type="text"
                name={FIELD_NAME.SHIPPING_POSTAL_CODE}
                autoComplete="shipping street-address"
                fullWidth
                variant="outlined"
                color={addressesState.shippingStreetName.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.SHIPPING_POSTAL_CODE)}
                onBlur={handleBlur(FIELD_NAME.SHIPPING_POSTAL_CODE)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Divider>Billing Address</Divider>
        <Grid container spacing={3}>
          <FormControlLabel
            control={
              <Checkbox
                slotProps={{ input: { ref: references.useDefaultBilling } }}
                checked={addressesOptions.useDefaultBilling}
                onChange={handleAddressOptionsChange}
                name={CHECKBOX_NAME.USE_DEFAULT_BILLING}
              />
            }
            label="Use as default"
          />
          <FormControlLabel
            control={
              <Checkbox
                slotProps={{ input: { ref: references.useShippingAsBilling } }}
                checked={addressesOptions.useShippingAsBilling}
                onChange={handleAddressOptionsChange}
                name={CHECKBOX_NAME.USE_SHIPPING_AS_BILLING}
              />
            }
            label="Use shipping address as billing"
          />
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.BILLING_CITY}>City</FormLabel>
              <TextField
                value={addressesState.billingCity.value}
                error={addressesState.billingCity.error}
                helperText={addressesState.billingCity.errorMessage}
                id={FIELD_NAME.BILLING_CITY}
                type="text"
                name={FIELD_NAME.BILLING_CITY}
                autoComplete="billing address-level2"
                fullWidth
                variant="outlined"
                color={addressesState.billingCity.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.BILLING_CITY)}
                onBlur={handleBlur(FIELD_NAME.BILLING_CITY)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.BILLING_COUNTRY}>Country</FormLabel>
              <TextField
                value={addressesState.billingCountry.value}
                error={addressesState.billingCountry.error}
                select
                helperText={addressesState.billingCountry.errorMessage}
                id={FIELD_NAME.BILLING_COUNTRY}
                type="text"
                name={FIELD_NAME.BILLING_COUNTRY}
                fullWidth
                variant="outlined"
                color={addressesState.billingCountry.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.BILLING_COUNTRY)}
                onBlur={handleBlur(FIELD_NAME.BILLING_COUNTRY)}
              >
                <MenuItem value="">None</MenuItem>
                {Object.entries(COUNTRY).map(([country, code]) => (
                  <MenuItem key={code} value={code}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.BILLING_STREET_NAME}>Street</FormLabel>
              <TextField
                value={addressesState.billingStreetName.value}
                error={addressesState.billingStreetName.error}
                helperText={addressesState.billingStreetName.errorMessage}
                id={FIELD_NAME.BILLING_STREET_NAME}
                type="text"
                name={FIELD_NAME.BILLING_STREET_NAME}
                autoComplete="billing street-address"
                fullWidth
                variant="outlined"
                color={addressesState.billingStreetName.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.BILLING_STREET_NAME)}
                onBlur={handleBlur(FIELD_NAME.BILLING_STREET_NAME)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor={FIELD_NAME.BILLING_POSTAL_CODE}>Postal Code</FormLabel>
              <TextField
                value={addressesState.billingPostalCode.value}
                error={addressesState.billingPostalCode.error}
                helperText={addressesState.billingPostalCode.errorMessage}
                id={FIELD_NAME.BILLING_POSTAL_CODE}
                type="text"
                name={FIELD_NAME.BILLING_POSTAL_CODE}
                autoComplete="billing postal-code"
                fullWidth
                variant="outlined"
                color={addressesState.shippingStreetName.error ? 'error' : 'primary'}
                onChange={handleInputChange(FIELD_NAME.BILLING_POSTAL_CODE)}
                onBlur={handleBlur(FIELD_NAME.BILLING_POSTAL_CODE)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', pt: 2 }}>
          <Button type="button" onClick={handleBackStep} variant="text">
            Back
          </Button>
          <Button type="button" onClick={handleReset} variant="outlined" color="error">
            Reset and Return
          </Button>
          <Button type="button" onClick={handleNextStep} variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
