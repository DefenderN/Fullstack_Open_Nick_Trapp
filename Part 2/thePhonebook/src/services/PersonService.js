/**
 * TODO: 2.13: The Phonebook step 8
 * Extract the code that handles the communication 
 * with the backend into its own module by following 
 * the example shown earlier in this part of the course material.
 */

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

export default {
    getPersonsFromServer,
    addPersonToServer
}


