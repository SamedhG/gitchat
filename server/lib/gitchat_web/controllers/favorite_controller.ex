defmodule GitchatWeb.FavoriteController do
  use GitchatWeb, :controller

  alias Gitchat.Favorites
  alias Gitchat.Favorites.Favorite

  action_fallback GitchatWeb.FallbackController

  def index(conn, _params) do
    favorites = Favorites.list_favorites()
    render(conn, "index.json", favorites: favorites)
  end

  def create(conn, %{"favorite" => favorite_params}) do
    with {:ok, %Favorite{} = favorite} <- Favorites.create_favorite(favorite_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.favorite_path(conn, :show, favorite))
      |> render("show.json", favorite: favorite)
    end
  end

  def create_or_delete(user_id, repo, url) do
    favorite = Favorites.get_by_user_repo(user_id, repo)
    if favorite do
      Favorites.delete_favorite(favorite)
    else
      Favorites.create_favorite(%{"user_id": user_id, "repo": repo, "url": url})
    end
    1
  end

  def get_by_user(%{"user_id" => user_id}) do
    favorites = Favorites.get_by_user(user_id)
    GitchatWeb.FavoriteView.render("index.json", favorites: favorites)[:data]
  end

  def show(conn, %{"id" => id}) do
    favorite = Favorites.get_favorite!(id)
    render(conn, "show.json", favorite: favorite)
  end

  def update(conn, %{"id" => id, "favorite" => favorite_params}) do
    favorite = Favorites.get_favorite!(id)

    with {:ok, %Favorite{} = favorite} <- Favorites.update_favorite(favorite, favorite_params) do
      render(conn, "show.json", favorite: favorite)
    end
  end

  def delete(conn, %{"id" => id}) do
    favorite = Favorites.get_favorite!(id)

    with {:ok, %Favorite{}} <- Favorites.delete_favorite(favorite) do
      send_resp(conn, :no_content, "")
    end
  end
end
