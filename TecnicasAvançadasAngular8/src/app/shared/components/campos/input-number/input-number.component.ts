import { Component, Input } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent  {

  @Input() titulo: string;
  @Input() formGroup: UntypedFormGroup;
  @Input() controlName: string;
  @Input() minimo = 0;
  @Input() maximo = 100;
  @Input() step = 1;

  constructor(
     public validacao: ValidarCamposService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
