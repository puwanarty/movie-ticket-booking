import { FormControl, MenuItem, Select } from "@mui/material";

const Dropdown = ({ list, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          color: (t) => t.palette.common.white,
          fontWeight: 700,
        },
      }}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {list.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
