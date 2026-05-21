import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("bamboo-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("bamboo-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("bamboo-user");
    }
  }, [user]);

  // Seed demo admin account
useEffect(() => {
  const users = JSON.parse(localStorage.getItem("bamboo-users") || "[]");
  const adminExists = users.find((u) => u.email === "admin@bamboo.com");
  if (!adminExists) {
    users.push({
      id: 1,
      name: "Admin",
      email: "admin@bamboo.com",
      password: "admin123",
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("bamboo-users", JSON.stringify(users));
  }
}, []);

  function register(name, email, password) {
    // Get existing users
    const existing = JSON.parse(localStorage.getItem("bamboo-users") || "[]");

    // Check if email already exists
    if (existing.find((u) => u.email === email)) {
      throw new Error("Email already registered");
    }

    // Save new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // in real app this would be hashed
      role: "user",
      createdAt: new Date().toISOString(),
    };
    existing.push(newUser);
    localStorage.setItem("bamboo-users", JSON.stringify(existing));

    // Auto login after register
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return safeUser;
  }

  function login(email, password) {
    const existing = JSON.parse(localStorage.getItem("bamboo-users") || "[]");
    const found = existing.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Invalid email or password");
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return safeUser;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}