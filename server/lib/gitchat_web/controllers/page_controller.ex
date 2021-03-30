defmodule GitchatWeb.PageController do
  use GitchatWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def callback(conn, %{"code" => code}) do
    {:ok, profile} = GithubAccess.github_auth(code)
    conn
    |> put_view(GithubExperimentWeb.PageView)
    |> render(:welcome, profile: profile)
  end

  def search_users(conn, %{"term" => term}) do
    users = GithubAccess.search_users(term)
    IO.inspect(users["items"])
    conn
    |> render("show_users.html", users: users["items"])
  end

  def login(conn, %{"code" => code}) do
    {:ok, profile} = GithubAccess.github_auth(code)
    IO.inspect(profile)
    send_resp(conn, 200, Jason.encode!(profile))
  end

  def get_user_profile(conn, token) do
    {:ok, profile} = GithubAccess.check_authenticated(token)
    IO.inspect(profile)
    send_resp(conn, 200, Jason.encode!(profile))
  end

end
