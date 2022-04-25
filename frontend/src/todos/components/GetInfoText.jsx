import { Typography } from '@mui/material'

// Helper function to compare the dueDate with todays date
// and write out the correct response
export const GetInfoText = ( {dueDate, isDone }) => {
    // If the task is completed, no need for more work
    if (isDone) {
      return (
        <Typography sx={{margin: '8px', width: 175}} variant='h6'>
          {"Task done"}
        </Typography> 
      )
    }
  
    // If due date is removed, it should not crash 
    if (!dueDate) {
      return (
        <Typography sx={{margin: '8px', width: 175}} variant='h6'>
          {"No due date"}
        </Typography> 
      )
    }
  
    var today = new Date()
    var dueDate2 = new Date(dueDate)
    // Need to divide by ONE_DAY since Date returns time in ms
    const ONE_DAY = 1000 * 60 * 60 * 24; 
  
    // If statements to display different texts based on if 
    // the due date is overdue or in how long it is due
    if (today <= dueDate2) {
      return (
        <Typography sx={{margin: '8px', width: 175}} variant='h6'>
          {"Due in " + Math.ceil((dueDate2 - today)/ONE_DAY) + " day(s)"}
        </Typography>   
      )
    } else if (today.toISOString().slice(0, 10) === dueDate2.toISOString().slice(0, 10)) {
      return (
        <Typography sx={{margin: '8px', width: 175}} variant='h6' >
          {"Due today!"}
        </Typography>   
      )
    } else {
        return (
            <Typography sx={{margin: '8px', width: 175}} variant='h6' color="red">
              {"Late by " + Math.floor((today - dueDate2)/ONE_DAY) + " day(s)"}
            </Typography>
          )
    }
  }
  