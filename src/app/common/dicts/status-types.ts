import {StatusType} from '../enums/status-type.enum';

export const statusTypes = [
  {
    alias: StatusType.Active,
    name: 'Активные',
  },
  {
    alias: StatusType.Failed,
    name: 'Отмененные',
  },
  {
    alias: StatusType.Success,
    name: 'Завершенные',
  },
];
