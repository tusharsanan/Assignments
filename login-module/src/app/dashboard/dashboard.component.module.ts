import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component'


@NgModule({
    imports: [ DashboardModule ],
    declarations: [DashboardComponent],
    exports: [DashboardComponent]
})

export class DashboardModule {}