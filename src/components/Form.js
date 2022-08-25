import { Fragment, useState } from "react";
import classes from './styles/form.module.css';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Form = (props) =>{

    const [task, setTask] = useState();

    const addTaskHandler = (e) => {
        e.preventDefault();
        console.log(task);
          setTask("");
          props.onAdd(task);
    }
    return (
      <Fragment>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { my: "50px" },
          }}
        >
          <div className={classes.formdiv}>
            <TextField
              required
              id="outlined"
              variant="outlined"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={classes.txtfield}
            />
            <div className={classes.formactions}>
              <Button
                variant="contained"
                color="primary"
                onClick={addTaskHandler}
              >
                Add Task
              </Button>
            </div>
          </div>
        </Box>
      </Fragment>
    );
}

export default Form;