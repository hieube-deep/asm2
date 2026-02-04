import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

type movies = {
  id: number,
  title: string,
  poster: string,
  duration: number,
  category: "Hành Động" | "Kinh Dị" | "Hài kịch"

}

function EditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<movies>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/movies/${id}`);
        reset(data)
      } catch (error) {
        console.log(error);
      }

    }
    if (id) {
      fetchMovie();
    }
  }, [id, reset])

  const onSubmit = async (data: movies) => {
    try {
      await axios.put(`http://localhost:3000/movies/${id}`, data);
      toast.success("sửa mới thành công");
      nav("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">sửa</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Text
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            {...register("title", {
              required: "Tên phim không được để trống",
              minLength: {
                value: 3,
                message: "Tên phim phải có ít nhất 3 ký tự",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            darution
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            {...register("duration", {
              required: "Thời lượng không được để trống",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Thời lượng phải ≥ 0",
              },
            })}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}

        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            poster
          </label>
          <input
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("poster", {
              required: true
            })}
          />
        </div>

        {/* Select */}
        <select
          className="w-full border rounded-lg px-3 py-2"
          {...register("category", {
            required: "Vui lòng chọn thể loại phim",
          })}
        >
          <option value="">-- Chọn thể loại --</option>
          <option value="Hành động">Hành động</option>
          <option value="Viễn Tưởng">Viễn Tưởng</option>
          <option value="Hoạt Hình">Hoạt Hình</option>
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}


        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPage;
