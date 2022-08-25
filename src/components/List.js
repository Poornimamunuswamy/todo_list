import { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Button, CardActions} from '@mui/material';
import './styles/list.module.css';
import ModalComp from "./Modal";

const List = (props) => {

  const [list, setList] = useState([]);
  const [loading,setLoading] = useState(false);
  const [edit,setEdit] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch(
        "https://todo-database-ef220-default-rtdb.firebaseio.com/taskList.json"
      );
      setLoading(true);
      const response = await data.json();
      // console.log(response);
      
      const fetchedList = [];
      for (const i in response) {
        fetchedList.push({
          id: response[i].id,
          task: response[i].task,
          key: i
        });
      }
      console.log(fetchedList);
      const userList = props.onNewTask;
  
      if (userList.length > 0) {
        setList(()=>[...fetchedList,...props.onNewTask]);
      }
      else{
        setList(fetchedList);
      }
      setLoading(false);
      
    };

   fetchData();
   console.log(edit);
  }, [props.onNewTask,edit]);

    
  const handleEdit =()=>{
    
    const updatedData = async () => {
      const data = await fetch(
        `https://todo-database-ef220-default-rtdb.firebaseio.com/taskList.json`
      );

      const response = await data.json();
      console.log(response);

      const updatedList = [];
      for (const i in response) {
        updatedList.push({
          id: response[i].id,
          task: response[i].task,
          key: i,
        });
      }
      console.log(updatedList);

      const userList = props.onNewTask;

      if (userList.length > 0) {
        setList(() => [...updatedList, ...props.onNewTask]);
      } else {
        setList(updatedList);
      }
      setEdit(true);
      console.log("fetching updated data");
    };

    updatedData();

    setEdit(false);
  }


  const onDeleteHandler = (itemDel) => {
    const filteredData = list.filter((item) => item.id !== itemDel.id);
    // console.log(itemDel);
         fetch(
           `https://todo-database-ef220-default-rtdb.firebaseio.com/taskList/${itemDel.key}.json`,
           {
             method: "DELETE",
           }
         ); 
    // console.log(delId);
    console.log(filteredData);
    setList(filteredData);
  };
  
  return (
    <Fragment>
      <ul>
        {loading && <h1>Loading...</h1>}
        {!loading && !list ? (
          <h1>No tasks found</h1>
        ) : (
          list.map((item) => (
            <li key={item.id}>
              <Card sx={{ width: "0.5", ml: "auto", mr: "auto" }}>
                <CardContent>
                  {item.task}
                  <CardActions>
                    <Button
                      type="button"
                      onClick={() => onDeleteHandler(item)}
                      color="secondary"
                      sx={{ display: "inline-block" }}
                    >
                      Delete
                    </Button>
                    <ModalComp handleEdit={handleEdit} item={item}></ModalComp>
                  </CardActions>
                </CardContent>
              </Card>
            </li>
          ))
        )}
      </ul>
    </Fragment>
  );
};


export default List;