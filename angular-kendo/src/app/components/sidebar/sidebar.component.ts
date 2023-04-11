import { Component, Input, OnInit } from '@angular/core';
import { doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() classe!: string;
}
