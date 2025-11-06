import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery.component';
import { HomeComponent } from './components/home.component';
import { TeamComponent } from './components/team.component';

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
