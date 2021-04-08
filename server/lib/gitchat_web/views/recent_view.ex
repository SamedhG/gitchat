defmodule GitchatWeb.RecentView do
  use GitchatWeb, :view
  alias GitchatWeb.RecentView

  def render("index.json", %{recents: recents}) do
    %{data: render_many(recents, RecentView, "recent.json")}
  end

  def render("show.json", %{recent: recent}) do
    %{data: render_one(recent, RecentView, "recent.json")}
  end

  def render("recent.json", %{recent: recent}) do
    %{id: recent.id,
      repo: recent.repo,
      url: recent.url,
      created: recent.inserted_at
    }
  end
end
