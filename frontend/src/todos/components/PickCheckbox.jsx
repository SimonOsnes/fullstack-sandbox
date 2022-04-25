import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

export const PickCheckbox = ({ isDone }) => {
    if (isDone) {
      return <CheckBoxIcon/>
    } else {
        return <CheckBoxOutlineBlankIcon/>
    }
  }