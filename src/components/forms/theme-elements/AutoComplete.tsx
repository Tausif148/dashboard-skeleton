import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  debounce,
  FormControl,
  FormHelperText,
  FormLabel,
  Autocomplete as MUIAutocomplete,
  SxProps,
  TextField,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";

interface IAutoComplete<T> {
  options: T[];
  label?: string;
  onChange?: (
    value: T | string | (string | T)[] | null,
    reason?: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>,
  ) => void;
  getOptionLabel: (option: T | string) => string;
  helperText?: string;
  defaultValue?: (string | T)[] | string | T | null;
  disabled?: boolean;
  id?: string;
  name?: string;
  paperStyle?: SxProps;
  sxProps?: SxProps;
  freeSolo?: boolean;
  multiple?: boolean;
  disableCloseOnSelect?: boolean;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
  ) => React.ReactNode;
  disableClearable?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  onOpen?: () => void;
  fullWidth?: boolean;
  error?: boolean;
  startIcon?: React.ReactNode;
  autoComplete?: string;
  allowedPattern?: RegExp;
  onInputChange?: (value: string) => void;
  disablePortal?: boolean;
}

function Autocomplete<T>({
  options = [],
  label,
  onChange,
  getOptionLabel,
  helperText,
  multiple = false,
  disabled = false,
  id,
  paperStyle,
  sxProps,
  defaultValue = multiple ? [] : null,
  freeSolo = false,
  disableCloseOnSelect = false,
  renderOption,
  disableClearable = false,
  placeholder,
  onOpen,
  isLoading,
  fullWidth,
  allowedPattern,
  onInputChange,
  autoComplete,
  disablePortal,
}: IAutoComplete<T>) {
  const [selectedValue, setSelectedValue] = useState<any>(
    defaultValue ?? (multiple ? [] : null)
  );
  const [inputValue, setInputValue] = useState("");

  const debouncedInputChange = debounce((newValue: string) => {
    onInputChange?.(newValue);
  }, 300);

  const handleChange = useCallback(
    (
      _event: any,
      newValue: any,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<T>,
    ) => {
      let normalizedValue = newValue;

      if (multiple && Array.isArray(newValue)) {
        normalizedValue = newValue.map((val) =>
          typeof val === "string" ? { id: val, value: val } : val
        );
      } else if (!multiple && typeof newValue === "string") {
        normalizedValue = { id: newValue, value: newValue };
      }

      setSelectedValue(normalizedValue);

      if (reason === "selectOption" || reason === "createOption") {
        setInputValue("");
      }

      onChange?.(normalizedValue, reason, details);
    },
    [onChange, multiple],
  );

  const handleInputChange = useCallback(
    (_: any, newInputValue: string, reason: string) => {
      if (reason === "input" || reason === "reset") {
        let filteredValue = newInputValue;

        if (allowedPattern) {
          filteredValue = [...newInputValue]
            .filter((char) => allowedPattern.test(char))
            .join("");
        }

        setInputValue(filteredValue);
        onInputChange && debouncedInputChange(filteredValue);
      } else if (reason === "clear") {
        setInputValue("");
      }
    },
    [debouncedInputChange, onInputChange, allowedPattern],
  );

  useEffect(() => {
    if (!defaultValue || (Array.isArray(defaultValue) && defaultValue.length === 0)) {
      setSelectedValue(multiple ? [] : null);
      setInputValue("");
      return;
    }

    if (JSON.stringify(defaultValue) !== JSON.stringify(selectedValue)) {
      setSelectedValue(defaultValue);

      if (!multiple && defaultValue) {
        let newInput = "";

        if (typeof defaultValue === "string") {
          newInput = defaultValue;
        } else if (Array.isArray(defaultValue)) {
          newInput = defaultValue[0] ? getOptionLabel(defaultValue[0]) : "";
        } else {
          newInput = getOptionLabel(defaultValue);
        }

        setInputValue(newInput);
      }
    }
  }, [defaultValue, multiple, getOptionLabel]);

  return (
    <FormControl
      sx={{
        width: "100%",
        maxWidth: fullWidth ? "100%" : "600px",
        ...paperStyle,
      }}
    >
      {label && <FormLabel>{label}</FormLabel>}

      <MUIAutocomplete
        disableClearable={disableClearable}
        disableCloseOnSelect={disableCloseOnSelect}
        disabled={disabled}
        disablePortal={disablePortal}
        freeSolo={freeSolo}
        getOptionLabel={getOptionLabel}
        id={id}
        inputValue={inputValue}
        loading={isLoading}
        multiple={multiple}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            autoComplete={autoComplete}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              sx: {
                height: "42px",
                paddingRight: "8px",
                fontSize: "0.875rem",
                borderRadius: "8px",
              },
            }}
            inputProps={{
              ...params.inputProps,
              sx: {
                padding: "10px 12px",
                fontSize: "0.875rem",
              },
            }}
          />
        )}
        renderOption={renderOption}
        sx={{
          borderRadius: "8px",
          fontSize: { xs: "1rem", xl: "1.3rem" },
          ...sxProps,
        }}
        value={selectedValue ?? (multiple ? [] : null)}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onOpen={onOpen}
      />

      {helperText && (
        <FormHelperText sx={{ color: "#d32f2f" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default memo(Autocomplete);
