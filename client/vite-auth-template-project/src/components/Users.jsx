import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";


const Users = () => {

  const axiosPrivate = useAxiosPrivate();
  const getUsers = async () => {
    const response = await axiosPrivate.get('/users');
    return response.data;
  }

  const { isLoading, isError, error, data: users } = useQuery(
    "users",
    getUsers);

  return (
    <article className="dark:text-white">
      <h2 className="underline">Users List</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : isError ? (
        <div>
          <p>Error fetching users: {error.message}</p>
        </div>
      ) : (
        Array.isArray(users) && users.length > 0 ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user.email}</li>
            ))}
          </ul>
          
        ) : (
          <p>No users to display</p>
        )
      )}
    </article>
  );
};

export default Users;
