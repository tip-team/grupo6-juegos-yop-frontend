import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule } from '@angular/material';

const modules = [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class Material { }
