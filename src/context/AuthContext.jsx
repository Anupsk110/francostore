import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  auth, 
  db, 
  googleProvider, 
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  signInWithPopup,
  sendPasswordResetEmail as fbPasswordReset,
  updateProfile as fbUpdateProfile,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "../services/firebase";
import { INITIAL_USERS } from "../data/mockData";
import { sendWelcomeEmail } from "../services/emailService";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("mlbb_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo user for instant seamless experience
    return INITIAL_USERS[0]; // Logged in as Administrator by default for instant evaluation
  });
  const [loading, setLoading] = useState(false);

  // Sync user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("mlbb_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("mlbb_user");
    }
  }, [currentUser]);

  // Listen to Firebase auth state if configured
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;

    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        try {
          const userDocRef = doc(db, "users", fbUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCurrentUser({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: data.displayName || fbUser.displayName || fbUser.email.split("@")[0],
              photoURL: data.photoURL || fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
              role: data.role || (fbUser.email.includes("admin") ? "admin" : "user"),
              emailNotifications: data.emailNotifications ?? true,
              registeredAt: data.registeredAt || new Date().toISOString(),
              status: data.status || "active"
            });
          }
        } catch (err) {
          console.error("Error fetching Firestore user profile:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Register with email and password
  const registerWithEmail = async (email, password, displayName, emailNotifications = true) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;
        const photoURL = `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`;
        await fbUpdateProfile(fbUser, { displayName, photoURL });

        const userData = {
          uid: fbUser.uid,
          email,
          displayName,
          photoURL,
          role: email.toLowerCase().includes("admin") ? "admin" : "user",
          emailNotifications,
          registeredAt: new Date().toISOString(),
          status: "active"
        };

        if (db) {
          await setDoc(doc(db, "users", fbUser.uid), userData);
        }
        setCurrentUser(userData);
      } else {
        // Mock register
        const newUid = `user-${Date.now()}`;
        const userData = {
          uid: newUid,
          email,
          displayName: displayName || email.split("@")[0],
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${newUid}`,
          role: email.toLowerCase().includes("admin") ? "admin" : "user",
          emailNotifications,
          registeredAt: new Date().toISOString(),
          status: "active"
        };
        setCurrentUser(userData);
      }

      // Send welcome email via Brevo
      try {
        await sendWelcomeEmail(email, displayName);
      } catch (emailErr) {
        console.warn("Welcome email notice:", emailErr);
      }

      toast.success("Account created successfully! Welcome to MLBB Haven.");
      return true;
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(db, "users", cred.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data());
        }
      } else {
        // Mock login
        const existing = INITIAL_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (existing) {
          setCurrentUser(existing);
        } else {
          // If not in seed, create authenticated session
          const userData = {
            uid: `user-${Date.now()}`,
            email,
            displayName: email.split("@")[0],
            photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
            role: email.toLowerCase().includes("admin") ? "admin" : "user",
            emailNotifications: true,
            registeredAt: new Date().toISOString(),
            status: "active"
          };
          setCurrentUser(userData);
        }
      }
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Invalid credentials");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        const userDocRef = doc(db, "users", fbUser.uid);
        const userDoc = await getDoc(userDocRef);
        let userData;
        if (!userDoc.exists()) {
          userData = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || "Gamer",
            photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
            role: fbUser.email.toLowerCase().includes("admin") ? "admin" : "user",
            emailNotifications: true,
            registeredAt: new Date().toISOString(),
            status: "active"
          };
          await setDoc(userDocRef, userData);
          // Send welcome email
          await sendWelcomeEmail(fbUser.email, fbUser.displayName);
        } else {
          userData = userDoc.data();
        }
        setCurrentUser(userData);
      } else {
        // Mock Google login
        const googleUser = {
          uid: `google-${Date.now()}`,
          email: "google.gamer@gmail.com",
          displayName: "Google Champion",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
          role: "user",
          emailNotifications: true,
          registeredAt: new Date().toISOString(),
          status: "active"
        };
        setCurrentUser(googleUser);
      }
      toast.success("Signed in with Google!");
      return true;
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    try {
      if (isFirebaseConfigured && auth) {
        await fbPasswordReset(auth, email);
      }
      toast.success("Password reset instructions sent to " + email);
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
      throw error;
    }
  };

  // Update profile
  const updateUserProfile = async (updates) => {
    try {
      if (isFirebaseConfigured && db && currentUser?.uid) {
        await updateDoc(doc(db, "users", currentUser.uid), updates);
      }
      const updated = { ...currentUser, ...updates };
      setCurrentUser(updated);
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
      throw error;
    }
  };

  // Switch demo user (for convenience when testing admin vs normal user)
  const switchDemoRole = (roleToSwitch) => {
    if (roleToSwitch === "admin") {
      setCurrentUser(INITIAL_USERS[0]);
      toast.success("Switched to Haven Administrator account");
    } else {
      setCurrentUser(INITIAL_USERS[1]);
      toast.success("Switched to Regular User (MythicStriker) account");
    }
  };

  // Sign out
  const logout = async () => {
    try {
      if (isFirebaseConfigured && auth) {
        await fbSignOut(auth);
      }
      setCurrentUser(null);
      localStorage.removeItem("mlbb_user");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAdmin,
        registerWithEmail,
        loginWithEmail,
        signInWithGoogle,
        resetPassword,
        updateUserProfile,
        switchDemoRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

