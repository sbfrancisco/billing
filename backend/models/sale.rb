class Sale < ActiveRecord::Base
  has_one :service
  belongs_to :bill
end
