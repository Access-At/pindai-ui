"use client";
import { Role, User } from "@/interface/type";
import { decrypt } from "@/lib/crypto";
import { Auth, AuthResponse } from "@/modules/auth/auth.interface";
import { getCurrentUser } from "@/modules/auth/auth.service";
import { LoginType } from "@/modules/auth/schema/login.schema";
import { Dosen } from "@/modules/dosen/dosen.interface";
import { Kaprodi } from "@/modules/kaprodi/kaprodi.interface";
import { API_ENDPOINTS } from "@/services/api/api-config";
import axiosInstance from "@/services/api/axios-instance";
import { postData } from "@/services/api/http";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "@/services/storage/cookie-storage-service";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  const login = useCallback(
    async (data: LoginType) => {
      try {
        const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
        const response = res.data;
        const decryptedUser = JSON.parse(
          decrypt(response.data.user).data as string,
        );
        setUser(decryptedUser);
        await setCookie("token", response.data.access_token);
        await setCookie("user", response.data.user);
        toast.success(response.message);
      } catch (err: any) {
        toast.error(err.response?.data?.message);
      } finally {
        if (!isAuthenticated) return;
        router.push("/dashboard");
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      const res = await postData(API_ENDPOINTS.LOGOUT, {});
      setUser(null);
      await removeCookie("token");
      await removeCookie("user");
      toast.success(res.message);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout.");
    } finally {
      if (!isAuthenticated) return;
      router.push("/dashboard");
    }
  }, [router]);

  const checkAuth = useCallback(async () => {
    const token = await getCookie("token");
    if (token) {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
    };
    if (!isAuthenticated) {
      authenticate();
    }
  }, [getCurrentUser]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}