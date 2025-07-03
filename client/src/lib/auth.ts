import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface User {
  uid: string;
  email: string;
  nama: string;
  role: 'admin' | 'guru' | 'siswa';
  status: 'active' | 'pending' | 'rejected';
  saldo?: number;
  sekolah?: string;
  kelas?: string;
  bidang_keahlian?: string;
  createdAt: Date;
}

export const signUp = async (
  email: string, 
  password: string, 
  userData: Omit<User, 'uid' | 'email' | 'createdAt'>
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const newUser: User = {
      uid: user.uid,
      email: user.email!,
      ...userData,
      createdAt: new Date(),
    };
    
    await setDoc(doc(db, "users", user.uid), newUser);
    
    return newUser;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    // Check if this is the admin account and create it if it doesn't exist
    if (email === "id.smartpro@gmail.com" && password === "Smart123") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (!userDoc.exists()) {
          // Create admin user data if doesn't exist
          const adminUser: User = {
            uid: user.uid,
            email: user.email!,
            nama: "Admin SmartPro",
            role: 'admin',
            status: 'active',
            createdAt: new Date(),
          };
          
          await setDoc(doc(db, "users", user.uid), adminUser);
          return adminUser;
        }
        
        return userDoc.data() as User;
      } catch (firebaseError: any) {
        // If user doesn't exist, create the admin account
        if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/invalid-credential') {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          const adminUser: User = {
            uid: user.uid,
            email: user.email!,
            nama: "Admin SmartPro",
            role: 'admin',
            status: 'active',
            createdAt: new Date(),
          };
          
          await setDoc(doc(db, "users", user.uid), adminUser);
          return adminUser;
        }
        throw firebaseError;
      }
    }
    
    // Regular user login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      throw new Error("User data not found");
    }
    
    const userData = userDoc.data() as User;
    
    if (userData.status === 'rejected') {
      throw new Error("Akun Anda telah ditolak. Silakan hubungi admin.");
    }
    
    if (userData.role === 'guru' && userData.status === 'pending') {
      throw new Error("Akun Anda masih menunggu verifikasi admin.");
    }
    
    return userData;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getCurrentUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return userDoc.data() as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
