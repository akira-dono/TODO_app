import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            showModal: false,
            selectedTask: null,
            newTask: {
                Title: '',
                Description: '',
                DueDate: '',
                Priority: '',
                Status: '',
                AssigneeID: '',
            },
            login: localStorage.getItem("login")
        };
    }

    componentDidMount() {
        this.getTasks();
    }
    // Закрытие модального окна
    handleClose = () => {
        this.setState({ showModal: false, selectedTask: null });
    };
    // Открытие модального окна
    handleShow = () => {
        this.setState({ showModal: true });
    };

    // Отслеживания клика по таске (для её редактирования)
    handleTaskClick = (task) => {
        this.setState({ selectedTask: task });
        this.handleShow();
    };

    // Ловим новую таску)
    handleNewTask = () => {
        this.setState({
            selectedTask: null,
            newTask: {
                Title: '',
                Description: '',
                DueDate: '',
                priority: '',
                Status: '',
                AssigneeID: '',
            },
        });
        this.handleShow();
    };

    // Получаем все таски
    getTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks');
            this.setState({ tasks: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    // Захватываем изменения
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newTask: {
                ...prevState.newTask,
                [name]: value,
            },
        }));
    };
    // Добавить, редактировать задачу
    handleSubmit = async () => {
        const { newTask, selectedTask } = this.state;
        try {
            if (selectedTask) {
                await axios.put(`http://localhost:8000/editTask/${selectedTask.TaskID}`, newTask);
            } else {
                await axios.post('http://localhost:8000/createTask', newTask);
                
            }
            this.getTasks();
            this.handleClose();
        } catch (error) {
            console.error(error);
        }
    };
    // Рендер компонента
    render() {
        const { tasks, showModal, selectedTask, newTask } = this.state;
        return (
            <div className='taskPage__wrapper'>
                <h1 className="taskPageTitle__wrapper">Задачи</h1>
                <button onClick={this.handleNewTask} className="button__wrapper">Новая задача</button>
                {tasks.length === 0 ? (<div>Задач нет</div>) : tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => this.handleTaskClick(task)}
                        style={{
                            color: task.Status === 'completed' ? 'green' : task.DueDate < new Date() ? 'red' : 'grey',
                        }}
                    >
                        <h3>{task.Title}</h3>
                        <p>Приоритет: {task.Priority}</p>
                        <p>Дата окончания: {task.DueDate}</p>
                        <p>Ответственный: {task.AssigneeID}</p>
                        <p>Статус: {task.Status}</p>
                    </div>
                ))}


                <Modal show={showModal} onHide={this.handleClose} className="modalTasks__wrapper">
                    <Modal.Header>
                        <Modal.Title >{selectedTask ? 'Редактировать задачу' : 'Создать задачу'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='taskPageForm__wrapper'>
                        <form>
                            <input
                                type="text"
                                name="Title"
                                placeholder="Заголовок"
                                value={newTask.Title}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="Description"
                                placeholder="Описание"
                                value={newTask.Description}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="DueDate"
                                placeholder="Дата окончания"
                                value={newTask.DueDate}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="Priority"
                                placeholder="Приоритет"
                                value={newTask.Priority}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="Status"
                                placeholder="Статус"
                                value={newTask.Status}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="AssigneeID"
                                placeholder="Ответственный"
                                value={newTask.AssigneeID}
                                onChange={this.handleChange}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose} className="button__wrapper">
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit} className="button__wrapper">
                            {selectedTask ? 'Сохранить' : 'Создать'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default TaskPage;

