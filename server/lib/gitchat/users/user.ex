defmodule Gitchat.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :avatar_url, :string
    has_many :recents, Gitchat.Recents.Recent

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :avatar_url])
    |> validate_required([:name, :avatar_url])
  end
end
