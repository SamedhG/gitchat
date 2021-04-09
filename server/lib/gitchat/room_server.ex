defmodule Gitchat.RoomServer do
  use GenServer

  alias Gitchat.BackupAgent
  alias Gitchat.Room
  alias Gitchat.RoomSup

  # public interface

  def reg(room_id) do
    {:via, Registry, {Gitchat.RoomReg, room_id}}
  end

  def start(room_id) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [room_id]},
      restart: :permanent,
      type: :worker
    }
    RoomSup.start_child(spec)
  end

  def start_link(room_id) do
    room = BackupAgent.get(room_id) || Room.new(room_id)
    GenServer.start_link(
      __MODULE__,
      room,
      name: reg(room_id)
    )
  end

  def join_collaborator(room_id, username, peer_id) do
    GenServer.call(reg(room_id), {:join_c, room_id, username, peer_id})
  end

  def join_user(room_id, username, peer_id) do
    GenServer.call(reg(room_id), {:join_u, room_id, username, peer_id})
  end
  
  def leave(room_id, username) do
    GenServer.call(reg(room_id), {:leave, room_id, username})
  end

  # implementation
  def init(room) do
    {:ok, room}
  end

  def handle_call({:join_c, room_id, username, peer_id}, _from, room) do
    room = Room.join_collaborator(room, username, peer_id)
    BackupAgent.put(room_id, room)
    send_update(room_id, "collaborator", %{user: username, peer_id: peer_id}) 
    {:reply, room, room}
  end
  
  def handle_call({:join_u, room_id, username, peer_id}, _from, room) do
    room = Room.join_user(room, username, peer_id)
    BackupAgent.put(room_id, room)
    send_update(room_id, "user", %{user: username, peer_id: peer_id}) 
    {:reply, room, room}
  end
  
  def handle_call({:leave, room_id, username}, _from, room) do
    room = Room.leave(room, username)
    BackupAgent.put(room_id, room)
    send_update(room_id, "leave", %{user: username}) 
    {:reply, room, room}
  end


defp send_update(id, type, message) do
    GitchatWeb.Endpoint.broadcast!(
      "room:"<> id,
      type,
      message)
  end
end
