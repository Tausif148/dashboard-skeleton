'use client'

import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';

const CustomTextField = styled((props: TextFieldProps & { maxLength?: number }) => {
  const { maxLength, ...rest } = props;
  return (
    <TextField
    sx={{backgroundColor:"#ffff",borderRadius:"7px"}}
      {...rest}
      inputProps={{
        ...(props.inputProps || {}),
        ...(maxLength !== undefined ? { maxLength } : {}),
      }}
    />
  );
})(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

export default CustomTextField;
