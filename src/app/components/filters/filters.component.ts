import {Component, OnInit} from '@angular/core';
import {priorityLevels} from '../../common/dicts/priority-levels';
import {statusTypes} from '../../common/dicts/status-types';
import {ControlValueAccessor, FormControl, FormGroup} from '@angular/forms';
import {AppComponentClass} from '../../common/classes/app-component.class';
import {StatusType} from '../../common/enums/status-type.enum';

@Component({
  selector: 'todo-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent extends AppComponentClass implements ControlValueAccessor, OnInit {
  public priorityLevels = {
    ...priorityLevels,
    'all': 'Любое',
  };
  public statusTypes = statusTypes;

  public filterForm = new FormGroup({
    priority: new FormControl('all'),
    statusTypes: new FormGroup({
      [StatusType.Active]: new FormControl(false),
      [StatusType.Failed]: new FormControl(false),
      [StatusType.Success]: new FormControl(false),
    }),
    sortByDate: new FormControl(''),
    sortByPriority: new FormControl(''),
    text: new FormControl(''),
  });

  public handleChangeSort(event): void {
    const name = event.active;
    const value = event.direction;
    const control = this.filterForm.get(name) as FormControl;

    control.setValue(value);
  }

  writeValue(value: any): void {
    if (value === Object(value)) {
      this.filterForm.patchValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  private _propagateChange: (value?: any | any[]) => any | any[] = () => {};

  ngOnInit(): void {
    this._observeSafe(this.filterForm.valueChanges).subscribe(value => this._propagateChange(value));
  }
}
