import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const chatService = {
  // Hits FastAPI /chat endpoint
  async sendMessage(message) {
    const response = await apiClient.post('/chat', { message });
    return response.data; // return { answer: "..." }
  },

  // Hits FastAPI /upload endpoint
  async uploadPDF(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};