import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  options: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

  }

}
