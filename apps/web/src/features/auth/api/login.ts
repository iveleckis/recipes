import { api } from "../../../config/axios";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  const { data } = await api.post<{ token: string }>("/auth/login", {
    username,
    password,
  });
  return data;
};
