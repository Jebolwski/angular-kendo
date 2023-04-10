import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  activate(mesi: string) {
    document.querySelector('.favori')?.classList.remove('active');
    document.querySelector('.gorevler')?.classList.remove('active');
    let div = document.querySelector(mesi);
    if (div != null) {
      div.classList.add('active');
    }
  }
}
