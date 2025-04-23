import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Или другой способ хранения токена
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getBooks = async () => {
  try {
    const response = await api.get(`/api/books`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getBooks", error);
    return false;
  }
};

export const postBooks = async ({ formData }) => {
  try {
    const response = await api.post(`/api/books`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в postBooks", error);
    return false;
  }
};


export const patchBook = async ({ id, formData }) => {
  try {
    const response = await api.patch(`/api/books/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchBook", error);
    return false;
  }
};


export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/api/books/${id}`);
    return response.status;
  } catch (error) {
    console.error("Ошибка в deleteBook", error);
    return false;
  }
};


export const getBookById = async (id) => {
  try {
    const response = await api.get(`/api/books/${id}`,);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getBookById", error);
    return false;
  }
};

// ---------------------------------------------------------------------------------------------------------


export const fetchLogin = async (email, password) => {
  try {
    const response = await api.post('/api/auth/signin', { email, password });
    return response.data;
  } catch (error) {
    console.error('API Error:fetchLogin', error);
    throw error;
  }
};

export const fetchRegister = async (formData) => {
  try {
    const response = await api.post('/api/auth/signup', formData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ---------------------------------------------------------------------------------------------------------


export const getQuestion = async () => {
  try {
    const response = await api.get(`/api/question`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getQuestion", error);
    return false;
  }
};


export const QuestionTrue = async ({ typeId, query }) => {
  try {
    const params = new URLSearchParams();
    if (typeId) params.append('typeId', typeId);
    if (query) params.append('query', query);

    const response = await api.get(`/api/question/QuestionTrue?${params}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getQuestion", error);
    return false;
  }
};

export const postQuestion = async (form) => {
  try {
    const response = await api.post(`/api/question`, form);
    return response.data;
  } catch (error) {
    console.error("Ошибка в postQuestion", error);
    return false;
  }
};


export const patchQuestion = async ({ id, formData }) => {
  try {
    const response = await api.patch(`/api/question/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchQuestion", error);
    return false;
  }
};


export const deleteQuestion = async (id) => {
  try {
    const response = await api.delete(`/api/question/${id}`);
    return response.status;
  } catch (error) {
    console.error("Ошибка в deleteQuestion", error);
    return false;
  }
};

// ---------------------------------------------------------------------------------------------------------



export const getAnswers = async () => {
  try {
    const response = await api.get(`/api/answers`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getAnswers", error);
    return false;
  }
};

export const getAnswersById = async (id) => {
  try {
    const response = await api.get(`/api/answers/${id}`,);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getAnswersById", error);
    return false;
  }
};

export const postAnswers = async (formdata) => {
  try {
    const response = await api.post(`/api/answers`, formdata);
    return response.data;
  } catch (error) {
    console.error("Ошибка в postAnswers", error);
    return false;
  }
};

export const putStatusAnswer = async ({ id }) => {
  try {
    const response = await api.put(`/api/answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchAnswers", error);
    return false;
  }
};


export const patchAnswers = async ({ id, formData }) => {
  try {
    const response = await api.patch(`/api/answers/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchAnswers", error);
    return false;
  }
};


export const deleteAnswers = async (id) => {
  try {
    const response = await api.delete(`/api/answers/${id}`);
    return response.status;
  } catch (error) {
    console.error("Ошибка в deleteAnswers", error);
    return false;
  }
};



// ---------------------------------------------------------------------------------------------------------


export const getNews = async () => {
  try {
    const response = await api.get(`/api/news`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getNews", error);
    return false;
  }
};

export const postNews = async (formdata) => {
  try {
    const response = await api.post(`/api/news`, formdata);
    return response.data;
  } catch (error) {
    console.error("Ошибка в postNews", error);
    return false;
  }
};


export const patchNews = async ({ id, formData }) => {
  try {
    const response = await api.patch(`/api/news/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchNews", error);
    return false;
  }
};


export const deleteNews = async (id) => {
  try {
    const response = await api.delete(`/api/news/${id}`);
    return response.status;
  } catch (error) {
    console.error("Ошибка в deleteNews", error);
    return false;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await api.get(`/api/news/${id}`,);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getNewsById", error);
    return false;
  }
};

// ---------------------------------------------------------------------------------------------------------


export const getEvents = async () => {
  try {
    const response = await api.get(`/api/events`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getNews", error);
    return false;
  }
};

export const postEvents = async (formsData) => {
  try {
    const response = await api.post(`/api/events`, formsData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в postNews", error);
    return false;
  }
};


export const patchEvents = async ({ id, formData }) => {
  try {
    const response = await api.patch(`/api/events/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchNews", error);
    return false;
  }
};


export const deleteEvents = async (id) => {
  try {
    const response = await api.delete(`/api/events/${id}`);
    return response.status;
  } catch (error) {
    console.error("Ошибка в deleteNews", error);
    return false;
  }
};



// ---------------------------------------------------------------------------------------------------------


export const getTypes = async () => {
  try {
    const response = await api.get(`/api/types`);
    return response.data;
  } catch (error) {
    console.error("Ошибка в getTypes", error);
    return false;
  }
};

export const postTypes = async (formsData) => {
  try {
    const response = await api.post(`/api/types`, formsData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в postTypes", error);
    return false;
  }
};


export const patchTypes = async ({ id, formData }) => {
  try {
    const response = await api.patch(`/api/types/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Ошибка в patchTypes", error);
    return false;
  }
};


export const deleteTypes = async (id) => {
  try {
    const response = await api.delete(`/api/types/${id}`);
    return response.status;
  } catch (error) {
    console.error("Ошибка в deleteTypes", error);
    return false;
  }
};