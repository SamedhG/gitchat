defmodule GitchatWeb.FavoriteControllerTest do
  use GitchatWeb.ConnCase

  alias Gitchat.Favorites
  alias Gitchat.Favorites.Favorite

  @create_attrs %{
    repo: "some repo",
    url: "some url"
  }
  @update_attrs %{
    repo: "some updated repo",
    url: "some updated url"
  }
  @invalid_attrs %{repo: nil, url: nil}

  def fixture(:favorite) do
    {:ok, favorite} = Favorites.create_favorite(@create_attrs)
    favorite
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all favorites", %{conn: conn} do
      conn = get(conn, Routes.favorite_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create favorite" do
    test "renders favorite when data is valid", %{conn: conn} do
      conn = post(conn, Routes.favorite_path(conn, :create), favorite: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.favorite_path(conn, :show, id))

      assert %{
               "id" => id,
               "repo" => "some repo",
               "url" => "some url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.favorite_path(conn, :create), favorite: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update favorite" do
    setup [:create_favorite]

    test "renders favorite when data is valid", %{conn: conn, favorite: %Favorite{id: id} = favorite} do
      conn = put(conn, Routes.favorite_path(conn, :update, favorite), favorite: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.favorite_path(conn, :show, id))

      assert %{
               "id" => id,
               "repo" => "some updated repo",
               "url" => "some updated url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, favorite: favorite} do
      conn = put(conn, Routes.favorite_path(conn, :update, favorite), favorite: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete favorite" do
    setup [:create_favorite]

    test "deletes chosen favorite", %{conn: conn, favorite: favorite} do
      conn = delete(conn, Routes.favorite_path(conn, :delete, favorite))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.favorite_path(conn, :show, favorite))
      end
    end
  end

  defp create_favorite(_) do
    favorite = fixture(:favorite)
    %{favorite: favorite}
  end
end
