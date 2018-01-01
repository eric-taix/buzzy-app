import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div class="title">ITKuizz</div>
      <div class="w-100 flex justify-center h-100">
          <div class="container">
              <router-outlet></router-outlet>
          </div>
      </div>
  `
})
export class AppComponent {}
