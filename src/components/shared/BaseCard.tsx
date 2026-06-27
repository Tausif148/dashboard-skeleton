import { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';
import { CustomizerContext } from 'src/context/CustomizerContext';

type Props = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  isNavigatePrevious?: boolean;
  path?: string;
  isBack?: boolean;
};

const BaseCard = ({
  title,
  children,
  isNavigatePrevious = false,
  path = '/',
  isBack = false,
}: Props) => {
  const { isCardShadow } = useContext(CustomizerContext);
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (isNavigatePrevious) {
      navigate(-1);
    } else {
      navigate(path);
    }
  };

  return (
    <Card
      sx={{ padding: 0 }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? 'outlined' : undefined}
    >
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            {isBack && (
              <IconButton onClick={handleBackClick} size="small">
                <ArrowBackIosIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            )}
            <Typography variant="h6">{title}</Typography>
          </Stack>
        }
      />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
