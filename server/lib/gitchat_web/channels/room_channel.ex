defmodule GitchatWeb.RoomChannel do
  use GitchatWeb, :channel

  alias Gitchat.RoomServer

  @impl true
  def join("room:" <> id, %{"token" => token, "peer_id" => peer_id}, socket) do
    if authorized?(token, id) do
      # TODO: Token is not the username
      RoomServer.start(id)
      RoomServer.join_collaborator(id, "user_" <> token, peer_id)
      socket = socket
               |> assign(:room_id, id)
               |> assign(:username, "user_" <> token)
      
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end


  # Add authorization logic here as required.
  defp authorized?(_payload, _room_id) do
    # assign the current user and room id to the socket here
    true
  end
end
