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
  
  // Estado de notificaciones
  protected readonly notification = signal<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  protected readonly isNotificationVisible = signal(false);
  protected readonly isNotificationClosing = signal(false);

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
   * Muestra una notificación con el mensaje y tipo especificados.
   * La notificación se oculta automáticamente después de 4 segundos.
   */
  protected showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.notification.set({ message, type });
    this.isNotificationVisible.set(true);
    
    // Ocultar automáticamente después de 4 segundos
    setTimeout(() => {
      this.hideNotification();
    }, 4000);
  }

  /** Oculta la notificación actual con animación. */
  protected hideNotification(): void {
    this.isNotificationClosing.set(true);
    // Ocultar después de la animación
    setTimeout(() => {
      this.isNotificationVisible.set(false);
      this.isNotificationClosing.set(false);
      // Limpiar el mensaje
      this.notification.set(null);
    }, 300);
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
      this.showNotification('Por favor ingresa un email válido.', 'warning');
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

      this.showNotification('¡Correo enviado! Revisa tu bandeja.', 'success');
      this.subscriberEmail.set('');
      this.isSubscribeOpen.set(false);
      this.isMobileSubscribeOpen.set(false);
    } catch (error) {
      console.error('Error enviando correo', error);
      this.showNotification('Hubo un error al enviar el correo. Intenta de nuevo.', 'error');
    }
  }
}
