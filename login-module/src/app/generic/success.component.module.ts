import { NgModule } from '@angular/core';
import { SuccessComponent } from './success.component'


@NgModule({
    imports: [ SuccessModule ],
    declarations: [SuccessComponent],
    exports: [SuccessComponent
})

export class SuccessModule {}