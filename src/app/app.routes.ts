import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galeria', component: GalleryComponent }
];
