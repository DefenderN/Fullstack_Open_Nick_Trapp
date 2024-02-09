import axios from "axios"
const baseUrl = "http://localhost:3001/notes"

/**
 * Returns an array containing all the notes saved on the server.
 * @returns {notesArray}
 */
const getAll = () => {
    return axios.get(baseUrl)
                .then(promise => promise.data)
}

/**
 * Adds a new note to the server and returns the respective note object.
 * @returns {noteObject}
 */
const create = (newNote) => {
   return axios.post(baseUrl, newNote)
                .then(promise => promise.data)
}

/**
 * Updates an existing note.
 * @param {string} id
 * @param {Note} updatedNote
 * 
 */
const update = (id, updatedNote) => {

    return axios.put(`${baseUrl}/${id}`, updatedNote)
                .then(promise => promise.data)

}

export default {
    getAll,
    create,
    update
}