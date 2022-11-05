// Nimmt task Objekt und gibt davon nur task.title zurück
const Task = ({ task, toggleTaskComplete }) => {
	const label = task.completed ? '✓' : '✗'

	return (
    <li>
      {task.title}
      <span> </span>
      <button onClick={toggleTaskComplete}>{label}</button>
    </li>
  )
}

export default Task
