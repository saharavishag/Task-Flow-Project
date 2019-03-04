import { Component } from '@angular/core';

import { footerComponent } from './footer/app.footerComponent';
import { taskFlowComponent } from './taskFlow/app.taskFlowComponent';

@Component({
  selector: 'app-root',
  templateUrl: './main.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks Dashboard';
}
