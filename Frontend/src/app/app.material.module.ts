import { NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule ,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatTabsModule,


} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatTabsModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule ,
        MatFormFieldModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatTabsModule,
    ]
})
export class AppMaterialModule { }
