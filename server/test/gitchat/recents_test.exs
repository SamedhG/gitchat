defmodule Gitchat.RecentsTest do
  use Gitchat.DataCase

  alias Gitchat.Recents

  describe "recents" do
    alias Gitchat.Recents.Recent

    @valid_attrs %{repo: "some repo", url: "some url"}
    @update_attrs %{repo: "some updated repo", url: "some updated url"}
    @invalid_attrs %{repo: nil, url: nil}

    def recent_fixture(attrs \\ %{}) do
      {:ok, recent} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recents.create_recent()

      recent
    end

    test "list_recents/0 returns all recents" do
      recent = recent_fixture()
      assert Recents.list_recents() == [recent]
    end

    test "get_recent!/1 returns the recent with given id" do
      recent = recent_fixture()
      assert Recents.get_recent!(recent.id) == recent
    end

    test "create_recent/1 with valid data creates a recent" do
      assert {:ok, %Recent{} = recent} = Recents.create_recent(@valid_attrs)
      assert recent.repo == "some repo"
      assert recent.url == "some url"
    end

    test "create_recent/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recents.create_recent(@invalid_attrs)
    end

    test "update_recent/2 with valid data updates the recent" do
      recent = recent_fixture()
      assert {:ok, %Recent{} = recent} = Recents.update_recent(recent, @update_attrs)
      assert recent.repo == "some updated repo"
      assert recent.url == "some updated url"
    end

    test "update_recent/2 with invalid data returns error changeset" do
      recent = recent_fixture()
      assert {:error, %Ecto.Changeset{}} = Recents.update_recent(recent, @invalid_attrs)
      assert recent == Recents.get_recent!(recent.id)
    end

    test "delete_recent/1 deletes the recent" do
      recent = recent_fixture()
      assert {:ok, %Recent{}} = Recents.delete_recent(recent)
      assert_raise Ecto.NoResultsError, fn -> Recents.get_recent!(recent.id) end
    end

    test "change_recent/1 returns a recent changeset" do
      recent = recent_fixture()
      assert %Ecto.Changeset{} = Recents.change_recent(recent)
    end
  end
end
