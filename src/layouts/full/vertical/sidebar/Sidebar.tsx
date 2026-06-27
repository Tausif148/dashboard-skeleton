import { Avatar, Box, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useAuthActions } from 'src/apiActions/useAuthActions';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import config from 'src/context/config';
import { CustomizerContext } from 'src/context/CustomizerContext';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon } from 'src/icons/icons';
import { useFetchCompanyById } from 'src/queries/useFetchCompanyById';
import Logo from '../../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Profile } from './SidebarProfile/Profile';

const Sidebar = () => {
  const navigate = useNavigate();
  const { tryLogout } = useAuthActions();
  const { userId, company_id } = useDecoded();
  const { data: company, isError } = useFetchCompanyById({ company_id: company_id });
  // Hospitalmay be wrapped in the response object from useListQuery
  const companyData =
    company?.data?.data && Array.isArray(company.data.data)
      ? company.data.data[0]
      : company?.data?.data || company?.data || null;
  const handleLogout = async () => {
    await tryLogout();
    navigate('/login');
  };

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const { isCollapse, isSidebarHover, setIsSidebarHover, isMobileSidebar, setIsMobileSidebar } =
    useContext(CustomizerContext);

  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;

  const theme = useTheme();
  const toggleWidth =
    isCollapse == 'mini-sidebar' && !isSidebarHover ? MiniSidebarWidth : SidebarWidth;

  // read branch info from localStorage (set at login)
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let branchLogoUrl: string | undefined;
  let branchName = 'Banking';
  try {
    const parsed: any = userJson ? JSON.parse(userJson) : null;
    branchLogoUrl = parsed?.branch?.branch_logo?.image_url || parsed?.branch?.branch_logo;
    branchName = parsed?.branch?.branch_name || branchName;
  } catch (e) {
    branchLogoUrl = undefined;
  }

  const onHoverEnter = () => {
    if (isCollapse == 'mini-sidebar') {
      setIsSidebarHover(true);
    }
  };

  const onHoverLeave = () => {
    setIsSidebarHover(false);
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse == 'mini-sidebar' && {
            position: 'absolute',
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                backgroundColor: '#ffffff',
                borderRight: '1px solid #E5E7EB',
                color: '#000',
                transition: theme.transitions.create('width', {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: 'border-box',
                height: '100vh',
                overflow: 'hidden',
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box sx={{ height: '98%' }}>
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 2.35,
                px: 2.5,
                borderRadius: 0,
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              {branchLogoUrl ||
                companyData?.company_logo?.image_url ||
                companyData?.profile_image?.image_url ? (
                <Avatar
                  src={
                    branchLogoUrl ||
                    companyData?.company_logo?.image_url ||
                    companyData?.profile_image?.image_url
                  }
                  alt={companyData?.company_name || 'Company'}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                  }}
                  imgProps={{
                    onError: (e: any) => {
                      e.target.style.display = 'none';
                    },
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    bgcolor: '#5D87FF',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <AddIcon fontSize="small" />
                </Box>
              )}
              {(!lgUp || toggleWidth === SidebarWidth) && (
                <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#111827', fontSize: '16px' }}
                  >
                    {companyData?.company_name || 'Dashboard Skeleton'}
                  </Typography>
                </Box>
              )}
            </Box>
            <Scrollbar sx={{ height: 'calc(100% - 130px)' }}>
              <SidebarItems />
            </Scrollbar>
            <Profile />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={() => setIsMobileSidebar(false)}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            width: SidebarWidth,
            border: '0 !important',
            boxShadow: 'none',
          },
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
