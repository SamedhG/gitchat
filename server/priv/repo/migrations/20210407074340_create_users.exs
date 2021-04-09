defmodule Gitchat.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :avatar_url, :string, null: false

      timestamps()
    end

  end
end
