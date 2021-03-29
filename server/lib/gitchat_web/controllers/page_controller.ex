defmodule GitchatWeb.PageController do
  use GitchatWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
