defmodule GitchatWeb.FriendView do
  use GitchatWeb, :view
  alias GitchatWeb.FriendView

  def render("index.json", %{friends: friends}) do
    %{data: render_many(friends, FriendView, "friend.json")}
  end

  def render("show.json", %{friend: friend}) do
    %{data: render_one(friend, FriendView, "friend.json")}
  end

  def render("friend.json", %{friend: friend}) do
    %{id: friend.id,
      invitee: render_one(friend.invitee, GitchatWeb.UserView, "user.json"),
      inviter: render_one(friend.inviter, GitchatWeb.UserView, "user.json")
    }
  end
end
