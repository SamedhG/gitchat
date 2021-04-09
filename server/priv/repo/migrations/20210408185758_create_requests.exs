defmodule Gitchat.Repo.Migrations.CreateRequests do
  use Ecto.Migration

  def change do
    create table(:requests) do
      add :invitee, :string, null: false
      add :inviter_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:requests, [:inviter_id])
  end
end
