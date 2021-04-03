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

  def search_users(conn, %{}) do
    users = GithubAccess.search_users(conn.params["term"], conn.params["limit"])["items"]
    fields = ["avatar_url", "id", "login"]
    filtered_users = Enum.map(users, fn user -> Map.take(user, fields) end)
    send_resp(conn, 200, Jason.encode!(%{"data": filtered_users}))
  end

  def login(conn, %{"code" => code}) do
    {:ok, profile} = GithubAccess.github_auth(code)
    send_resp(conn, 200, Jason.encode!(profile))
  end

  def get_user_profile(conn, token) do
    {:ok, profile} = GithubAccess.check_authenticated(token)
    send_resp(conn, 200, Jason.encode!(profile))
  end

  def get_user_repos(conn, %{"username" => username}) do
    repos = GithubAccess.get_user_repos(username)
    fields = ["id", "name", "html_url"]
    filtered_repos = Enum.map(repos, fn repo -> Map.take(repo, fields) end)
    send_resp(conn, 200, Jason.encode!(%{"data": filtered_repos}))
  end

end
