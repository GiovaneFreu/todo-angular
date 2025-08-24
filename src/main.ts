import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import './polyfills';

if (environment.production) {
  enableProdMode();
}

console.log('🚀 Iniciando bootstrap do Angular...');

bootstrapApplication(AppComponent)
  .then(() => {
    console.log('✅ Bootstrap do Angular concluído com sucesso!');
  })
  .catch(err => {
    console.error('❌ Bootstrap Error:', err);
    console.error('Stack:', err.stack);
  });