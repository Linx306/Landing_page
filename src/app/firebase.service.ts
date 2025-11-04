import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

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
}
