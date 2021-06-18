import {Component, Input, OnInit} from '@angular/core';
import {TaskDto} from '../../../../../common/interfaces/task-dto.interface';
import {PriorityLevel} from '../../../../../common/enums/priority-level.enum';
import {priorityLevels} from '../../../../../common/dicts/priority-levels';
import {StatusType} from '../../../../../common/enums/status-type.enum';
import {TodoService} from '../../../../../common/services/todo.service';

@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  public task!: TaskDto;

  public prioritySelectors;

  public statusSelectors;

  public priorityLevels = priorityLevels;

  public statusType: typeof StatusType = StatusType;

  constructor(private readonly _todoService: TodoService) {}

  ngOnInit(): void {
    this.prioritySelectors = {
      'card-priority__high': this.task.priority === PriorityLevel.High,
      'card-priority__medium': this.task.priority === PriorityLevel.Medium,
      'card-priority__low': this.task.priority === PriorityLevel.Low,
    };

    this.statusSelectors = {
      'card-content__success': this.task.status === StatusType.Success,
      'card-content__failed': this.task.status === StatusType.Failed,
    };
  }

  public changeStatus(value: StatusType): void {
    this._todoService.updateTask({
      ...this.task,
      status: value,
    });
  }

  public deleteTask(): void {
    this._todoService.deleteTask(this.task.id);
  }
}
