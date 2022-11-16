import { useState, useEffect, useRef } from 'react'

import Task from './components/Task'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import TaskForm from './components/TaskForm'

import './index.css'

import taskService from './services/tasks'
import loginService from './services/login'

const App = () => {
	/*
  ---------------------------- useState */
	const [tasks, setTasks] = useState([])
	const [showAllTasks, setShowAllTasks] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const taskFormRef = useRef()

	/*
  ---------------------------- useEffect */
	useEffect(() => {
		taskService.getAll().then((initialTasks) => {
			setTasks(initialTasks)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedTasksAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			taskService.setToken(user.token)
		}
	}, [])

	/*
  ---------------------------- Methods */

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			setUser(user)
			// Setze das Token auch für taskService damit tasks hinzugefügt werden können
			taskService.setToken(user.token)
			window.localStorage.setItem('loggedTasksAppUser', JSON.stringify(user))

			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const toggleTaskCompleteForTask = (id) => {
		const task = tasks.find((task) => task.id === id)
		const changedTask = { ...task, completed: !task.completed }

		taskService
			.update(id, changedTask)
			.then((returnedTask) => {
				setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)))
			})
			.catch((error) => {
				setErrorMessage(`Task '${task.title}' was already deleted from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setTasks(tasks.filter((t) => t.id !== id))
			})
	}

	const addTask = (taskObject) => {
		taskFormRef.current.toggleVisibility()
		taskService.create(taskObject).then((returnedTask) => {
			setTasks(tasks.concat(returnedTask))
		})
	}

	const taskForm = () => (
		<Toggleable buttonLabel="new task" ref={taskFormRef}>
			<TaskForm createTask={addTask} />
		</Toggleable>
	)
	/*
  ---------------------------- Variables */
	const tasksToShow = showAllTasks
		? tasks
		: tasks.filter((task) => task.completed)

	/*
  ---------------------------- Render */
	return (
		<div>
			<h1>Taskist</h1>
			<Notification message={errorMessage} />

			{user === null ? (
				<Toggleable buttonLabel="login">
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
				</Toggleable>
			) : (
				<div>
					<p>{user.name} logged in</p>
					<Toggleable buttonLabel="add task" ref={taskFormRef}>
						<TaskForm createTask={addTask} />
					</Toggleable>
				</div>
			)}

			<div>
				<button onClick={() => setShowAllTasks(!showAllTasks)}>
					show {showAllTasks ? 'completed' : 'all'}
				</button>
			</div>

			<ul>
				{tasksToShow.map((task) => (
					<Task
						key={task.id}
						task={task}
						toggleTaskComplete={() => toggleTaskCompleteForTask(task.id)}
					/>
				))}
			</ul>
		</div>
	)
}

export default App
