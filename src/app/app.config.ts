import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "landing-page-a7576", appId: "1:871772196371:web:ef77ae740db3dc8d4b39e6", storageBucket: "landing-page-a7576.firebasestorage.app", apiKey: "AIzaSyCT8-61ziVv8hKLG7XP-H9ZWj1EqOqhFUo", authDomain: "landing-page-a7576.firebaseapp.com", messagingSenderId: "871772196371", measurementId: "G-L0TJ03CEEG" })), provideFirestore(() => getFirestore())
  ]
};
