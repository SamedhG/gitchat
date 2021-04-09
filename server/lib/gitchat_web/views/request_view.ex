defmodule GitchatWeb.RequestView do
  use GitchatWeb, :view
  alias GitchatWeb.RequestView

  def render("index.json", %{requests: requests}) do
    %{data: render_many(requests, RequestView, "request.json")}
  end

  def render("show.json", %{request: request}) do
    %{data: render_one(request, RequestView, "request.json")}
  end

  def render("request.json", %{request: request}) do
    %{id: request.id,
      invitee: request.invitee,
      inviter: render_one(request.inviter, GitchatWeb.UserView, "user.json")
    }
  end
end
