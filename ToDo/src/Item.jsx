import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

export default function ToDoItem({ addTask })
{
  const [taskName, setTaskName] = useState('')
  const [taskPriority, setTaskPriority] = useState('')

  const handleAddTask = () => {
    if (taskName && taskPriority) {
      addTask(taskName, taskPriority)
      setTaskName('')
      setTaskPriority('')
    }
  }

  return (
    <div>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <TextField
        select
        label="Priority"
        value={taskPriority} 
        onChange={(e) => setTaskPriority(e.target.value)}
        helperText="Select task priority"
      >
        <MenuItem value="">
          <em>None</em> 
        </MenuItem>
        <MenuItem value={1}>Immediate</MenuItem>
        <MenuItem value={2}>Can Wait</MenuItem>
        <MenuItem value={3}>Low Priority</MenuItem>
      </TextField>
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  )
}

