import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';


function createTask(id, name, priority) {
  return { id, name, priority };
}

const rows = [
  createTask(1, 'Buy groceries', 1),
  createTask(2, 'Walk the dog', 2),
  createTask(3, 'Complete React project', 1),
  createTask(4, 'Do laundry', 3),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TodoList() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('priority');
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  
  return (
    <Box className="todo-box">
        <Typography className="table-title" variant="h5">
        My Tasks
      </Typography>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                /> */}
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={() => handleRequestSort(null, 'name')}
                >
                  Task
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'priority'}
                  direction={order}
                  onClick={() => handleRequestSort(null, 'priority')}
                >
                  Priority
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort(getComparator(order, orderBy))
              .map((row) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.priority}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
