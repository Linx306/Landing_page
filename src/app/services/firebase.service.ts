import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { serverTimestamp } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Guardar un párrafo con imágenes
  async guardarParrafo(texto: string, imagenes: string[]) {
    const col = collection(this.firestore, 'info');
    await addDoc(col, { texto, imagenes });
    console.log('Párrafo guardado correctamente ✅');
  }

  // Leer todos los párrafos
  async obtenerParrafos() {
    const col = collection(this.firestore, 'info');
    const snapshot = await getDocs(col);
    return snapshot.docs.map(doc => doc.data());
  }

  // Guardar suscriptor en la colección 'suscriptores'
  async guardarSuscriptor(email: string) {
    const col = collection(this.firestore, 'suscriptores');
    await addDoc(col, { email, createdAt: serverTimestamp() });
    console.log('Suscriptor guardado correctamente ✅');
  }
}
