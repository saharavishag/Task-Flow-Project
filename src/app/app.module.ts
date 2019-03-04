import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { navigateComponent } from './navigate/app.navigateComponent';
import { footerComponent } from './footer/app.footerComponent';
import { homeComponent } from './home/app.homeComponent';
import { taskFlowComponent, PopupDialogComponent} from './taskFlow/app.taskFlowComponent';
import { newTaskComponent } from './newTask/app.newTaskComponent';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, 
                 footerComponent, 
                 taskFlowComponent, 
                 navigateComponent,
                 PopupDialogComponent,
                 homeComponent,
                 newTaskComponent],
  entryComponents: [PopupDialogComponent],
  imports:      [BrowserModule,
                 DragDropModule,
                 MatDialogModule,
                 MatInputModule,
                 HttpClientModule,
                 ReactiveFormsModule,
                 FormsModule,
                 MatFormFieldModule,
                 BrowserAnimationsModule,
                 RouterModule.forRoot([
                   {
                     path: 'taskFlow',
                     component: taskFlowComponent                   
                   },
                   {
                     path: '',
                     component: homeComponent
                   },
                   {
                     path: 'newTask',
                     component: newTaskComponent
                   }
                  ])  
                ],
  providers:    [],
  bootstrap:    [AppComponent]
})

export class AppModule { }
