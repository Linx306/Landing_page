import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Página de inicio (landing) con CTA hacia la galería y secciones informativas.
 * renderiza contenido estático y enlaces.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
