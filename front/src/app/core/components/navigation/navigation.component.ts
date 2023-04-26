import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LocalService} from "../../services/local.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(public authService : AuthService,
              public localService : LocalService) {}

  onDisconnect() : void {
    this.localService.removeData("id");
    this.authService.disconnect();
  }
}
