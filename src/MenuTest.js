import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';

import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Find New Stock',
  },
  {
    segment: 'dashboard',
    title: 'Search',
    icon: <SearchIcon />,
  },
  
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Portfolio Analytics',
  },
  {
    segment: 'portfolio',
    title: 'Portfolio',
    icon: <FolderIcon/>,
  },
  {
    segment: 'news',
    title: 'Latest News',
    icon: <NewspaperIcon/>,
  },
  {
    segment: 'reports',
    title: 'Earnings Report',
    icon: <SummarizeIcon />,
  },
  {
    segment: 'dividends',
    title: 'Dividends',
    icon: <AttachMoneyIcon />,
  },
  {
    segment: 'positions',
    title: 'Positions',
    icon: <AssessmentIcon />,
  }
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/portfolio');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="/Logo.png" alt="logo" />,
        title: 'Stock Tracker',
        homeUrl: '/toolpad/core/introduction',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}