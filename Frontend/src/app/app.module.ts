import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractService } from './services/contract.service';
import { AppMaterialModule} from './app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
//UI
import { TransactionComponent } from './transaction/transaction.component';
import { WelcomeComponent  } from "./welcome/welcome.component";
@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    WelcomeComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    ContractService
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
