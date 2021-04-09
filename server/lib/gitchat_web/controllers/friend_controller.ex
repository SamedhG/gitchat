defmodule GitchatWeb.FriendController do
  use GitchatWeb, :controller

  alias Gitchat.Friends
  alias Gitchat.Friends.Friend

  action_fallback GitchatWeb.FallbackController

  def index(conn, _params) do
    friends = Friends.list_friends()
    render(conn, "index.json", friends: friends)
  end

  def create(conn, %{"friend" => friend_params}) do
    with {:ok, %Friend{} = friend} <- Friends.create_friend(friend_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.friend_path(conn, :show, friend))
      |> render("show.json", friend: friend)
    end
  end

  def show(conn, %{"id" => id}) do
    friend = Friends.get_friend!(id)
    render(conn, "show.json", friend: friend)
  end

  def get_friends_by_user_id(user_id) do
    friends = Friends.get_friends_by_user_id(user_id)
    GitchatWeb.FriendView.render("index.json", friends: friends)[:data]
  end

  def update(conn, %{"id" => id, "friend" => friend_params}) do
    friend = Friends.get_friend!(id)

    with {:ok, %Friend{} = friend} <- Friends.update_friend(friend, friend_params) do
      render(conn, "show.json", friend: friend)
    end
  end

  def delete(conn, %{"id" => id}) do
    friend = Friends.get_friend!(id)

    with {:ok, %Friend{}} <- Friends.delete_friend(friend) do
      send_resp(conn, :no_content, "")
    end
  end
end
