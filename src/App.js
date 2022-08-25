import './App.css';
import {Fragment, useState} from 'react';
import Form from './components/Form';
import List from './components/List';
import { Paper } from "@mui/material";

function App() {

  const [newList,setNewList] = useState([]);

  const onAddHandler = (newtask) =>{
    const updatedList = {
      id: Math.random().toString(16).substring(2),
      task: newtask,
    };
    const addItem = (async() =>{
      const data = await fetch(
        "https://todo-database-ef220-default-rtdb.firebaseio.com/taskList.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updatedList.id,
            task: updatedList.task
          }),
        }
      );
    })();
    
      // console.log(updatedList);
    
    setNewList(oldList=>{
      return [updatedList,...oldList];
    });
    
  }
  return (
    <Fragment>
      <Paper elevation={3} sx={{mx:'30%', my:'2%' }}>
        <Form onAdd={onAddHandler}></Form>
      </Paper>

      {/* {console.log(newList)} */}
      <List onNewTask={newList}></List>
    </Fragment>
  );
}

export default App;
