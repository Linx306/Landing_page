import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

/**
 * Componente raíz de la aplicación.
 * - Renderiza el layout (panel principal + aside) y el `<router-outlet>`.
 * - Gestiona el estado del menú móvil y de los formularios de suscripción (desktop/móvil) usando Angular Signals.
 * - Envía correos de suscripción mediante EmailJS.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LandingPage');
  protected readonly isMobileNavOpen = signal(false);
  protected readonly isSubscribeOpen = signal(false);
  protected readonly isMobileSubscribeOpen = signal(false);
  protected subscriberEmail = signal('');

  /** Abre/cierra el menú lateral en pantallas móviles. */
  protected toggleMobileNav(): void {
    this.isMobileNavOpen.update((open) => !open);
  }

  /** Cierra el menú lateral móvil. */
  protected closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }

  /** Abre/cierra el formulario de suscripción en escritorio. */
  protected toggleSubscribe(): void {
    this.isSubscribeOpen.update((open) => !open);
  }

  /** Abre/cierra el formulario de suscripción dentro del drawer móvil. */
  protected toggleMobileSubscribe(): void {
    this.isMobileSubscribeOpen.update((open) => !open);
  }

  /**
   * Envía el correo de suscripción usando EmailJS.
   * - Valida el formato del email.
   * - Inicializa EmailJS con la clave pública.
   * - Envía usando `serviceId` y `templateId` configurados en EmailJS.
   */
  protected async sendSubscriptionEmail(): Promise<void> {
    const email = this.subscriberEmail();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }

    try {
      // Identificadores de EmailJS (configurados en el panel de EmailJS)
      const serviceId = 'service_4b78kkj';
      const templateId = 'template_b14pous';
      const publicKey = 'VRuN2U5kuH4IoWwsB';

      emailjs.init(publicKey);

      await emailjs.send(serviceId, templateId, {
        to_email: email,
        subject: 'Suscripción a Dev-Inc',
        message: 'Gracias por suscribirte, te mantendremos al tanto de nuevas noticias. Atte. Dev-Inc',
      });

      alert('¡Correo enviado! Revisa tu bandeja.');
      this.subscriberEmail.set('');
      this.isSubscribeOpen.set(false);
      this.isMobileSubscribeOpen.set(false);
    } catch (error) {
      console.error('Error enviando correo', error);
      alert('Hubo un error al enviar el correo. Intenta de nuevo.');
    }
  }
}
