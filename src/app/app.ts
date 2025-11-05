import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

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

  protected toggleMobileNav(): void {
    this.isMobileNavOpen.update((open) => !open);
  }

  protected closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }

  protected toggleSubscribe(): void {
    this.isSubscribeOpen.update((open) => !open);
  }

  protected toggleMobileSubscribe(): void {
    this.isMobileSubscribeOpen.update((open) => !open);
  }

  protected async sendSubscriptionEmail(): Promise<void> {
    const email = this.subscriberEmail();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }

    try {
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
