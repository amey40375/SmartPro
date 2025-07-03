import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

// Interfaces
export interface Materi {
  id?: string;
  judul: string;
  deskripsi: string;
  fileUrl?: string;
  videoUrl?: string;
  guruId: string;
  createdAt: Date;
}

export interface Kuis {
  id?: string;
  soal: string;
  pilihan: string[];
  jawaban: number;
  materiId: string;
  createdAt: Date;
}

export interface Langganan {
  id?: string;
  userId: string;
  status: 'pending' | 'aktif' | 'expired';
  tanggal: Date;
  expiredAt?: Date;
}

export interface Transaksi {
  id?: string;
  userId: string;
  jumlah: number;
  tipe: 'langganan' | 'saldo';
  status: 'pending' | 'success' | 'failed';
  tanggal: Date;
}

export interface Chat {
  id?: string;
  senderId: string;
  receiverId: string;
  isi: string;
  waktu: Date;
  isRead: boolean;
}

export interface Sertifikat {
  id?: string;
  userId: string;
  materiId: string;
  linkPdf: string;
  qrCode: string;
  createdAt: Date;
}

// Materi functions
export const addMateri = async (materi: Omit<Materi, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "materi"), {
      ...materi,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding materi:", error);
    throw error;
  }
};

export const getMateriByGuru = async (guruId: string): Promise<Materi[]> => {
  try {
    const q = query(
      collection(db, "materi"), 
      where("guruId", "==", guruId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Materi));
  } catch (error) {
    console.error("Error getting materi by guru:", error);
    throw error;
  }
};

export const getAllMateri = async (): Promise<Materi[]> => {
  try {
    const q = query(
      collection(db, "materi"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Materi));
  } catch (error) {
    console.error("Error getting all materi:", error);
    throw error;
  }
};

// Users functions
export const getPendingTeachers = async () => {
  try {
    const q = query(
      collection(db, "users"),
      where("role", "==", "guru"),
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting pending teachers:", error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: 'active' | 'pending' | 'rejected'): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), {
      status: status
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

// Subscription functions
export const addLangganan = async (langganan: Omit<Langganan, 'id' | 'tanggal'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "langganan"), {
      ...langganan,
      tanggal: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding langganan:", error);
    throw error;
  }
};

export const getUserSubscription = async (userId: string): Promise<Langganan | null> => {
  try {
    const q = query(
      collection(db, "langganan"),
      where("userId", "==", userId),
      where("status", "==", "aktif"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Langganan;
  } catch (error) {
    console.error("Error getting user subscription:", error);
    throw error;
  }
};

// Stats functions
export const getStats = async () => {
  try {
    const [usersSnapshot, materiSnapshot] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "materi"))
    ]);
    
    const users = usersSnapshot.docs.map(doc => doc.data());
    const totalGuru = users.filter(user => user.role === 'guru').length;
    const totalSiswa = users.filter(user => user.role === 'siswa').length;
    const totalMateri = materiSnapshot.size;
    
    return {
      totalGuru,
      totalSiswa,
      totalMateri,
      activeToday: Math.floor(Math.random() * 50) + 10 // Placeholder for now
    };
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
};
