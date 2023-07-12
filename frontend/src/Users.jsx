import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./redux/userSlice";

function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteuser/" + id)
      .then(() => {
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="rounded flex flex-col gap-5 justify-center items-center h-1/2 w-1/3">
        <div>
          <h1 className="text-3xl">User Management System</h1>
        </div>
        <Link
          to="/create"
          className="bg-black text-white w-[120px] p-2 text-center rounded-lg"
        >
          Add User
        </Link>
        <table className="table-auto border-separate border-spacing-2 border border-slate-300 ">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Id</th>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">Email</th>
              <th className="border border-slate-300">Phone</th>
              <th className="border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-300 text-center p-2">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 text-center p-2">
                    {user.name}
                  </td>
                  <td className="border border-slate-300 text-center p-2">
                    {user.email}
                  </td>
                  <td className="border border-slate-300 text-center  p-2">
                    {user.phone}
                  </td>
                  <td className="border border-slate-300 flex gap-3 align-middle justify-center p-2">
                    <Link
                      to={`/edit/${user.id}`}
                      className="border-none bg-blue-400 text-black p-2 rounded-md"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="border-none bg-red-400 text-black p-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
