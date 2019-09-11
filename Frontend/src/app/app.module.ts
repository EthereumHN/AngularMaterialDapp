import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule} from './app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// UI
import { TransactionComponent } from './transaction/transaction.component';
import { WelcomeComponent  } from './welcome/welcome.component';

// Services
import { ContractService } from './services/contract.service';
import { UploadService} from './services/upload.service';


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
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    ContractService,
    UploadService
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
