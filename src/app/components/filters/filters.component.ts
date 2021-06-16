import { Component, OnInit } from '@angular/core';
import {priorityLevels} from '../../common/dicts/priority-levels';
import {statusTypes} from '../../common/dicts/status-types';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'todo-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public priorityLevels = [
    ...priorityLevels,
    {
      alias: '',
      name: 'Любой'
    }
  ]
  public statusTypes = statusTypes;

  public filterForm;

  constructor(private readonly _fb: FormBuilder) {
    this.filterForm = this._fb.group({
      priority: '',
      statusTypes: this._fb.group({
        low: false,
        medium: false,
        high: false
      }),
      sortByDate: 'asc',
      sortByPriority: 'asc',
      text: ''
    })
  }

  ngOnInit(): void {
  }

}
