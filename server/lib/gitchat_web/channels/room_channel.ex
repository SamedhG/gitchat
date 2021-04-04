defmodule GitchatWeb.RoomChannel do
  use GitchatWeb, :channel

  alias Gitchat.RoomServer

  @impl true
  def join("room:" <> id, %{"token" => token, "peer_id" => peer_id}, socket) do

    case GithubAccess.check_authenticated(%{"access_token" => token}) do
      {:ok, user } -> 
        username = user.login
        repos = GithubAccess.get_user_repos(username)
        RoomServer.start(id)

        room = if Enum.any?(repos, &(&1["full_name"] == id)) do 
          RoomServer.join_collaborator(id, username, peer_id)
        else
          RoomServer.join_user(id, username, peer_id)
        end

        socket = socket
                 |> assign(:room_id, id)
                 |> assign(:username, username)

        {:ok, room, socket}

      {:error, error} ->
        {:error, %{reason: "unauthorized"}}
    end
  end
end
