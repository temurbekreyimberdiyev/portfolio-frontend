import api from "./api"; // axios instanssi

export const login = async (username, password) => {
  try {
    const res = await api.post("token/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    return res.data;
  } catch (err) {
    console.error("Login xato:", err);
    throw err;
  }
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
