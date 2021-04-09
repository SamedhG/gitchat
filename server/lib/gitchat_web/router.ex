defmodule GitchatWeb.Router do
  use GitchatWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", GitchatWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", GitchatWeb do
    pipe_through :api

    post "/user/login", PageController, :login
    post "/user/info", PageController, :get_user_profile
    post "/user/:username/repos", PageController, :get_user_repos
    post "/search/users", PageController, :search_users
    post "/user/recent", PageController, :add_recent
    post "/user/favorite", PageController, :toggle_favorite
    post "/user/request/send", PageController, :send_friend_request
    post "/user/request/accept", PageController, :accept_friend_request

  end

  # Other scopes may use custom stacks.
  # scope "/api", GitchatWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: GitchatWeb.Telemetry
    end
  end
end
