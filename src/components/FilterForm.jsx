import {
  Autocomplete,
  TextField,
  Button,
  Box
} from '@mui/material'
import React from 'react'

const levels = ['ERROR', 'WARN', 'DEBUG', 'INFO'];
const components = ['api-server', 'cache', 'worker', 'database']
const hosts = ['web01', 'web02', 'cache01', 'db01']

export const FilterForm = () => {
  const [level, setLevel] = React.useState([]);
  const [component, setComponent] = React.useState([]);
  const [host, setHost] = React.useState(null);
  console.log("level",level)

  return (
    <div>
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
        options={hosts}
        value={host}
        onChange={(e, newValue) => setHost(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Host" placeholder="Search host" />
        )}
        sx={{ minWidth: 220 }}
      />

      <TextField id="outlined-basic" label="Request ID" variant="outlined" />

      <TextField id="outlined-basic" label="Date Time" variant="outlined" />

      <Button variant="contained">SEARCH</Button>
    </Box>
    </div>
    
  )
}
