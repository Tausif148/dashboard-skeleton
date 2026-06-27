import React, { useState } from 'react';
import { useLocation } from 'react-router';

// mui imports
import { Collapse, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';

// custom imports
import NavItem from '../NavItem';

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

type NavGroupProps = {
  [x: string]: any;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
};

interface NavCollapseProps {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

// FC Component For Dropdown Menu
const NavCollapse = ({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick,
}: NavCollapseProps) => {
  const Icon = menu?.icon;
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const menuIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const handleClick = () => {
    setOpen(!open);
  };

  // menu collapse for sub-levels
  React.useEffect(() => {
    setOpen(false);
    menu?.children?.forEach((item: any) => {
      if (item?.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  interface StyledProps {
    isSelected?: boolean;
  }

  interface StyledProps {
    isSelected?: boolean;
    level?: number;
    hideMenu?: boolean;
  }

  const ListItemStyled = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'level' && prop !== 'hideMenu',
  })<StyledProps>(({ theme, isSelected, level = 1, hideMenu }) => ({
    marginBottom: '4px',
    padding: '10px 16px',
    borderRadius: '8px',
    color: '#6B7280',
    marginRight: '16px',
    marginLeft: hideMenu ? '0px' : level === 1 ? '16px' : `${16 + (level - 1) * 16}px`,

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
      backgroundColor: '#F3F0FF',
      color: '#673AB7',

      '& .MuiListItemIcon-root': {
        color: '#673AB7 !important',
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
        backgroundColor: '#F3F0FF',
        color: '#673AB7',

        '& .MuiListItemIcon-root': {
          color: '#673AB7 !important',
        },
      },
    },
  }));

  // If Menu has Children
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <>
      <ListItemStyled
        level={level}
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText>{hideMenu ? '' : <>{t(`${menu.title}`)}</>}</ListItemText>
        {!open ? <IconChevronDown size="1rem" /> : <IconChevronUp size="1rem" />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </>
  );
};

export default NavCollapse;
