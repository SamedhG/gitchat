defmodule Gitchat.Repo do
  use Ecto.Repo,
    otp_app: :gitchat,
    adapter: Ecto.Adapters.Postgres
end
