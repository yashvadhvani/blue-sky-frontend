import React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";

const SelectState = ({
  options,
  value,
  onChange,
}: {
  options: { id: number; name: string }[];
  value: number | undefined;
  onChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined;
}) => {
  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiInputLabel-shrink": { display: "none" },
      }}
    >
      <InputLabel id="select-state-label">Select State</InputLabel>
      <Select
        labelId="select-state-label"
        id="select-state-dd"
        value={value?.toString()}
        onChange={onChange}
        fullWidth
        sx={{
          border: "1px solid #DDD !important",
          "& legend": { display: "none" },
          "& fieldset": { top: 0, border: "none" },
          "& input": {
            border: "none !important",
          },
          "& .MuiSelect-select": {
            border: "none !important",
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectState;
