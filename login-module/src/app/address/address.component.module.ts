import { NgModule } from '@angular/core';
import { AddressComponent } from './address.component'


@NgModule({
    imports: [ AddressModule ],
    declarations: [AddressComponent],
    exports: [AddressComponent]
})

export class AddressModule {}