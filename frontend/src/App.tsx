import { useState } from "react";
import { kcodes } from "./data/kcodes";

type Procedure = {
  code: string;
  name: string;
  point_code: string;
  note1: string | null;
  note2: string | null;
};

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);

    // 小文字化して部分一致検索（code, name, note1, note2 対象）
    const q = query.toLowerCase();
    const matched = kcodes.filter((item) =>
      [item.code, item.name, item.point_code, item.note1, item.note2]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    );

    setResults(matched);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロード防止
    handleSearch();
  };

  return (
    <div className="max-w-full sm:max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 text-center sm:text-left">
        診療報酬コード検索
      </h1>

      <div className="flex flex-col sm:flex-row mb-6 gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-6 gap-4">
          <input
            type="text"
            placeholder="例：創傷、K000"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-md font-semibold text-white shadow-md transition-colors
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}`}
          >
            {loading ? "検索中…" : "検索"}
          </button>
        </form>
      </div>

      {results.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">検索結果がありません</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                {["コード", "名称", "点数コード", "注記1", "注記2"].map((header) => (
                  <th
                    key={header}
                    className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((r) => (
                <tr key={r.code + r.point_code} className="hover:bg-blue-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{r.code}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{r.name}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{r.point_code}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{r.note1}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{r.note2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;