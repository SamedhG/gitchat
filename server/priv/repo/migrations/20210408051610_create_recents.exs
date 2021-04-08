defmodule Gitchat.Repo.Migrations.CreateRecents do
  use Ecto.Migration

  def change do
    create table(:recents) do
      add :repo, :string, null: false
      add :url, :string, null: false
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:recents, [:user_id])
  end
end
