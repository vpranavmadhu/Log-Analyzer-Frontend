import {
  Autocomplete,
  TextField,
  Button,
  Box
} from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCount, setLogs, setPage } from '../logSlice';
import { setFilters } from '../filterSlice';
import DateTimeRange from './DateTImePicker';
import dayjs from 'dayjs';

const levels = ['ERROR', 'WARN', 'DEBUG', 'INFO'];
const components = ['api-server', 'cache', 'worker', 'database']
const hosts = ['web01', 'web02', 'cache01', 'db01']

export const FilterForm = () => {
  const [level, setLevel] = React.useState([]);
  const [component, setComponent] = React.useState([]);
  const [host, setHost] = React.useState([]);
  const [requestId, setRequestId] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  console.log("start: ", startTime)
  console.log("end: ", endTime);
  



  // const page = useSelector((state) => state?.logStore?.page)
  // const rowsPerPage = useSelector((state) => state?.logStore?.rowsPerPage)


  const dispatch = useDispatch();
  // console.log("requestId",requestId)

  const filters = {
      level: level,
      component: component,
      host: host,
      request_id: requestId,
      start_time: startTime ? dayjs(startTime).format("YYYY-MM-DD HH:mm:ss") : null,
      end_time: endTime ? dayjs(endTime).format("YYYY-MM-DD HH:mm:ss") : null
    }

  return (
    <div className='! bg-white h-30 border-slate-800 rounded-2xl flex items-center justify-center flex-col min-h-50'>
      {/* <div><h3>FILTER FORM</h3></div> */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 2 }}>
        

      <Autocomplete
        multiple
        options={levels}
        value={level}
        onChange={(e, newValue) => setLevel(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Level" placeholder="Search level" />
        )}
        sx={{ minWidth: 220 }}
      />

      <Autocomplete
        multiple
        options={components}
        value={component}
        onChange={(e, newValue) => setComponent(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Component" placeholder="Search component" />
        )}
        sx={{ minWidth: 220 }}
      />

      <Autocomplete
      multiple
        options={hosts}
        value={host}
        onChange={(e, newValue) => setHost(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Host" placeholder="Search host" />
        )}
        sx={{ minWidth: 220 }}
      />

      <TextField id="outlined-basic" label="Request ID" variant="outlined" onChange={(e)=> setRequestId(e.target.value
        .split(",")
        .map(v => v.trim())
        .filter(v => v !== ""))}/>

      <Button variant="contained" onClick={() => {dispatch(setFilters(filters)); setRequestId([]); dispatch(setPage(0))}}>SEARCH</Button>
    </Box>
    <Box>
      <DateTimeRange
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
    </Box>
    </div>
    
  )
}
