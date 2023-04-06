import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {
  constructor(private authservice: AuthService) {}
  @Input() max = 100000;
  @Input() min = 0;
  @Input() required!: boolean;
  @Input() form!: FormGroup;
  @Input() email = false;
  @Input() name!: string;
  @Input() name2!: string;
}
