// TaskList.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = ({ list, index }) => {
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={{ margin: '8px', border: '1px solid lightgray' }}
        >
          <h3 {...provided.dragHandleProps}>{list.title}</h3>
          <Droppable droppableId={list._id} type="task">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.tasks.map((task, index) => (
                  <Task key={task._id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default TaskList;
