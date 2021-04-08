defmodule GitchatWeb.RecentControllerTest do
  use GitchatWeb.ConnCase

  alias Gitchat.Recents
  alias Gitchat.Recents.Recent

  @create_attrs %{
    repo: "some repo",
    url: "some url"
  }
  @update_attrs %{
    repo: "some updated repo",
    url: "some updated url"
  }
  @invalid_attrs %{repo: nil, url: nil}

  def fixture(:recent) do
    {:ok, recent} = Recents.create_recent(@create_attrs)
    recent
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all recents", %{conn: conn} do
      conn = get(conn, Routes.recent_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create recent" do
    test "renders recent when data is valid", %{conn: conn} do
      conn = post(conn, Routes.recent_path(conn, :create), recent: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.recent_path(conn, :show, id))

      assert %{
               "id" => id,
               "repo" => "some repo",
               "url" => "some url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.recent_path(conn, :create), recent: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update recent" do
    setup [:create_recent]

    test "renders recent when data is valid", %{conn: conn, recent: %Recent{id: id} = recent} do
      conn = put(conn, Routes.recent_path(conn, :update, recent), recent: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.recent_path(conn, :show, id))

      assert %{
               "id" => id,
               "repo" => "some updated repo",
               "url" => "some updated url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, recent: recent} do
      conn = put(conn, Routes.recent_path(conn, :update, recent), recent: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete recent" do
    setup [:create_recent]

    test "deletes chosen recent", %{conn: conn, recent: recent} do
      conn = delete(conn, Routes.recent_path(conn, :delete, recent))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.recent_path(conn, :show, recent))
      end
    end
  end

  defp create_recent(_) do
    recent = fixture(:recent)
    %{recent: recent}
  end
end
