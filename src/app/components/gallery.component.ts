import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * Componente de galería.
 * - Lee en tiempo real dos subcolecciones de Firestore:
 *   - `info/Capturas del Juego/Galeria` para las capturas generales.
 *   - `info/Capturas del Juego/Personajes` para las clases/personajes.
 * - Expone `galeria` y `personajes`.
 */
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  galeria$: Observable<any[]>;
  personajes$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    // Referencia a la subcolección 'Galeria'
    const galeriaRef = collection(this.firestore, 'info/Capturas del Juego/Galeria');
    this.galeria$ = collectionData(galeriaRef, { idField: 'id' });

    const personajesRef = collection(this.firestore, 'info/Capturas del Juego/Personajes');
    this.personajes$ = collectionData(personajesRef, { idField: 'id' });
    // Log para verificar los datos
    this.galeria$.subscribe(data => console.log('Datos de la galería:', data));
    this.personajes$.subscribe(data => console.log('Datos de personajes:', data));
  }
}
