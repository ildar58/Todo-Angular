import {Component} from '@angular/core';
import {priorityLevels} from '../../common/dicts/priority-levels';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../common/interfaces/task.interface';
import {StatusType} from '../../common/enums/status-type.enum';
import {TodoService} from '../../common/services/todo.service';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public priorityLevels = priorityLevels;

  public get priorityControl(): FormControl {
    return this.form.get('priority') as FormControl;
  }

  public get textControl(): FormControl {
    return this.form.get('text') as FormControl;
  }

  public form: FormGroup = new FormGroup({
    priority: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required),
  });

  constructor(private readonly _todoService: TodoService) {}

  public resetForm(): void {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null);
    });
  }

  public submit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const task: Task = {
        text: this.textControl.value,
        priority: this.priorityControl.value,
        date: new Date(),
        status: StatusType.Active,
      };

      this._todoService.addTask(task);
      this.resetForm();
    }
  }
}
