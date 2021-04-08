defmodule Gitchat.Recents do
  @moduledoc """
  The Recents context.
  """

  import Ecto.Query, warn: false
  alias Gitchat.Repo

  alias Gitchat.Recents.Recent

  @doc """
  Returns the list of recents.

  ## Examples

      iex> list_recents()
      [%Recent{}, ...]

  """
  def list_recents do
    Repo.all(Recent)
  end

  @doc """
  Gets a single recent.

  Raises `Ecto.NoResultsError` if the Recent does not exist.

  ## Examples

      iex> get_recent!(123)
      %Recent{}

      iex> get_recent!(456)
      ** (Ecto.NoResultsError)

  """
  def get_recent!(id), do: Repo.get!(Recent, id)

  @doc """
  Creates a recent.

  ## Examples

      iex> create_recent(%{field: value})
      {:ok, %Recent{}}

      iex> create_recent(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_recent(attrs \\ %{}) do
    %Recent{}
    |> Recent.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a recent.

  ## Examples

      iex> update_recent(recent, %{field: new_value})
      {:ok, %Recent{}}

      iex> update_recent(recent, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_recent(%Recent{} = recent, attrs) do
    recent
    |> Recent.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a recent.

  ## Examples

      iex> delete_recent(recent)
      {:ok, %Recent{}}

      iex> delete_recent(recent)
      {:error, %Ecto.Changeset{}}

  """
  def delete_recent(%Recent{} = recent) do
    Repo.delete(recent)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking recent changes.

  ## Examples

      iex> change_recent(recent)
      %Ecto.Changeset{data: %Recent{}}

  """
  def change_recent(%Recent{} = recent, attrs \\ %{}) do
    Recent.changeset(recent, attrs)
  end

  def get_by_user(user_id) do
    query = from r in Recent, where: r.user_id == ^user_id, order_by: [desc: :inserted_at]
    Repo.all(query)
  end
end
