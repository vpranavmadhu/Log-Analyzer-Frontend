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
import { Box, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCount, setLogs, setPage, setRowsPerPage } from '../logSlice';



const columns = [

  {
    id: 'id',
    label: 'No.',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'timestamp',
    label: 'TIME STAMP',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'level',
    label: 'LEVEL',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'component',
    label: 'COMPONENT',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'host',
    label: 'HOST',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'request_id',
    label: 'REQUEST ID',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'message',
    label: 'MESSAGE',
    minWidth: 170,
    align: 'right',
  },
];




export default function LogTable() {
  // const [logData, setLogData] = React.useState([])
  const logData = useSelector((state) => state?.logStore?.logs)

  const [loading, setLoading] = React.useState(true); //logs
  // const [logCount, setLogCount] = React.useState(0); //log counts
  const logCount = useSelector((state) => state?.logStore?.count)
  // const logCount = useSelector((state)=>state?.logStore?.count)
  // const [page, setPage] = React.useState(0);
  const page = useSelector((state) => state?.logStore?.page)
  const rowsPerPage = useSelector((state) => state?.logStore?.rowsPerPage)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch();

  const filters = useSelector((state) => state?.filterStore?.filters)


  React.useEffect(() => {
    fetchLogData()


  }, [page, rowsPerPage, filters])

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    dispatch(setPage(newPage))
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(+event.target.value);
    // setPage(0);
    dispatch(setRowsPerPage(+event.target.value));
    dispatch(setPage(0))
  };



  const fetchLogData = () => {
    setLoading(true)

    axios
      .post("http://localhost:8080/filter", filters, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          'page': page,
          'pageSize': rowsPerPage
        }
      })
      .then(function (response) {
        console.log("response", response)
        const rows = response.data.entries.map((e,index) => ({
          // id: e.ID ?? e.id,
          id: page * rowsPerPage + index + 1,
          timestamp: e.TimeStamp ?? e.timestamp,
          level: e.Level?.Level ?? "",
          component: e.Component?.Component ?? "",
          host: e.Host?.Host ?? "",
          request_id: e.RequestID || e.RequestId || e.requestId || e.request_id || "",
          message: e.Message ?? e.message,
        }));
        // setLogData(rows);
        dispatch(setLogs(rows));
        dispatch(setCount(response.data.count))
        // setLogCount(response.data.count);
        // dispatch(setCount(response.data.count))
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false)
      });
  };

  // console.log("Full response:", logData);


  return (
    <div className='! mt-10 w-full flex justify-center items-center flex-col border-slate-800 rounded-6xl'>
      <Paper sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: '16px'
      }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '14px',
                      backgroundColor: '#f5f5f5',
                      fontFamily: 'mono',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(loading || logCount === 0) ?
                (Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={columns.length}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30}
                      />
                    </TableCell>
                  </TableRow>
                ))) : (logData.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                )))}
            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, 500]}
          component="div"
          count={logCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>

  );
}
