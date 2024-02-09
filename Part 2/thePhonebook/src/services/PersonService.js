import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

/**
 * This function returns a promise containing the Persons array from the server
 * @param {PersonArray}
 */
const getPersonsFromServer = () => {
    return axios.get(baseUrl)
                .then(promise => promise.data)
}

/**
 * This function adds a person to the server and returns the added person
 * when successful.
 * @param {Person} person
 * @returns {Person} 
 * 
 */
const addPersonToServer = (person) => {
    return axios.post(baseUrl,person)
                .then(promise => promise.data)

}

/**
 * This function removes a person from the server database and returns the deleted person
 * when successful.
 */
const removePersonFromServer = (person) =>{
    return axios.delete(`${baseUrl}/${person.id}`)
                .then(response => response.data)
}

export default {
    getPersonsFromServer,
    addPersonToServer,
    removePersonFromServer
}


