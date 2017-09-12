class Day < ApplicationRecord
  has_many :tasks, dependent: :destroy
end
