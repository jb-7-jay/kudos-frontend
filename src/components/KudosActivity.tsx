import React, { useEffect, useState } from "react";
import { getKudosActivity } from "../services/kudos";
import { format, startOfWeek } from "date-fns";

type KudosEntry = {
  id: number;
  message: string;
  created_at: string;
  sender: { first_name: string; last_name: string };
  receiver: { first_name: string; last_name: string };
};

type GroupedActivity = {
  [weekStart: string]: KudosEntry[];
};

const groupByWeek = (entries: KudosEntry[]): GroupedActivity => {
  return entries.reduce((acc: GroupedActivity, entry) => {
    const week = format(
      startOfWeek(new Date(entry.created_at), { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    );
    acc[week] = acc[week] || [];
    acc[week].push(entry);
    return acc;
  }, {});
};

const KudosActivity: React.FC = () => {
  const [sent, setSent] = useState<GroupedActivity>({});
  const [received, setReceived] = useState<GroupedActivity>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKudosActivity();
        setSent(groupByWeek(data.send));
        setReceived(groupByWeek(data.received));
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-10 px-4">
      <h2 className="text-xl font-bold text-gray-800">Kudos Activity</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700">Sent Kudos</h3>
        {Object.entries(sent).map(([week, entries]) => (
          <div key={week} className="mb-4">
            <h4 className="font-medium text-sm text-gray-600 mb-1">
              Week Starting: {format(new Date(week), "dd MMM yyyy")}
            </h4>
            <table className="w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Receiver</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((kudos) => (
                  <tr key={kudos.id} className="border-t">
                    <td className="p-2">
                      {kudos.receiver.first_name} {kudos.receiver.last_name}
                    </td>
                    <td className="p-2">{kudos.message}</td>
                    <td className="p-2">
                      {format(new Date(kudos.created_at), "dd MMM yyyy HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-700">
          Received Kudos
        </h3>
        {Object.entries(received).map(([week, entries]) => (
          <div key={week} className="mb-4">
            <h4 className="font-medium text-sm text-gray-600 mb-1">
              Week Starting: {format(new Date(week), "dd MMM yyyy")}
            </h4>
            <table className="w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Sender</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((kudos) => (
                  <tr key={kudos.id} className="border-t">
                    <td className="p-2">
                      {kudos.sender.first_name} {kudos.sender.last_name}
                    </td>
                    <td className="p-2">{kudos.message}</td>
                    <td className="p-2">
                      {format(new Date(kudos.created_at), "dd MMM yyyy HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KudosActivity;
