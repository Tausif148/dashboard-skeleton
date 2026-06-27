import React from 'react';
import { NavLink } from 'react-router';

// mui imports
import {
  Box,
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from '@mui/material';

import { useTranslation } from 'react-i18next';

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  hideMenu?: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, hideMenu, onClick }: ItemType) => {
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'level',
  })<{ level?: number }>(({ theme, level = 0 }) => ({
    marginBottom: '4px',
    padding: '10px 16px',
    borderRadius: '8px',
    color: '#6B7280',
    marginRight: '16px',
    marginLeft: level === 1 ? '0px' : `${16 + (level - 1) * 0}px`,

    '& .MuiListItemIcon-root': {
      color: 'inherit',
      minWidth: '36px',
    },

    '& .MuiListItemText-primary': {
      color: 'inherit',
      fontWeight: 500,
      fontSize: '15px',
    },

    '&:hover': {
      backgroundColor: '#F3F4F6',
      color: '#111827',
    },

    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: '#EEF2FF', // Soft Indigo background
      color: '#4f46e5', // Primary Indigo text

      '& .MuiListItemIcon-root': {
        color: '#4f46e5 !important',
      },
      '& .MuiListItemText-primary': {
        fontWeight: 600,
      },
    },

    [theme.breakpoints.down('lg')]: {
      color: '#6B7280',

      '& .MuiListItemIcon-root': {
        color: '#6B7280',
      },

      '&.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: '#EEF2FF',
        color: '#4f46e5',

        '& .MuiListItemIcon-root': {
          color: '#4f46e5 !important',
        },
      },
    },
  }));

  const listItemProps: {
    component: any;
    href?: string;
    target?: any;
    to?: any;
  } = {
    component: item?.external ? 'a' : NavLink,
    to: item?.href,
    href: item?.external ? item?.href : '',
    target: item?.external ? '_blank' : '',
  };

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <ListItemStyled
        {...listItemProps}
        level={level || 0}
        disabled={item?.disabled}
        selected={pathDirect === item?.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color:
              level > 1 && pathDirect === item?.href
                ? `${theme.palette.primary.main}!important`
                : 'inherit',
            '& .MuiSvgIcon-root': {
              transition: 'all .2s ease',
            },
            '&.selectedIcon': {
              borderRadius: '8px',
              padding: '6px',
            },
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          {hideMenu ? '' : <>{t(`${item?.title}`)}</>}
          <br />
          {item?.subtitle ? (
            <Typography variant="caption">{hideMenu ? '' : item?.subtitle}</Typography>
          ) : (
            ''
          )}
        </ListItemText>

        {!item?.chip || hideMenu ? null : (
          <Chip
            color={item?.chipColor}
            variant={item?.variant ? item?.variant : 'filled'}
            size="small"
            label={item?.chip}
          />
        )}
        {/* small notification dot if item.dot is true */}
        {item?.dot && !hideMenu ? (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', ml: 1 }} />
        ) : null}
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
