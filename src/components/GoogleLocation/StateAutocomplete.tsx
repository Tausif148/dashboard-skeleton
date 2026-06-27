import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    country: string;
    value: string;
    onChange: (val: string) => void;
    error?: boolean;
    helperText?: string;
}

const StateAutocomplete = ({ country, value, onChange, error, helperText }: Props) => {
    const [options, setOptions] = useState<any[]>([]);

    useEffect(() => {
        if (!country) {
            setOptions([]);
            return;
        }

        const fetchStates = async () => {
            try {
                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/states",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ country }),
                    }
                );

                const data = await res.json();

                const states = data?.data?.states?.map((s: any) => ({
                    label: s.name,
                    value: s.name,
                }));

                setOptions(states || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStates();

    }, [country]);
    console.log("OPTIONS:", options);
    
    return (
        <>
            <Autocomplete
                disablePortal
                disabled={!country}
                sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                options={options}

                getOptionLabel={(option) => option.label}

                value={options.find((o) => o.value === value) || null}

                onChange={(_, newValue) => onChange(newValue?.value || "")}

                isOptionEqualToValue={(opt, val) => opt.value === val.value}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Select state"
                        size="small"
                        error={error}
                        helperText={helperText}
                        sx={{
                            "& .MuiInputBase-root": {
                                padding: "0px 8px",
                                minHeight: "43px",
                            },
                            "& .MuiInputBase-input": {
                                padding: "8px 0px",
                            },
                        }}
                    />
                )}
            />
        </>
    );
};

export default StateAutocomplete;