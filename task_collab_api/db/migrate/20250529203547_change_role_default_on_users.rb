class ChangeRoleDefaultOnUsers < ActiveRecord::Migration[6.1]
  def change
    # Step 1: Set all existing NULL roles to 0 (user)
    User.where(role: nil).update_all(role: 0)

    # Step 2: Apply default and NOT NULL constraint
    change_column_default :users, :role, 0
    change_column_null :users, :role, false
  end
end
