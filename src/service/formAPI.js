import instance from "./Aixos";

export const submitForm = async (formData) => {
  return instance.post("/bieumau", formData);
};
export const fetchForms = async () => {
  return instance.get("/bieumau");
};

export const deleteForm = async (id) => {
  return instance.delete(`/bieumau/${id}`);
};
export const updateForm = (id, updatedData) => {
  return instance.put(`/bieumau/${id}`, updatedData);
};

export const login = async (credentials) => {
  return instance.post("/auth/login", credentials);
};

export const fechAllTime = async () => {
  return instance.get("/khunggio");
};

export const addTime = (timeData) => {
  return instance.post("/khunggio", timeData);
};

export const deleteTime = (id) => {
  return instance.delete(`/khunggio/${id}`);
};
export const updateTime = (data) => {
  return instance.put(`/khunggio/${data.id}`, data);
};

export const viewFromDetail = (id) => {
  return instance.get(`bieumau/view/${id}`);
};
