import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataGeneratePdfComponent } from './table-data-generate-pdf.component';

describe('TableDataGeneratePdfComponent', () => {
  let component: TableDataGeneratePdfComponent;
  let fixture: ComponentFixture<TableDataGeneratePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDataGeneratePdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataGeneratePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
