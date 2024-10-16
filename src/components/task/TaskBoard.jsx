// import React from 'react';

import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import NoTaskAvailable from "../NoTaskAvailable";
// import { BiLogIn } from "react-icons/bi";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "I want to learn react so that i shine in my future goals",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  //adding a task
  function handleAddEditTask(e, newTask, isAdd) {
    if (isAdd) {
      e.preventDefault();
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  }

  //   edit task
  const handleOnEdit = (newTask) => {
    console.log(newTask);
    setTaskToUpdate(newTask);
    setShowAddModal(true);
  };
  // /onCloseClick modal
  function onCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  //delete a single task
  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }
  // delete all task
  function handleDeleteAllClick() {
    setTasks([]);
    console.log("deleted");
  }
  //on favourite star
  function handleOnFavourite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    setTasks(newTasks);
  }
  //searching a task based on title
  function handleSearch(searchString) {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setTasks([...filtered]);
  }

  return (
    <section
      className="mb-20 flex flex-col justify-center items-center md:px-6"
      id="tasks"
    >
      {showAddModal && (
        <AddTask
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={onCloseClick}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          {tasks.length > 0 ? <SearchTask onSearch={handleSearch} /> : null}
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleOnEdit}
              onDelete={handleDeleteTask}
              onFavourite={handleOnFavourite}
            />
          ) : (
            <NoTaskAvailable />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
