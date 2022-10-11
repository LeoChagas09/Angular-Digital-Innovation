import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarGamesComponent } from './visualizar-games.component';

describe('VisualizarGamesComponent', () => {
  let component: VisualizarGamesComponent;
  let fixture: ComponentFixture<VisualizarGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
