import {useQuery} from 'react-query';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {useDispatch} from "react-redux";
import {setUser} from "../store/userSlice";
import {IUser} from "../models/IUser";
import api from "./Api";

export const getUserData = async (token: string): Promise<IUser> => {
    try {
        const response = await api.get<IUser>(`/users/me`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Register failed");
    }

};

export const useUserData = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken');
    return useQuery<IUser>('iUser', () => getUserData(token!), {
        enabled: !!token,
        onError: (err: any) => {
            if (err.message === '401') {
                navigate('/login');
            }
        },
        onSuccess: (data) => {
            dispatch(setUser(data))
        }
    });
};
