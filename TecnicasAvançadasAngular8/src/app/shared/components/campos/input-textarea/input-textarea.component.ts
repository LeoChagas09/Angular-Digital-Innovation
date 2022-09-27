import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {

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
