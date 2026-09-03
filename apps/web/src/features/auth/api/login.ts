import type { LoginRequest, LoginResponse } from "@recipes/contracts";
import { api } from "../../../config/axios";

export const login = async (input: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", input);
  return data;
};
