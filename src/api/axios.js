import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://test-candidaturas-front-end.onrender.com/'
})

export const getPostsPage = async (pageParam = 10, skipParam = 0, options = {}) => {
    const response = await api.get(`/families?take=${pageParam}&skip=${skipParam}`, options)
    return response.data
}

export const imageDb = axios.create({
    baseURL: 'https://plugin-storage.nyc3.digitaloceanspaces.com/'
})

export const getImageId = async (idParam = 0, options = {}) => {
    const response = await imageDb.get(`/families/images/${idParam}.jpg`, options)
    return response.data
}