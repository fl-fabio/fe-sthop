import { useState, useEffect, useCallback } from "react";
import { User } from "../types/User";

const useFetchUsers = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setUsers(result);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, url]);

  const getRequest = () => {
    fetchData();
  };

  const deleteRequest = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const postRequest = async (formData: User) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const patchRequest = async (id: string, formData: User) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? data : user))
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setUser(data);
      return data;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    loading,
    error,
    users,
    user,
    setUser,
    deleteRequest,
    postRequest,
    getRequest,
    patchRequest,
    getUserById,
  };
};

export default useFetchUsers;
