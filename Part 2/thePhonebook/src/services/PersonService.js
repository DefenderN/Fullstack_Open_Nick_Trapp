import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons'

/**
 * This function returns a promise containing the Persons array from the server
 * @param {PersonArray}
 */
const getPersonsFromServer = () => {
    console.log("getPersonsFromServer service function is called")
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
    console.log("addPersonFromServer service function is called")
    return axios.post(baseUrl,person)
                .then(promise => promise.data)

}

/**
 * This function removes a person from the server database and returns the deleted person
 * when successful.
 */
const removePersonFromServer = (person) =>{
    console.log("removePersonFromServer service function is called")
    return axios.delete(`${baseUrl}/${person.id}`)
                .then(response => response.data)
}

const updatePerson = (person) => {
    console.log("updatePersonFromServer service function is called")
    return axios.put(`${baseUrl}/${person.id}`, person)
                .then(response => response.data)
}

export default {
    getPersonsFromServer,
    addPersonToServer,
    removePersonFromServer,
    updatePerson
}


