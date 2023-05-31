import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://test-candidaturas-front-end.onrender.com/'
})

export const getPostsPage = async (pageParam = 1, skipParam = 10, options = {}) => {
    const response = await api.get(`/families?take=${pageParam}&skip=${skipParam}`, options)
    console.log(response.data)
    return response.data
}