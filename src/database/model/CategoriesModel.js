/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { Model } from '@nozbe/watermelondb'

export default class CategoriesModel extends Model {
  static table = 'categories'
  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    transactions: { type: 'has_many', foreignKey: 'category_id' },
  }

  @relation('users', 'user_id') user
  @children('transactions') transactions
  
  @field('user_id') userId
  @field('name') name
  @field('created_at') createdAt
}