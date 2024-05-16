/*
 * Created by Suastika Adinata on Sat May 11 2024
 * Copyright (c) 2024 - Made with love
 */

import { Model } from '@nozbe/watermelondb'
import { relation, field, date } from '@nozbe/watermelondb/decorators'

export default class TransactionModel extends Model {
  static table = 'transactions'
  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    users: { type: 'belongs_to', key: 'category_id' },
  }

  @relation('users', 'user_id') user
  @relation('categories', 'category_id') category
  
  @field('user_id') userId
  @field('category_id') categoryId
  @field('name') name
  @date('date') date
  @field('amount') amount
  @field('type') type
  @date('created_at') createdAt
}