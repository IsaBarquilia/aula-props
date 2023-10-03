"use client"
import React, { Component } from 'react';
import style from "./page.module.css"

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
      isPopupOpen: false,
      editedTaskText: '',
      editedTaskId: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  addTask = () => {
    if (this.state.newTask.trim() !== '') {
      const newTasks = [...this.state.tasks, { id: Date.now(), text: this.state.newTask }];
      this.setState({ tasks: newTasks, newTask: '' });
    }
  };

  editTask = (id, newText) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  deleteTask = (id) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: updatedTasks });
  };
  openEditPopup = (id, text) => {
    this.setState({
      isPopupOpen: true,
      editedTaskText: text,
      editedTaskId: id,
    });
  };


  closeEditPopup = () => {
    this.setState({
      isPopupOpen: false,
      editedTaskText: '',
      editedTaskId: null,
    });
  };


  render() {
    return (
      <div className={style.task}>
        <h1>Lista de Tarefas</h1>
        <div className="task-input">
          <input
            type="text"
            placeholder="Nova tarefa"
            value={this.state.newTask}
            onChange={this.handleInputChange}
            className={style.input}
          />
          <button onClick={this.addTask} className={style.button}>Adicionar </button>
        </div>
        <div>
          {this.state.tasks.map((task) => (
            <div key={task.id}>
              <input
                type="text"
                value={task.text}
                onChange={(e) => this.editTask(task.id, e.target.value)}
                className={style.input}
              />
              <button
                onClick={() => this.openEditPopup(task.id, task.text)} className={style.buttoned}>Editar</button>
              <button
                onClick={() => this.deleteTask(task.id)}
                className={style.buttonex}>Excluir</button>
            </div>
          ))}
        </div>


        {this.state.isPopupOpen && (
          <div className={style.popup}>
            <h2>Editar Tarefa</h2>
            <input
              type="text"
              value={this.state.editedTaskText}
              onChange={(e) => this.setState({ editedTaskText: e.target.value })}
              className={style.input}
            />
            <button onClick={this.closeEditPopup} className={style.buttonfe}>  Fechar </button>
            <button
              onClick={() => {
                this.editTask(this.state.editedTaskId, this.state.editedTaskText);
                this.closeEditPopup();
              }}
              className={style.buttonsa}> Salvar</button>
          </div>
        )}
      </div>

    );
  }
}

export default Task;