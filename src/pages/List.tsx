import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
type movies = {
  id: number,
  title: string,
  poster: string,
  duration: number,
  category: "Hành Động" | "Kinh Dị" | "Hài kịch"

}
function ListPage() {
  const [movies, setMovies] = useState<movies[]>([]);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/movies");
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovie();
  }, []);

  const hanldeDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      alert("xóa thành công");
      setMovies(movies.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto" >
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">tên</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                danh mục
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                khóa học
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                ảnh
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {movies.map((item) => {
              return (
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{item.title}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.category}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.duration}</td>
                  <td className="px-4 py-2 border border-gray-300"><img src={item.poster} alt="" /></td>
                  <td className="px-4 py-2 border border-gray-300">
                    <Link to={`/edit/${item.id}`}>sửa</Link>
                    <button onClick={() => { hanldeDelete(item.id) }}> xóa</button>
                  </td>
                </tr>);
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
