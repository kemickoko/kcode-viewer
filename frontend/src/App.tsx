import { useState } from 'react';
import './App.css';

type CodeEntry = {
  code: string;
  name: string;
  point: number;
};

const MOCK_DATA: CodeEntry[] = [
  { code: 'K719', name: '鼠径ヘルニア手術', point: 1240 },
  { code: 'K721', name: '大腿ヘルニア手術', point: 1350 },
  { code: 'K719-2', name: '内視鏡下鼠径ヘルニア手術', point: 2400 },
];

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CodeEntry[]>([]);

  const handleSearch = () => {
    // 実際はAPIを叩く予定だが、今はダミーでフィルター
    const filtered = MOCK_DATA.filter(entry =>
      entry.name.includes(query) || entry.code.includes(query)
    );
    setResults(filtered);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>診療報酬コードビューア</h1>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="例: ヘルニア, K719"
        style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
      />
      <button onClick={handleSearch}>検索</button>

      <div style={{ marginTop: '2rem' }}>
        {results.length === 0 ? (
          <p>該当なし</p>
        ) : (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>コード</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>名称</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>点数</th>
              </tr>
            </thead>
            <tbody>
              {results.map(entry => (
                <tr key={entry.code}>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{entry.code}</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{entry.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{entry.point}</td>
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