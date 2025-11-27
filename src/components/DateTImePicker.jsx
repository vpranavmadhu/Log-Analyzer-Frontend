import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack } from '@mui/material';
import dayjs from "dayjs";

export default function DateTimeRange({ startTime, endTime, setStartTime, setEndTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2}>

        <DateTimePicker
          label="Start Time"
          ampm={false}
          value={startTime}
          onChange={(val) => setStartTime(val)}
        />

        <DateTimePicker
          label="End Time"
          value={endTime}
          ampm={false}
          onChange={(val) => setEndTime(val)}
        />

      </Stack>
    </LocalizationProvider>
  );
}
