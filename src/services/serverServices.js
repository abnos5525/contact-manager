import axios from "axios";

const SERVER_URL = "https://contactapi.limor.ir"

export const getContacts = () =>{
    const response = `${SERVER_URL}/contacts`
    return axios.get(response)
}

export const getGroups = () =>{
    const response = `${SERVER_URL}/groups`
    return axios.get(response)
}

export const getGroup = (groupId) =>{
    const response = `${SERVER_URL}/groups/${groupId}`
    return axios.get(response)
}

export const createContact = (contact) =>{
    const response = `${SERVER_URL}/contacts`
    return axios.post(response, contact)
}

export const getContact = (contactId) =>{
    const response = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(response)
}

export const updateContact = (contactId, newContact) =>{
    const response = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(response, newContact)
}

export const deleteContact = (contactId) =>{
    const response = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(response)
}







