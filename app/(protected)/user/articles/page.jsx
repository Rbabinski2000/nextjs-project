'use client'
import { useState, useEffect } from "react";
import { DbCollectionArtGet } from "../../fireCollection";
import { useAuth } from "@/app/lib/AuthContext";


function ArticlesPage() {
  const { user } = useAuth();
  const [articless, setArticless] = useState([]); // Stan dla artykułów
  const [loading, setLoading] = useState(true); // Stan dla ładowania
  const [error, setError] = useState(null); // Stan dla błędów

  useEffect(() => {
    // Pobierz artykuły po zamontowaniu komponentu
    DbCollectionArtGet(user)
      .then((data) => {
        setArticless(data); // Przypisz dane do stanu
        setLoading(false); // Ustaw zakończenie ładowania
        //console.log(data)
      })
      .catch((err) => {
        setError(err.message); // Obsłuż błędy
        setLoading(false); // Ustaw zakończenie ładowania
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {articless.map((article, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{article.title}</td>
                <td className="border border-gray-300 px-4 py-2">{article.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticlesPage;
