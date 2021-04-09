defmodule Gitchat.Requests.Request do
  use Ecto.Schema
  import Ecto.Changeset

  schema "requests" do
    field :invitee, :string
    belongs_to :inviter, Gitchat.Users.User

    timestamps()
  end

  @doc false
  def changeset(request, attrs) do
    request
    |> cast(attrs, [:invitee, :inviter_id])
    |> validate_required([:invitee, :inviter_id])
  end
end
