defmodule GitchatWeb.RecentController do
  use GitchatWeb, :controller

  alias Gitchat.Recents
  alias Gitchat.Recents.Recent

  action_fallback GitchatWeb.FallbackController

  def index(conn, _params) do
    recents = Recents.list_recents()
    render(conn, "index.json", recents: recents)
  end

  def create(conn, %{"recent" => recent_params}) do
    with {:ok, %Recent{} = recent} <- Recents.create_recent(recent_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.recent_path(conn, :show, recent))
      |> render("show.json", recent: recent)
    end
  end

  def get_by_user(%{"user_id" => user_id}) do
    recents = Recents.get_by_user(user_id)
    GitchatWeb.RecentView.render("index.json", recents: recents)[:data]
  end

  def show(conn, %{"id" => id}) do
    recent = Recents.get_recent!(id)
    render(conn, "show.json", recent: recent)
  end

  def update(conn, %{"id" => id, "recent" => recent_params}) do
    recent = Recents.get_recent!(id)

    with {:ok, %Recent{} = recent} <- Recents.update_recent(recent, recent_params) do
      render(conn, "show.json", recent: recent)
    end
  end

  def delete(conn, %{"id" => id}) do
    recent = Recents.get_recent!(id)

    with {:ok, %Recent{}} <- Recents.delete_recent(recent) do
      send_resp(conn, :no_content, "")
    end
  end
end
