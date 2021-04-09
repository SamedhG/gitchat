defmodule Gitchat.Repo.Migrations.CreateFriends do
  use Ecto.Migration

  def change do
    create table(:friends) do
      add :inviter_id, references(:users, on_delete: :nothing)
      add :invitee_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:friends, [:inviter_id])
    create index(:friends, [:invitee_id])
  end
end
