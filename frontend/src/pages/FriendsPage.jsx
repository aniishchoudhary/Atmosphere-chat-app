import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/api"; // you’ll make this

const FriendsPage = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <p>Loading friends...</p>;
  if (error) return <p>Error fetching friends</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Friends</h1>
      <ul className="space-y-2">
        {users?.map((user) => (
          <li
            key={user._id}
            className="p-2 border rounded-lg hover:bg-gray-100 flex justify-between"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.fullName}</span>
            </div>
            <Link
              to={`/chat/${user._id}`}
              className="text-blue-500 hover:underline"
            >
              Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
