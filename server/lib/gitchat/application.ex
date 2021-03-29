defmodule Gitchat.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Gitchat.Repo,
      # Start the Telemetry supervisor
      GitchatWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Gitchat.PubSub},
      # Start the Endpoint (http/https)
      GitchatWeb.Endpoint
      # Start a worker by calling: Gitchat.Worker.start_link(arg)
      # {Gitchat.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Gitchat.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    GitchatWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
