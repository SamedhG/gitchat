defmodule GitchatWeb.FavoriteView do
  use GitchatWeb, :view
  alias GitchatWeb.FavoriteView

  def render("index.json", %{favorites: favorites}) do
    %{data: render_many(favorites, FavoriteView, "favorite.json")}
  end

  def render("show.json", %{favorite: favorite}) do
    %{data: render_one(favorite, FavoriteView, "favorite.json")}
  end

  def render("favorite.json", %{favorite: favorite}) do
    %{id: favorite.id,
      repo: favorite.repo,
      url: favorite.url}
  end
end
