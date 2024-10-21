import React from 'react';  
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  Checkbox,
  Typography
} from '@mui/material';  

import ToDoItem from './Item';  
import { getComparator, createTask } from './utils';  

export default function TodoList() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('priority');
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = React.useState([
    createTask(1, 'Feed the Cats', 1),
    createTask(2, 'Read New Chapter', 3)
  ]); 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

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
  }

  const addTaskToRows = (taskName, taskPriority) => {
    const newTask = createTask(rows.length + 1, taskName, taskPriority);
    setRows([...rows, newTask]);
  }

  const priorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return 'Immediate';
      case 2:
        return 'Can Wait';
      case 3:
        return 'Low Priority';
      default:
        return '';
    }
  }

  return (
    <div className='todo-container'>
      <Typography className="table-title" variant="h5">
        My Tasks
      </Typography>

      <ToDoItem addTask={addTaskToRows} /> 

      <Box className="todo-box">
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>
                  Task
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
                      <TableCell align="right" className="priority-label">
                        {priorityLabel(row.priority)}
                      </TableCell> 
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
