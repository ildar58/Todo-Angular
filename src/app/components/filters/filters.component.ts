import {Component, OnInit} from '@angular/core';
import {priorityLevels} from '../../common/dicts/priority-levels';
import {statusTypes} from '../../common/dicts/status-types';
import {FormControl, FormGroup} from '@angular/forms';
import {AppComponentClass} from '../../common/classes/app-component.class';
import {StatusType} from '../../common/enums/status-type.enum';
import {TodoService} from '../../common/services/todo.service';

@Component({
  selector: 'todo-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent extends AppComponentClass implements OnInit {
  public priorityLevels = {
    ...priorityLevels,
    all: 'Любое',
  };
  public statusTypes = statusTypes;
  public filterForm: FormGroup = new FormGroup({
    priority: new FormControl('all'),
    statusTypes: new FormGroup({
      [StatusType.Active]: new FormControl(true),
      [StatusType.Failed]: new FormControl(true),
      [StatusType.Success]: new FormControl(true),
    }),
    sortByDate: new FormControl(''),
    sortByPriority: new FormControl(''),
    text: new FormControl(''),
  });

  constructor(private _todoService: TodoService) {
    super();
  }

  ngOnInit(): void {
    this._observeSafe(this.filterForm.valueChanges).subscribe(value => this._todoService.filterTask(value));
    this._todoService.cachedConditions = this.filterForm.value;
  }

  public handleChangeSort(event): void {
    const name = event.active;
    const value = event.direction;
    const control = this.filterForm.get(name) as FormControl;

    control.setValue(value);
  }
}
