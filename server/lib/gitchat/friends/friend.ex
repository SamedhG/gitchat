defmodule Gitchat.Friends.Friend do
  use Ecto.Schema
  import Ecto.Changeset

  schema "friends" do
    belongs_to :inviter, Gitchat.Users.User
    belongs_to :invitee, Gitchat.Users.User

    timestamps()
  end

  @doc false
  def changeset(friend, attrs) do
    friend
    |> cast(attrs, [:inviter_id, :invitee_id])
    |> validate_required([:inviter_id, :invitee_id])
  end
end
