import LogoIcon from '@assets/icons/lego-logo_compressed.png';
import { AuthPanel, HeaderSkeleton, LogoLink, Navigation, ProfilePanel } from '@components';
import { useAppDataContext } from '@hooks';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  useTheme,
} from '@mui/material';
import { UrlPath } from '@ts-enums';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentCustomer, setCurrentCustomer, loading, cart } = useAppDataContext();
  const { palette, spacing } = useTheme();

  const location = useLocation();
  const isActiveShoppingCart = location.pathname.slice(1) === UrlPath.SHOPPING_CART.toString();

  const numberOfItemsInCart = cart?.lineItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const handleBurgerMenuToggle = () => {
    setOpen((previous) => !previous);
  };

  const renderUserPanel = ({ isOpenBurgerMenu = false }: { isOpenBurgerMenu?: boolean }) => {
    const panelProps = {
      onBurgerMenuClose: isOpenBurgerMenu ? handleBurgerMenuToggle : undefined,
      isOpenBurgerMenu,
    };
    return currentCustomer ? (
      <ProfilePanel
        className="flex items-center justify-center gap-x-2"
        currentCustomer={currentCustomer}
        {...panelProps}
      />
    ) : (
      <AuthPanel {...panelProps} />
    );
  };

  return loading ? (
    <HeaderSkeleton />
  ) : (
    <AppBar color="inherit" position="sticky">
      <Container>
        <Toolbar disableGutters sx={{ columnGap: spacing(4), minHeight: { xs: spacing(16) } }}>
          <LogoLink className="mr-auto md:mr-6" srcImg={LogoIcon} path={UrlPath.HOME} />
          <div className="hidden grow-1 items-center md:flex">
            <Navigation navClassName="mr-auto" listClassName="flex gap-x-4" />
            {renderUserPanel({ isOpenBurgerMenu: false })}
          </div>

          <Badge
            badgeContent={numberOfItemsInCart}
            showZero
            max={99}
            component={Link}
            to={UrlPath.SHOPPING_CART}
            color="warning"
            title="Shopping Cart"
            sx={{
              marginRight: 2,
              '& .MuiBadge-badge': {
                fontSize: '12px',
                padding: '4px',
              },
            }}
          >
            <ShoppingCartIcon
              sx={{ color: isActiveShoppingCart ? palette.primary.main : palette.text.secondary }}
            />
          </Badge>

          <IconButton
            edge="start"
            onClick={handleBurgerMenuToggle}
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleBurgerMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '100%',
              sm: 250,
            },
          },
        }}
      >
        <Box sx={{ padding: spacing(2), alignSelf: 'flex-end' }}>
          <IconButton onClick={handleBurgerMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider variant="middle" />

        <Box sx={{ padding: spacing(2), flexGrow: 1 }}>
          <Box>{renderUserPanel({ isOpenBurgerMenu: true })}</Box>
          <Navigation
            navClassName="grow-1 p-4 text-center"
            itemClassName="py-2"
            onClick={handleBurgerMenuToggle}
          />
        </Box>
      </Drawer>
    </AppBar>
  );
};
