import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

const tasks = [
	{
		id: 1,
		title: "Learn HTML",
		date: "2019-05-30T17:30:31.098Z",
		completed: true,
	},
	{
		id: 2,
		title: "Learn CSS",
		date: "2019-05-30T18:39:34.091Z",
		completed: false,
	},
	{
		id: 3,
		title: "Learn Javascript",
		date: "2019-05-30T19:20:14.298Z",
		completed: true,
	},
]

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App tasks={tasks} />)
