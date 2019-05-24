class CreateActors < ActiveRecord::Migration[5.2]
  def change
    create_table :actors do |t|
      t.string :name
      t.string :pic_url
      t.integer :age
      t.string :nationality

      t.timestamps
    end
  end
end
