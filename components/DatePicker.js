import { FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const DatePicker = ({ value, setValue }) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <FormControl fullWidth>
      <DesktopDatePicker
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                color: (t) => t.palette.common.white,
                fontWeight: 700,
              },
            }}
            {...params}
          />
        )}
      />
    </FormControl>
  );
};

export default DatePicker;
