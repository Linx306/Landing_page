import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente de equipo.
 * Muestra información sobre los miembros del equipo.
 */
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {}
