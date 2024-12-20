import axios from "axios"

export const getUsers = async () => {
    return await axios.get(`/users/getall`);
};

export const login = async (email, password) => {
    return await axios.get(
        "/users/login", 
        { email, password },
    );
};