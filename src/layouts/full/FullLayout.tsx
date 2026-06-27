import { Box, styled, useTheme } from '@mui/material';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import config from 'src/context/config';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { RootState } from 'src/redux/store';
import ScrollToTop from '../../components/shared/ScrollToTop';
import LoadingBar from '../../LoadingBar';
import HorizontalHeader from '../full/horizontal/header/Header';
import Navigation from '../full/horizontal/navbar/Navigation';
import Customizer from './shared/customizer/Customizer';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  minWidth: 0,
  padding: '0px',
  backgroundColor: '#fff',
  border: 'none',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  minWidth: 0,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  padding: '0px',
  backgroundColor: '#fff',
}));

const FullLayout: FC = () => {
  const { activeLayout, activeMode, isCollapse } = useContext(CustomizerContext);
  const MiniSidebarWidth = config.miniSidebarWidth;
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <LoadingBar />

      <MainWrapper className={activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        {activeLayout === 'horizontal' ? '' : <Sidebar />}
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse === 'mini-sidebar' && {
              [theme.breakpoints.up('lg')]: { ml: `${MiniSidebarWidth}px` },
              boxShadow: 'none',
            }),
          }}
        >
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          {activeLayout === 'horizontal' ? <HorizontalHeader /> : <Header />}
          {/* PageContent */}
          {activeLayout === 'horizontal' ? <Navigation /> : ''}
          <Box
            sx={{
              px: 2,
              minWidth: 0,
              boxShadow: 'none',
            }}
          >
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}
            <Box sx={{ minHeight: 'calc(100vh -0px)', minWidth: 0, boxShadow: 'none' }}>
              <ScrollToTop>
                <Outlet />
              </ScrollToTop>
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Box>
          <Customizer />
        </PageWrapper>
        <ToastContainer />
      </MainWrapper>
    </>
  );
};

export default FullLayout;
