import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthenticationServices } from "../services/AuthenticationServices";
import type { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<User | undefined>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const { user, token: newToken } =
          await AuthenticationServices.refresh();
        setUser(user);
        localStorage.setItem("token", JSON.stringify(newToken));
      } catch (err) {
        setUser(null);
        localStorage.removeItem("token");
        toast.info("Session expired, please login again.");
      } finally {
        setLoading(false);
      }
    };

    checkStoredToken();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    try {
      const response = await AuthenticationServices.login(email, password);
      setUser(response.user);
      localStorage.setItem("token", JSON.stringify(response.accessToken));
      toast.success("Login successful");
      return response.user;
    } catch (err) {
      console.log("Login error:", err);
      throw err; // Re-throw the error to handle it in the component
    }
  };

  const logout = async () => {
    try {
      await AuthenticationServices.logout();
      setUser(null);
      localStorage.removeItem("token");
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin, setLoading, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
