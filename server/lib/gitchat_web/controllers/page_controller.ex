defmodule GitchatWeb.PageController do
  use GitchatWeb, :controller
  alias Gitchat.Users
  alias Gitchat.Recents

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def callback(conn, %{"code" => code}) do
    {:ok, profile} = GithubAccess.github_auth(code)
    conn
    |> put_view(GithubExperimentWeb.PageView)
    |> render(:welcome, profile: profile)
  end

  def search_users(conn, body) do
    IO.inspect(body)
    users = GithubAccess.search_users(body["term"], body["limit"], body["access_token"])["items"]
    fields = ["avatar_url", "id", "login"]
    filtered_users = Enum.map(users, fn user -> Map.take(user, fields) end)
    IO.inspect(filtered_users)
    send_resp(conn, 200, Jason.encode!(%{data: filtered_users}))
  end

  def login(conn, %{"code" => code}) do
    {:ok, profile} = GithubAccess.github_auth(code)
    user = Users.get_user_by_name(profile[:login])
    if !user do
      Users.create_user(%{"name": profile[:login]})
    end
    send_resp(conn, 200, Jason.encode!(profile))
  end

  def get_user_profile(conn, token) do
    {:ok, profile} = GithubAccess.check_authenticated(token)
    repos = GithubAccess.get_user_repos(token)
    fields = ["id", "name", "html_url", "full_name"]
    filtered_repos = Enum.map(repos, fn repo -> Map.take(repo, fields) end)
    user = Users.get_user_by_name(profile[:login])
    recents = GitchatWeb.RecentController.get_by_user(%{"user_id" => user.id})
    favorites = GitchatWeb.FavoriteController.get_by_user(%{"user_id" => user.id})
    profile = Map.put(profile, :repos, filtered_repos)
    profile = Map.put(profile, :recents, recents)
    profile = Map.put(profile, :favorites, favorites)
    send_resp(conn, 200, Jason.encode!(profile))
  end

  def get_user_repos(conn, body) do
    access_token = body["access_token"]
    username = body["username"]
    repos = GithubAccess.get_user_repos(access_token, username)
    fields = ["id", "name", "html_url", "full_name"]
    filtered_repos = Enum.map(repos, fn repo -> Map.take(repo, fields) end)
    send_resp(conn, 200, Jason.encode!(%{data: filtered_repos}))
  end

  def add_recent(conn, %{"user" => user, "repo" => repo, "url" => url}) do
    user = Users.get_user_by_name(user)
    Recents.create_recent(%{"user_id": user.id, "repo": repo, "url": url})
    recents = GitchatWeb.RecentController.get_by_user(%{"user_id" => user.id})
    send_resp(conn, 200, Jason.encode!(%{recents: recents}))
  end

  def toggle_favorite(conn, %{"user" => user, "repo" => repo, "url" => url}) do
    user = Users.get_user_by_name(user)
    GitchatWeb.FavoriteController.create_or_delete(user.id, repo, url)
    favorites = GitchatWeb.FavoriteController.get_by_user(%{"user_id" => user.id})
    send_resp(conn, 200, Jason.encode!(%{favorites: favorites}))
  end

end
