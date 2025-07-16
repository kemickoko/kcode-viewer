import { useState } from "react";

type Procedure = {
  code: string;
  name: string;
  point_code: string;
  note1: string;
  note2: string;
};

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("API error");
      const data: Procedure[] = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>診療報酬コード検索</h1>
      <input
        type="text"
        placeholder="検索語を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: 300, marginRight: 8 }}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "検索中..." : "検索"}
      </button>

      <div style={{ marginTop: 20 }}>
        {results.length === 0 ? (
          <p>検索結果なし</p>
        ) : (
          <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>コード</th>
                <th>名称</th>
                <th>点数</th>
                <th>注記1</th>
                <th>注記2</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.code}>
                  <td>{r.code}</td>
                  <td>{r.name}</td>
                  <td></td>
                  <td>{r.note1}</td>
                  <td>{r.note2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;