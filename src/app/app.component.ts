import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div class="title">Buzz-i</div>
      <div class="w-100 flex justify-center">
          <div class="container">
              <router-outlet></router-outlet>
          </div>
      </div>
  `
})
export class AppComponent {}
