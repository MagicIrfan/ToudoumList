import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.scss']
})
export class FourOhFourComponent {

  constructor(private router:Router) {
  }
  onReturn(){
    this.router.navigateByUrl("");
  }
}
