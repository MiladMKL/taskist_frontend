import { useState } from 'react'

const TaskForm = ({ createTask }) => {
	const [newTask, setNewTask] = useState('')

	const handleChange = (event) => {
		setNewTask(event.target.value)
	}

	const addTask = (event) => {
		event.preventDefault()

		/**
		 * Ist addTask im App
		 * Ich rufe die Methode addTask im App auf und übergebe 'title' und 'completed'
		 * App nimmt diese und sendet es an Backend
		 */
		createTask({
			title: newTask,
			completed: false,
		})

		setNewTask('')
	}

	return (
		<div>
			<h2>Create a new task</h2>

			<form onSubmit={addTask}>
				<input value={newTask} onChange={handleChange} />
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default TaskForm
