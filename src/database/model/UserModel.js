/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { Model } from '@nozbe/watermelondb'
import { children, field } from '@nozbe/watermelondb/decorators'

export default class UserModel extends Model {
  static table = 'users'
  static associations = {
    budgets: { type: 'has_many', foreignKey: 'user_id' },
    categories: { type: 'has_many', foreignKey: 'user_id' },
    transactions: { type: 'has_many', foreignKey: 'user_id' },
  }
  
  @children('budgets') budgets
  @children('categories') categories
  @children('transactions') transactions

  @field('fullname') fullname
  @field('birthdate') birthdate
  @field('gender') gender
  @field('username') username
  @field('password') password
}