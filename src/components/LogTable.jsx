import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Box } from '@mui/material';



const columns = [
  { id: 'timestamp', label: 'TIME STAMP', minWidth: 170 },
  {
    id: 'level',
    label: 'LEVEL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'component',
    label: 'COMPONENT',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'host',
    label: 'HOST',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'request_id',
    label: 'REQUEST ID',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'message',
    label: 'MESSAGE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(timestamp, level, component, host, request_id, message) {
  return { timestamp, level, component, host, request_id, message };
}

const rows = [
  createData(
    '2025-11-20 10:30:22',
    'INFO',
    'AuthService',
    '192.168.1.10',
    'REQ12345',
    'User logged in successfully'
  )
];



export default function LogTable() {
  const [logData, setLogData] = React.useState([])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  React.useEffect(() => {
    fetchData()
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const fetchData = () => {
    axios.get("http://localhost:8080/logs")
      .then(response => {
        setLogData(response.data.entries)
        console.log("data: ", response.data)

      })
      .catch(error => {
        console.error("Error fetching logs:", error);
      })
      .finally(() => {
        // setLoading(false); // always runs
        console.log("Request completed");
      });




  }
  console.log("Full response:", logData);


  return (
    <div className='mt-10 w-full flex justify-center items-center flex-col'>
      <Box>
        <p className='p-5'>Total results: {logData.length}</p>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className='font-mono '>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })} */}
              {logData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>

  );
}
