import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class TaskSummary extends Model {
  static table = 'task_summary';

  @field('total') total;
  @field('pending') pending;
  @field('completed') completed;
  @date('updated_at') updatedAt;
  @date('created_at') createdAt;
}
