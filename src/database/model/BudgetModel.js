/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { Model } from '@nozbe/watermelondb'

export default class BudgetModel extends Model {
  static table = 'budgets'
  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
  }

  @relation('users', 'user_id') user
  
  @field('user_id') userId
  @field('amount') amount
  @field('created_at') createdAt
}