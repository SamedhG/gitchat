defmodule Gitchat.Recents.Recent do
  use Ecto.Schema
  import Ecto.Changeset

  schema "recents" do
    field :repo, :string
    field :url, :string
    belongs_to :user, Gitchat.Users.User

    timestamps()
  end

  @doc false
  def changeset(recent, attrs) do
    recent
    |> cast(attrs, [:repo, :url, :user_id])
    |> validate_required([:repo, :url, :user_id])
  end
end
