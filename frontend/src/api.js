// src/api.js

const BASE_URL = "http://backend:5000"; // Replace with your backend URL

const api = {
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${BASE_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        return response.json();
    },
};

export default api;
