defmodule Gitchat.Favorites.Favorite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "favorites" do
    field :repo, :string
    field :url, :string
    belongs_to :user, Gitchat.Users.User

    timestamps()
  end

  @doc false
  def changeset(favorite, attrs) do
    favorite
    |> cast(attrs, [:repo, :url, :user_id])
    |> validate_required([:repo, :url, :user_id])
  end
end
