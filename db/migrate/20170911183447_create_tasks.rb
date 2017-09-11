class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.integer :priority_level
      t.string :completion_time
      t.boolean :completed, default: false
      t.references :day, foreign_key: true

      t.timestamps
    end
  end
end
