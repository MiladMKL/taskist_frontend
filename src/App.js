import { useState, useEffect } from "react"
import taskService from "./services/tasks"
import Task from "./components/Task"
import Notification from "./components/Notification"
import "./index.css"

const App = (props) => {
	/*
  ---------------------------- useState */
	const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState("")
	const [showAllTasks, setShowAllTasks] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")

	/*
  ---------------------------- useEffect */
	useEffect(() => {
		taskService.getAll().then((initialTasks) => {
			setTasks(initialTasks)
		})
	}, [])

	/*
  ---------------------------- Methods */

	const toggleTaskCompleteForTask = (id) => {
		const task = tasks.find((t) => t.id === id)
		const changedTask = { ...task, completed: !task.completed }

		taskService
			.update(id, changedTask)
			.then((returnedTask) => {
				setTasks(tasks.map((t) => (t.id !== id ? t : returnedTask)))
			})
			.catch((error) => {
				setErrorMessage(`Task '${task.title}' was already deleted from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setTasks(tasks.filter((t) => t.id !== id))
			})
	}

	const addTask = (event) => {
		event.preventDefault()

		const taskObject = {
			title: newTask,
			date: new Date().toISOString(),
			completed: false,
		}

		taskService.create(taskObject).then((returnedTask) => {
			setTasks(tasks.concat(returnedTask))
			setNewTask("")
		})
	}

	const newTaskHandler = (event) => {
		setNewTask(event.target.value)
	}

	/*
  ---------------------------- Variables */
	const tasksToShow = showAllTasks
		? tasks
		: tasks.filter((task) => task.completed)

	/*
  ---------------------------- Render */
	return (
		<div>
			<h1>Tasks</h1>
			<Notification message={errorMessage} />
			<button onClick={() => setShowAllTasks(!showAllTasks)}>
				show {showAllTasks ? "completed" : "all"}
			</button>
			<ul>
				{tasksToShow.map((task) => (
					<Task
						key={task.id}
						task={task}
						toggleTaskComplete={() => toggleTaskCompleteForTask(task.id)}
					/>
				))}
			</ul>
			<form onSubmit={addTask}>
				<input value={newTask} onChange={newTaskHandler} />
				<button type="submit">Add Task</button>
			</form>
		</div>
	)
}

export default App
