import axios from 'axios';
import { ApiResponse } from '../models/api.model';
import { PaginatedData } from '../models/pagination.model';
import { LoginDto, LoginResponse, User } from '../models/users.model';
import { getAxiosInstance } from './axios-instance';
import { API_URL } from './url';

const USERS_API_URL = `${API_URL}/users`;

export async function fetchSelf(): Promise<User> {
  try {
    const res = await getAxiosInstance().get<ApiResponse<User>>(
      `${USERS_API_URL}/self`
    );

    const {
      data: { data },
    } = res;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRefreshToken(): Promise<LoginResponse> {
  try {
    const res = await getAxiosInstance().get<ApiResponse<LoginResponse>>(
      `${USERS_API_URL}/refresh`,
      {
        withCredentials: true,
      }
    );

    const {
      data: { data },
    } = res;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLogin(dto: LoginDto): Promise<LoginResponse> {
  try {
    const res = await axios.post<ApiResponse<LoginResponse>>(
      `${USERS_API_URL}/signin`,
      dto,
      {
        withCredentials: true,
      }
    );

    const {
      data: { data },
    } = res;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSignup(dto: any): Promise<any> {
  try {
    const res = await axios.post<ApiResponse<any>>(
      `${USERS_API_URL}/signup`,
      dto
    );

    const {
      data: { data },
    } = res;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLogout(): Promise<null> {
  try {
    const _ = await getAxiosInstance().get(`${USERS_API_URL}/signout`, {
      withCredentials: true,
    });

    return null;
  } catch (error) {
    throw error;
  }
}
