import {StatusType} from '../enums/status-type.enum';
import {PriorityLevel} from '../enums/priority-level.enum';

export interface Task {
  text: string;
  priority: PriorityLevel;
  date: Date;
  status: StatusType;
}
