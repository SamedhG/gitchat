# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :gitchat,
  ecto_repos: [Gitchat.Repo]

# Configures the endpoint
config :gitchat, GitchatWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "E/ngdwcT+frBfAV2BVMnn7/nmlECtYuYPQL+FfHFX+QN4znt5yo0KsP99/Kf4tXZ",
  render_errors: [view: GitchatWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Gitchat.PubSub,
  live_view: [signing_salt: "q+sgYdza"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
