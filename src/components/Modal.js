import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import classes from './styles/modal.module.css';

const ModalComp = (props) =>{
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

  const [open, setOpen] = useState(false);

  const [editVal, setEditVal] = useState(props.item.task);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const onSaveHandler = () =>{
    // console.log(props.item)
    //console.log(props.item.task, props.item.key);
    //console.log(editVal);
    fetch(
      `https://todo-database-ef220-default-rtdb.firebaseio.com/taskList/${props.item.key}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id:props.item.id,
          task: editVal,
          key:props.item.key
        }),
      }
    );
    setOpen(false);
    props.handleEdit(props.item.key, editVal);
  }

  return (
    <div>
      <Button onClick={handleOpen} color="secondary">
        Edit
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField sx={{ m: 3, width: '40ch' }}
            required
            id="outlined"
            defaultValue={editVal}
            onChange={(e)=>setEditVal(e.target.value)}
          />
          <div className={classes.btnDiv}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSaveHandler}>Save</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComp;