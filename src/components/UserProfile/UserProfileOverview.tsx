import avatarImg from '@assets/images/lego-avatar.jpeg';
import type { Address } from '@commercetools/platform-sdk';
import { useCustomerContext } from '@hooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ProfileAvatar } from 'components/ProfileButton/ProfileAvatar';
import type { JSX } from 'react';

import { UserProfileSkeleton } from './UserProfileSkeleton';

interface UserAddressListProps {
  type: 'billing' | 'shipping';
  addresses: Address[];
  defaultAddress?: string;
}

export const UserProfileOverview = () => {
  const { currentCustomer } = useCustomerContext();
  const { palette } = useTheme();

  if (!currentCustomer) return <UserProfileSkeleton />;

  const userInfo = [
    {
      title: 'Email Address: ',
      value: currentCustomer.email,
      icon: <MailOutlineIcon sx={{ fontSize: 14 }} />,
    },
    {
      title: 'Date of Birth',
      value: currentCustomer.dateOfBirth,
      icon: <CalendarMonthIcon sx={{ fontSize: 14 }} />,
    },
  ];

  const { defaultBillingAddressId, defaultShippingAddressId } = currentCustomer;

  const billingAddresses = currentCustomer.addresses
    .filter((address) => {
      const { id } = address;
      return !!id && currentCustomer.billingAddressIds?.includes(id);
    })
    .sort((a, b) => {
      const cityA = a.city ?? '';
      const cityB = b.city ?? '';
      const cityComparison = cityA.localeCompare(cityB);
      if (cityComparison !== 0) return cityComparison;

      const streetA = a.streetName ?? '';
      const streetB = b.streetName ?? '';
      return streetA.localeCompare(streetB);
    });

  const shippingAddresses = currentCustomer.addresses
    .filter((address) => {
      const { id } = address;
      return !!id && currentCustomer.shippingAddressIds?.includes(id);
    })
    .sort((a, b) => {
      const cityA = a.city ?? '';
      const cityB = b.city ?? '';
      const cityComparison = cityA.localeCompare(cityB);
      if (cityComparison !== 0) return cityComparison;

      const streetA = a.streetName ?? '';
      const streetB = b.streetName ?? '';
      return streetA.localeCompare(streetB);
    });

  const userInfoList = userInfo.map((info) => (
    <Box key={info.title}>
      <Typography variant="h5">{info.title}</Typography>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 2,
          paddingLeft: 2,
          color: palette.text.secondary,
        }}
      >
        {info.icon}
        <Typography variant="body2">{info.value}</Typography>
      </Stack>
    </Box>
  ));

  const createUserAddressListJSX = ({
    type,
    addresses,
    defaultAddress,
  }: UserAddressListProps): JSX.Element[] => {
    return addresses.map((address) => {
      const { id, country, city, streetName, postalCode } = address;
      return (
        <Stack
          component={'li'}
          key={id}
          sx={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: 2,
            paddingLeft: 2,
            fontSize: '14px',
            color: palette.text.secondary,
          }}
        >
          {type === 'billing' ? (
            <CreditScoreIcon sx={{ fontSize: 14 }} />
          ) : (
            <LocalShippingIcon sx={{ fontSize: 14 }} />
          )}
          <span>{(country === 'BY' ? 'Belarus' : country) + ','}</span>
          <span>{city}</span>
          <span>{streetName}</span>
          <span>{postalCode}</span>
          {id === defaultAddress ? (
            <span style={{ fontSize: '10px', color: palette.secondary.dark }}>{'[ default ]'}</span>
          ) : null}
        </Stack>
      );
    });
  };

  return (
    <>
      <Stack direction={'row'} justifyContent={'center'}>
        <ProfileAvatar avatarSize={150} imgSource={avatarImg} />
      </Stack>

      {/* User Name */}
      <Typography variant="h3" sx={{ paddingBlock: 4, textAlign: 'center' }}>
        {`${currentCustomer.firstName} ${currentCustomer.lastName}`.toUpperCase()}
      </Typography>

      <Stack sx={{ rowGap: 4, width: { xs: '100%', lg: '75%' }, marginInline: 'auto' }}>
        {/* Email & Bday */}
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 4,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {userInfoList}
        </Stack>

        {/* Billing addresses */}
        <Box>
          <Typography variant="h5">Billing addresses: </Typography>
          <ul>
            {createUserAddressListJSX({
              type: 'billing',
              addresses: billingAddresses,
              defaultAddress: defaultBillingAddressId,
            })}
          </ul>
        </Box>

        {/* Shipping addresses */}
        <Box>
          <Typography variant="h5">Shipping addresses: </Typography>
          <ul>
            {createUserAddressListJSX({
              type: 'shipping',
              addresses: shippingAddresses,
              defaultAddress: defaultShippingAddressId,
            })}
          </ul>
        </Box>
      </Stack>
    </>
  );
};
