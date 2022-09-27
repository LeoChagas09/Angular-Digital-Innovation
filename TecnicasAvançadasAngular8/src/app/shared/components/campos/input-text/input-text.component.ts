import { Component, Input } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent  {

  @Input() titulo: string;
  @Input() formGroup: UntypedFormGroup;
  @Input() controlName: string;

  constructor(
    public validacao: ValidarCamposService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }



}
