import { ListSubheader, styled } from '@mui/material';
import { IconDots } from '@tabler/icons-react';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
  hideMenu: string | boolean;
}

const NavGroup = ({ item, hideMenu }: ItemType) => {
const ListSubheaderStyle = styled((props: any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.subtitle2,
      fontWeight: 700,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      border: 'none',
      padding: '8px 24px',
      color: '#111827',
      lineHeight: '26px',
      letterSpacing: '0.5px',
      backgroundColor: 'transparent',
    }),
  );

  return (
    <ListSubheaderStyle>{hideMenu ? <IconDots size="14" /> : item?.subheader}</ListSubheaderStyle>
  );
};

export default NavGroup;
