import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { HomeComponent } from './home.component';
import { TeamComponent } from './team.component';

/**
 * Rutas principales de la aplicación.
 *  muestra la página de inicio.
 * `'galeria'` muestra la galería de capturas y clases.
 * `'equipo'` muestra la página del equipo.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'equipo', component: TeamComponent }
];
