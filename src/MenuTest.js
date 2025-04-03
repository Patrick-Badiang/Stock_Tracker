import * as React from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Box, List, CssBaseline, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar} from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import HomeIcon from '@mui/icons-material/Home';

import { Search, AttachMoney, AlignVerticalBottom, Feed, Phone } from '@mui/icons-material';

import HomeHome from './HomePage/home';
import SearchHome from './SearchPage/Stock_Home';
import DividendsHome from './DividendsPage/home';
import PortfolioHome from './PortfolioPage/PortfolioHome';
import EarningsHome from './EarningsPage/home';
import NewsHome from './NewsPage/News_Home';

import MyLogo from './Logo.png';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })
(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open ? {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  } : {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function StockTracker() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(!open);
    // setOpen(false);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx = {{height: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <List>
            {[{ text: 'Home', icon: <HomeIcon />, path: '/' },
              { text: 'Stocks', icon: <Search />, path: '/search' },
              { text: 'Positions', icon: <AlignVerticalBottom />, path: '/positions' },
              { text: 'Dividends', icon: <AttachMoney />, path: '/dividends' },
              { text: 'News', icon: <Feed />, path: '/news' },
              { text: 'Earnings', icon: <Phone />, path: '/earnings' }
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link} to={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    mr: open ? 3 : 'auto',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </Box>
          <Box sx = {{height:'10%'}}/>
          <Divider />
          
          <List>
            <ListItem>
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src={MyLogo} sx={{height:64, width:44}}/>
            </ListItemIcon>
            <ListItemText primary="Kustu" />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<HomeHome/>} />
            <Route path="/search" element={<SearchHome/>} />
            <Route path="/positions" element={<PortfolioHome/>} />
            <Route path="/dividends" element={<DividendsHome/>} />
            <Route path="/news" element={<NewsHome/>} />
            <Route path="/earnings" element={<EarningsHome/>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}