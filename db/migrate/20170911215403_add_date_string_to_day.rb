class AddDateStringToDay < ActiveRecord::Migration[5.1]
  def change
    add_column :days, :date, :string
  end
end
