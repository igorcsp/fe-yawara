import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URI}`,

})

export const authenticateLogin = async (credentials) => {
    const response = await api.post("/auth/login", credentials)
    return response.data
}

export const createUser = async (newUserData) => {
    const response = await api.post("/auth/register", newUserData)
    return response.data
}

export const getProducts = async () => {
    const response = await api.get("/products")
    return response.data
}

export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
}

export const getCategories = async () => {
    const response = await api.get("/categories")
    return response.data
}

export const createProduct = async (newProductData) => {
    const response = await api.post('/products', newProductData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data
}

export const updateProduct = async () => {
    const response = await api.put('/products/:id', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data
}