defmodule GitchatWeb.RoomChannel do
  use GitchatWeb, :channel

  alias Gitchat.RoomServer

  @impl true
  def join("room:" <> id, %{"token" => token, "peer_id" => peer_id}, socket) do

    case GithubAccess.check_authenticated(%{"access_token" => token}) do
      {:ok, user } -> 
        username = user.login
        repos = GithubAccess.get_user_repos(token)
        RoomServer.start(id)

        {room, socket} = if Enum.any?(repos, &(&1["full_name"] == id)) do 

          {RoomServer.join_collaborator(id, username, peer_id), assign(socket, :role, :collaborator)}
        else
          { RoomServer.join_user(id, username, peer_id), assign(socket, :role, :user) }
        end

        socket = socket
                 |> assign(:room_id, id)
                 |> assign(:username, username)
        IO.inspect socket
        {:ok, room, socket}

      {:error, error} ->
        {:error, %{reason: "unauthorized"}}
    end
  end


  @impl true
  def handle_in("leave", _payload, socket) do
    {:stop, socket}
  end

  @impl true
  def handle_in("kick", %{"user" => username}, socket) do
    case socket.assigns[:role] do
      :collaborator ->
        room_id = socket.assigns[:room_id]
        room = RoomServer.leave(room_id, username)
        {:ok, room, socket}
      :user ->
        {:error, %{reason: "Unauthorized" } }
    end
  end


  @impl true
  def terminate(_payload, socket) do
    user = socket.assigns[:username]
    room_id = socket.assigns[:room_id]
    room = RoomServer.leave(room_id, user)
    {:ok, room, socket}
  end
end
