# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## users_table
|Column|Type|Options|
|------|----|-------|
|name|text|null: false, index: true|
|email|text|null: false, unique: true|

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: members

## groups_table

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

### Association
- has_many :members
- has_many :users, through: members
- has_many :messages

## messages_table

|Column|Type|Options|
|------|----|-------|
|body|text|index: true|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## members_table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

