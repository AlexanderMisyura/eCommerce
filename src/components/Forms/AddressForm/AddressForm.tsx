import {
  COUNTRY,
  DEBOUNCE_TIMEOUT,
  USER_ADDRESS_FORM_FIELD_LABELS,
  USER_ADDRESS_FORM_FIELD_NAMES,
  USER_ADDRESS_FORM_FIELD_PLACEHOLDERS,
} from '@constants';
import { ApiController } from '@controllers';
import { useCustomerContext, useToast } from '@hooks';
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import type { FormFieldState, UserAddressFieldsState, UserAddressFormState } from '@ts-interfaces';
import {
  stateAddressesFormDebounceWrapper,
  validateCountry,
  validatePostalCode,
  validateProperName,
  validateStreetName,
} from '@utils';
import { LegoLoader } from 'components/Loaders/LegoLoader';
import {
  USER_ADDRESS_FORM_CHECKBOX_LABELS,
  USER_ADDRESS_FORM_CHECKBOX_NAMES,
  USER_ADDRESS_FORM_DEFAULT_VALUES,
  USER_ADDRESS_OPTION_FORM_DEFAULT_VALUES,
} from 'constants/user-address-form-data';
import type { UserAddress, UserAddressType } from 'models/interfaces/user-profile/user-address';
import { useEffect, useMemo, useState } from 'react';

interface AddressFormProps {
  actionType: 'add' | 'edit' | null;
  selectedAddressValues: {
    address: UserAddress;
    addressType: UserAddressType;
  } | null;
  handleCloseModal: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  actionType,
  selectedAddressValues: selectAddressValues,
  handleCloseModal,
}) => {
  const { palette, spacing } = useTheme();
  const { currentCustomer, setCurrentCustomer } = useCustomerContext();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [formValues, setFormValues] = useState<UserAddressFormState>({
    address: {
      city: {
        ...USER_ADDRESS_FORM_DEFAULT_VALUES.city,
        value: selectAddressValues?.address.city ?? '',
      },
      streetName: {
        ...USER_ADDRESS_FORM_DEFAULT_VALUES.streetName,
        value: selectAddressValues?.address.streetName ?? '',
      },
      country: {
        ...USER_ADDRESS_FORM_DEFAULT_VALUES.country,
        value: selectAddressValues?.address.country ?? '',
      },
      postalCode: {
        ...USER_ADDRESS_FORM_DEFAULT_VALUES.postalCode,
        value: selectAddressValues?.address.postalCode ?? '',
      },
    },
    addressType: {
      useAsBilling:
        selectAddressValues?.addressType.useAsBilling ??
        USER_ADDRESS_OPTION_FORM_DEFAULT_VALUES.useAsBilling,
      useAsShipping:
        selectAddressValues?.addressType.useAsShipping ??
        USER_ADDRESS_OPTION_FORM_DEFAULT_VALUES.useAsShipping,
      setAsDefaultBilling:
        selectAddressValues?.addressType.setAsDefaultBilling ??
        USER_ADDRESS_OPTION_FORM_DEFAULT_VALUES.setAsDefaultBilling,
      setAsDefaultShipping:
        selectAddressValues?.addressType.setAsDefaultShipping ??
        USER_ADDRESS_OPTION_FORM_DEFAULT_VALUES.setAsDefaultShipping,
    },
  });
  const [initialValues] = useState(formValues);

  useEffect(() => {
    const hasErrors = Object.values(formValues.address).some(
      (field: FormFieldState) => field.error
    );

    const allFilled = Object.values(formValues.address).every((field: FormFieldState) => {
      return field.value !== '';
    });

    const isDifferentAddress = Object.keys(formValues.address).some((key) => {
      const typedKey = key as keyof typeof formValues.address;
      return formValues.address[typedKey].value !== initialValues.address[typedKey].value;
    });

    const isDifferentAddressType = Object.keys(formValues.addressType).some((key) => {
      const typedKey = key as keyof typeof formValues.addressType;
      return formValues.addressType[typedKey] !== initialValues.addressType[typedKey];
    });

    const isFormChanged = isDifferentAddress || isDifferentAddressType;

    setIsValidForm(!hasErrors && allFilled && isFormChanged);
  }, [formValues, initialValues]);

  const debouncedValidateField = useMemo(
    () =>
      stateAddressesFormDebounceWrapper(
        (fieldName: keyof UserAddressFieldsState, value: string): void => {
          let error = false;
          let errorMessage = '';

          switch (fieldName) {
            case USER_ADDRESS_FORM_FIELD_NAMES.city: {
              const cityErrors = validateProperName(value, USER_ADDRESS_FORM_FIELD_LABELS.city);
              error = cityErrors.length > 0;
              errorMessage = cityErrors[0];
              break;
            }
            case USER_ADDRESS_FORM_FIELD_NAMES.streetName: {
              const streetNameErrors = validateStreetName(value);
              error = streetNameErrors.length > 0;
              errorMessage = streetNameErrors[0];
              break;
            }
            case USER_ADDRESS_FORM_FIELD_NAMES.country: {
              const countryErrors = validateCountry(value);
              error = countryErrors.length > 0;
              errorMessage = countryErrors[0];
              break;
            }
            case USER_ADDRESS_FORM_FIELD_NAMES.postalCode: {
              const countryErrors = validatePostalCode(value);
              error = countryErrors.length > 0;
              errorMessage = countryErrors[0];
              break;
            }
          }

          setFormValues((previous) => {
            const previousField = previous.address[fieldName];

            if (previousField.error === error && previousField.errorMessage === errorMessage) {
              return previous;
            }

            return {
              ...previous,
              address: {
                ...previous.address,
                [fieldName]: { ...previousField, error, errorMessage },
              },
            };
          });
        },
        DEBOUNCE_TIMEOUT
      ),
    []
  );

  if (!currentCustomer) return null;

  const formTitle = actionType === 'add' ? 'Add New Address' : 'Edit Address';

  /* Handlers */
  const handleInputChange =
    (fieldName: keyof UserAddressFieldsState) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;

      setFormValues((previous) => ({
        ...previous,
        address: {
          ...previous.address,
          [fieldName]: { ...previous.address[fieldName], value },
        },
      }));

      debouncedValidateField(fieldName, value);
    };

  const handleReset = () => {
    setFormValues(initialValues);
  };

  const handleCheckboxChange = (checkboxName: keyof UserAddressType) => (): void => {
    setFormValues((previous) => {
      const isChecked = !previous.addressType[checkboxName];

      const updatedAddressType = {
        ...previous.addressType,
        [checkboxName]: isChecked,
      };

      if (checkboxName === USER_ADDRESS_FORM_CHECKBOX_NAMES.useAsShipping && !isChecked) {
        updatedAddressType.setAsDefaultShipping = false;
      }

      if (checkboxName === USER_ADDRESS_FORM_CHECKBOX_NAMES.useAsBilling && !isChecked) {
        updatedAddressType.setAsDefaultBilling = false;
      }

      return {
        ...previous,
        addressType: updatedAddressType,
      };
    });
  };

  const handleSaveNewAddress = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setIsLoading(true);
    event.preventDefault();

    const controller = ApiController.getInstance();

    try {
      const response = await controller.addCustomerAddress({
        version: currentCustomer.version,
        address: {
          city: formValues.address.city.value,
          streetName: formValues.address.streetName.value,
          country: formValues.address.country.value,
          postalCode: formValues.address.postalCode.value,
        },
        addressType: formValues.addressType,
      });

      const customer = response.body;
      setCurrentCustomer(customer);
      handleCloseModal();
      showToast('Your profile has been updated', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeAddress = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setIsLoading(true);
    event.preventDefault();

    const controller = ApiController.getInstance();

    try {
      const response = await controller.changeCustomerAddress({
        version: currentCustomer.version,
        address: {
          city: formValues.address.city.value,
          streetName: formValues.address.streetName.value,
          country: formValues.address.country.value,
          postalCode: formValues.address.postalCode.value,
        },
        addressId: selectAddressValues?.address.id ?? '',
        addressType: formValues.addressType,
      });

      const customer = response.body;
      setCurrentCustomer(customer);
      handleCloseModal();
      showToast('Your profile has been updated', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'warning');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack sx={{ rowGap: 8 }}>
        <Typography variant="h5">{formTitle}</Typography>

        <Box
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            actionType === 'add'
              ? void handleSaveNewAddress(event)
              : void handleChangeAddress(event)
          }
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing(3),
            width: '100%',
          }}
        >
          <TextField
            type="text"
            placeholder={USER_ADDRESS_FORM_FIELD_PLACEHOLDERS.city}
            label={USER_ADDRESS_FORM_FIELD_LABELS.city}
            value={formValues.address.city.value}
            error={formValues.address.city.error}
            helperText={formValues.address.city.errorMessage}
            name={USER_ADDRESS_FORM_FIELD_NAMES.city}
            onChange={handleInputChange(USER_ADDRESS_FORM_FIELD_NAMES.city)}
          />
          <TextField
            type="text"
            placeholder={USER_ADDRESS_FORM_FIELD_PLACEHOLDERS.streetName}
            label={USER_ADDRESS_FORM_FIELD_LABELS.streetName}
            value={formValues.address.streetName.value}
            error={formValues.address.streetName.error}
            helperText={formValues.address.streetName.errorMessage}
            name={USER_ADDRESS_FORM_FIELD_NAMES.streetName}
            onChange={handleInputChange(USER_ADDRESS_FORM_FIELD_NAMES.streetName)}
          />
          <TextField
            type="text"
            placeholder={USER_ADDRESS_FORM_FIELD_PLACEHOLDERS.country}
            label={USER_ADDRESS_FORM_FIELD_LABELS.country}
            value={formValues.address.country.value}
            error={formValues.address.country.error}
            helperText={formValues.address.country.errorMessage}
            name={USER_ADDRESS_FORM_FIELD_NAMES.country}
            select
            onChange={handleInputChange(USER_ADDRESS_FORM_FIELD_NAMES.country)}
          >
            <MenuItem value="">None</MenuItem>
            {Object.entries(COUNTRY).map(([country, code]) => (
              <MenuItem key={code} value={code}>
                {country}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            placeholder={USER_ADDRESS_FORM_FIELD_PLACEHOLDERS.postalCode}
            label={USER_ADDRESS_FORM_FIELD_LABELS.postalCode}
            value={formValues.address.postalCode.value}
            error={formValues.address.postalCode.error}
            helperText={formValues.address.postalCode.errorMessage}
            name={USER_ADDRESS_FORM_FIELD_NAMES.postalCode}
            onChange={handleInputChange(USER_ADDRESS_FORM_FIELD_NAMES.postalCode)}
          />

          <FormGroup>
            <Grid container spacing={2}>
              {/* BILLING */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={USER_ADDRESS_FORM_CHECKBOX_NAMES.useAsBilling}
                      checked={formValues.addressType.useAsBilling}
                      onChange={handleCheckboxChange(USER_ADDRESS_FORM_CHECKBOX_NAMES.useAsBilling)}
                    />
                  }
                  label={USER_ADDRESS_FORM_CHECKBOX_LABELS.useAsBilling}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={USER_ADDRESS_FORM_CHECKBOX_NAMES.setAsDefaultBilling}
                      checked={formValues.addressType.setAsDefaultBilling}
                      disabled={!formValues.addressType.useAsBilling}
                      onChange={handleCheckboxChange(
                        USER_ADDRESS_FORM_CHECKBOX_NAMES.setAsDefaultBilling
                      )}
                    />
                  }
                  label={USER_ADDRESS_FORM_CHECKBOX_LABELS.setAsDefaultBilling}
                />
              </Grid>

              {/* SHIPPING */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={USER_ADDRESS_FORM_CHECKBOX_NAMES.useAsShipping}
                      checked={formValues.addressType.useAsShipping}
                      onChange={handleCheckboxChange(
                        USER_ADDRESS_FORM_CHECKBOX_NAMES.useAsShipping
                      )}
                    />
                  }
                  label={USER_ADDRESS_FORM_CHECKBOX_LABELS.useAsShipping}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={USER_ADDRESS_FORM_CHECKBOX_NAMES.setAsDefaultShipping}
                      checked={formValues.addressType.setAsDefaultShipping}
                      disabled={!formValues.addressType.useAsShipping}
                      onChange={handleCheckboxChange(
                        USER_ADDRESS_FORM_CHECKBOX_NAMES.setAsDefaultShipping
                      )}
                    />
                  }
                  label={USER_ADDRESS_FORM_CHECKBOX_LABELS.setAsDefaultShipping}
                />
              </Grid>
            </Grid>
          </FormGroup>

          {
            <Stack direction="row" spacing={4} justifyContent="center">
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={!isValidForm}>
                Save
              </Button>
            </Stack>
          }
        </Box>
      </Stack>

      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <LegoLoader color={palette.grey[300]} />
      </Backdrop>
    </>
  );
};
