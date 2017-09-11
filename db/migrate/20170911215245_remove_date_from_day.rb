class RemoveDateFromDay < ActiveRecord::Migration[5.1]
  def change
    remove_column :days, :date, :date
  end
end
