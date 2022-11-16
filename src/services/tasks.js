import axios from 'axios'
// const baseUrl = "http://localhost:3001/api/tasks"
// const baseUrl = "https://fullstack-taskist-clone.herokuapp.com/api/tasks"
const baseUrl = '/api/tasks'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)

	// const nonExisting = {
	// 	id: 10000,
	// 	title: "This note is not saved to server",
	// 	date: "2019-05-30T17:30:31.098Z",
	// 	completed: true,
	// }

	// return request.then((response) => response.data.concat(nonExisting))
	return request.then((response) => response.data)
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}
	const request = await axios.post(baseUrl, newObject, config)
	return request.data
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	console.log(`${baseUrl}/${id}`, newObject)
	return request.then((response) => response.data)
}

export default {
	getAll,
	create,
	update,
	setToken,
}
