import { ApiController } from '@controllers';
import { useCustomerContext, useToast } from '@hooks';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import type { UserAddress, UserAddressType } from '@ts-interfaces';
import { AddressForm } from 'components/Forms/AddressForm/AddressForm';
import type { MouseEvent } from 'react';
import { useState } from 'react';

export const UserProfileAddresses = () => {
  const { currentCustomer, setCurrentCustomer } = useCustomerContext();
  const { spacing } = useTheme();
  const { showToast } = useToast();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDisabledDeleteButton, setIsDisabledDeleteButton] = useState(false);
  const [addressActionType, setAddressActionType] = useState<'add' | 'edit' | null>(null);
  const [selectedAddressValues, setSelectAddressValues] = useState<{
    address: UserAddress;
    addressType: UserAddressType;
  } | null>(null);

  if (!currentCustomer) return null;

  /* HEADER */
  const EnhancedTableHead = () => {
    const TABLE_HEADER_DATA = [
      '#',
      'City',
      'Street Name',
      'Postal Code',
      'Country',
      'Address Type',
      'Delete',
    ];

    return (
      <TableHead>
        <TableRow>
          {TABLE_HEADER_DATA.map((cell) => (
            <TableCell key={cell} align="center">
              {cell}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  /* TABLE HANDLERS */
  const handleAddressSelect = ({
    selectAddress,
    selectAddressType,
  }: {
    selectAddress: UserAddress;
    selectAddressType: UserAddressType;
  }) => {
    setSelectAddressValues({ address: selectAddress, addressType: selectAddressType });
    setIsOpenModal(true);
    setAddressActionType('edit');
    //   }
  };

  const handleAddAddress = (): void => {
    setIsOpenModal(true);
    setAddressActionType('add');
  };

  const handleDeleteAddress = async ({
    event,
    version,
    addressId,
  }: {
    event: MouseEvent<HTMLButtonElement>;
    version: number;
    addressId: string;
  }): Promise<void> => {
    event.stopPropagation();
    setIsDisabledDeleteButton(true);
    const controller = ApiController.getInstance();

    try {
      const response = await controller.removeCustomerAddress({ version, addressId });
      const customer = response.body;
      setCurrentCustomer(customer);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    } finally {
      setIsDisabledDeleteButton(false);
    }
  };

  /* MODAL HANDLERS */
  const handleCloseModal = (): void => {
    setIsOpenModal(false);
    setAddressActionType(null);
    setSelectAddressValues(null);
  };

  /* BILLING TABLE */
  const AddressesTable = () => {
    const {
      addresses,
      billingAddressIds,
      shippingAddressIds,
      defaultBillingAddressId,
      defaultShippingAddressId,
    } = currentCustomer;

    const sortAddresses = addresses
      .map((address) => ({
        address,
        isDefaultAddress: address.id === defaultShippingAddressId,
      }))
      .sort((a, b) => {
        if (a.isDefaultAddress !== b.isDefaultAddress) {
          return a.isDefaultAddress ? -1 : 1;
        }

        const countryComparison = a.address.country.localeCompare(b.address.country);
        if (countryComparison !== 0) return countryComparison;

        const cityComparison = (a.address.city ?? '').localeCompare(b.address.city ?? '');
        if (cityComparison !== 0) return cityComparison;

        return (a.address.streetName ?? '').localeCompare(b.address.streetName ?? '');
      });

    return (
      <>
        <Paper sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Table
              sx={{ width: '100%', minWidth: 450 }}
              aria-labelledby="tableTitle"
              size={'small'}
              padding="none"
            >
              <EnhancedTableHead />
              <TableBody>
                {sortAddresses.map((customerAddress, index) => {
                  const {
                    id = '',
                    country = '',
                    city = '',
                    streetName = '',
                    postalCode = '',
                  } = customerAddress.address;

                  const selectAddress = { city, streetName, country, postalCode, id };
                  const selectAddressType = {
                    useAsBilling: billingAddressIds?.includes(id) ?? false,
                    useAsShipping: shippingAddressIds?.includes(id) ?? false,
                    setAsDefaultBilling: defaultBillingAddressId === id,
                    setAsDefaultShipping: defaultShippingAddressId === id,
                  };

                  return (
                    <TableRow
                      key={id}
                      hover
                      onClick={() => handleAddressSelect({ selectAddress, selectAddressType })}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{city}</TableCell>
                      <TableCell align="center">{streetName}</TableCell>
                      <TableCell align="center">{postalCode}</TableCell>
                      <TableCell align="center">{country}</TableCell>
                      <TableCell align="center">
                        <Stack sx={{ flexDirection: 'column', gap: spacing(1), flexWrap: 'wrap' }}>
                          <div>
                            {billingAddressIds?.includes(id) && <span>#billing</span>}{' '}
                            {shippingAddressIds?.includes(id) && <span>#shipping</span>}
                          </div>
                          <div>
                            {defaultBillingAddressId === id && <span>#defaultBilling</span>}{' '}
                            {defaultShippingAddressId === id && <span>#defaultShipping</span>}
                          </div>
                          {!billingAddressIds?.includes(id) &&
                            !shippingAddressIds?.includes(id) && <span>{'-'}</span>}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete address"
                          onClick={(event: MouseEvent<HTMLButtonElement>) =>
                            void handleDeleteAddress({
                              event,
                              version: currentCustomer.version,
                              addressId: id,
                            })
                          }
                          title="Delete Address"
                          color="error"
                          disabled={isDisabledDeleteButton}
                        >
                          <RemoveCircleOutlineIcon sx={{ fontSize: spacing(5) }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {addresses.length === 0 && <div>The address list is empty...</div>}
        </Paper>
      </>
    );
  };

  return (
    <>
      <Stack sx={{ flexGrow: 1, width: '100%', rowGap: spacing(4) }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleAddAddress}
          sx={{ marginLeft: 'auto' }}
        >
          Add Address
        </Button>

        <AddressesTable />

        <Dialog open={isOpenModal} maxWidth={'sm'} fullWidth onClose={handleCloseModal}>
          <DialogContent sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: 'absolute', top: 4, right: 12 }}
              aria-label="close address form"
            >
              <CloseIcon />
            </IconButton>

            <AddressForm
              actionType={addressActionType}
              handleCloseModal={handleCloseModal}
              selectedAddressValues={selectedAddressValues}
            />
          </DialogContent>
        </Dialog>
      </Stack>
    </>
  );
};
