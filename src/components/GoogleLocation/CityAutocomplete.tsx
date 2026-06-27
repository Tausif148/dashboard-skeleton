import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    state: string;
    value: string;
    onChange: (val: string) => void;
    error?: boolean;
    helperText?: string;
}

const CityAutocomplete = ({
    state,
    value,
    onChange,
    error,
    helperText,
}: Props) => {
    const [options, setOptions] = useState<any[]>([]);

    useEffect(() => {
        if (!state) {
            setOptions([]);
            return;
        }

        const fetchCities = async () => {
            try {
                console.log("STATE:", state);

                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/state/cities",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            country: "India",
                            state: state,
                        }),
                    }
                );

                const data = await res.json();
                console.log("CITY API:", data);

                if (!data?.data || data.data.length === 0) {
                    setOptions([]);
                    return;
                }

                const cities = data.data.map((c: string) => ({
                    label: c,
                    value: c,
                }));

                setOptions(cities);
            } catch (err) {
                console.error("City fetch error:", err);
                setOptions([]);
            }
        };

        fetchCities();
    }, [state]);

    return (
        <Autocomplete
            disablePortal
            sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
            options={options}

            getOptionLabel={(option) => option.label}

            value={options.find((o) => o.value === value) || null}

            onChange={(_, newValue) => onChange(newValue?.value || "")}

            isOptionEqualToValue={(opt, val) => opt.value === val.value}

            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Select City"
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
            disabled={!state}
        />
    );
};

export default CityAutocomplete;