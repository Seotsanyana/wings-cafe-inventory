// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Generic fetch function
const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
};

// Product API calls
export const productAPI = {
    getAll: () => apiRequest('/products'),
    getById: (id) => apiRequest(`/products/${id}`),
    create: (productData) =>
        apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        }),
    update: (id, productData) =>
        apiRequest(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        }),
    delete: (id) =>
        apiRequest(`/products/${id}`, {
            method: 'DELETE',
        }),
};