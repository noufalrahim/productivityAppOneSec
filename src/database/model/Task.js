import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Task extends Model {
  static table = 'tasks';

  @field('title') title;
  @field('description') description;
  @field('all_day') allDay;
  @field('due_timestamp') dueTimeStamp;
  @field('completed') completed;
  @field('category') category;
}
