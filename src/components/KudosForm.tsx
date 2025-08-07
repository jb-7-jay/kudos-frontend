import React, { useEffect, useState } from "react";
import { getOrgUsers, createKudos } from "../services/kudos";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const KudosForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [receiverId, setReceiverId] = useState<number>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getOrgUsers();
        setUsers(data);
      } catch (err: any) {
        setFeedback(err.message);
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");
    setLoading(true);

    try {
      if (!receiverId || !message.trim()) {
        setFeedback("Please select a user and enter a message.");
        return;
      }

      await createKudos({ receiver_id: receiverId, message });
      setFeedback("Kudos sent successfully!");
      setReceiverId(undefined);
      setMessage("");
    } catch (err: any) {
      setFeedback(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 mt-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">Send Kudos</h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Select Teammate
        </label>
        <select
          value={receiverId ?? ""}
          onChange={(e) => setReceiverId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="">-- Select a user --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          rows={4}
          placeholder="Write your kudos..."
          required
        />
      </div>

      {feedback && <div className="text-sm text-blue-600">{feedback}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Kudos"}
      </button>
    </form>
  );
};

export default KudosForm;
