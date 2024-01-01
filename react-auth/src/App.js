// src/App.js
import React from 'react';
import Registration from './components/Registration';
import Login from './components/Login';

mport React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';


function App() {
  return (
    <div>
      <Registration />
      <Login />
    </div>
  );
}

const App = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch lists from the server when the component mounts
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;

    if (sourceListId !== destinationListId) {
      // If task is moved to another list, update listId in the database
      const taskId = result.draggableId;
      await axios.patch(`http://localhost:3001/tasks/${taskId}`, {
        listId: destinationListId,
      });
    }

    // You may also need to update the order of tasks within the list in the database

    // Fetch updated lists after drag and drop
    fetchLists();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lists.map((list, index) => (
              <TaskList key={list._id} list={list} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};



export default App;
