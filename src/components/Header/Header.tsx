import LogoIcon from '@assets/icons/logo.png';
import { AuthPanel, LogoLink, Navigation, ProfilePanel } from '@components';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Container, Divider, Drawer, IconButton, Toolbar } from '@mui/material';
import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { use, useState } from 'react';
import { Link } from 'react-router';
import { theme } from 'theme';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentCustomer, setCurrentCustomer } = use(CustomerContext)!;

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
        setCurrentCustomer={setCurrentCustomer}
        currentCustomer={currentCustomer}
        {...panelProps}
      />
    ) : (
      <AuthPanel {...panelProps} />
    );
  };

  return (
    <AppBar color="inherit" position="sticky">
      <Container>
        <Toolbar disableGutters sx={{ columnGap: theme.spacing(4) }}>
          <LogoLink className="mr-auto md:mr-6" srcImg={LogoIcon} path={UrlPath.HOME} />
          <div className="hidden grow-1 items-center md:flex">
            <Navigation navClassName="mr-auto" listClassName="flex gap-x-4" />
            {renderUserPanel({ isOpenBurgerMenu: false })}
          </div>

          <IconButton component={Link} to={UrlPath.BASKET} color="primary" title="Shopping Cart">
            <ShoppingCartIcon />
          </IconButton>

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
        <div className="flex justify-between gap-x-4 p-4">
          {renderUserPanel({ isOpenBurgerMenu: true })}
          <IconButton onClick={handleBurgerMenuToggle}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider variant="middle" />
        <Navigation
          navClassName="grow-1 p-4 text-center"
          itemClassName="py-2"
          onClick={handleBurgerMenuToggle}
        />
      </Drawer>
    </AppBar>
  );
};
