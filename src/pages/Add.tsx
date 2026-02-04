import React from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type movies = {
  id: number,
  title: string,
  poster: string,
  duration: number,
  category: "Hành Động" | "Kinh Dị" | "Hài kịch"

}

function AddPage() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<movies>()

  const onSubmit = async (data: movies) => {
    try {
      await axios.post(`  http://localhost:3000/movies`, data);
      toast.success("thêm mới thành công");
      nav("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Text
          </label>
          <input
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            darution
          </label>
          <input
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("duration", {
              required: true,
            })}
          />
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
        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Select - option
          </label>
          <select
            id="selectOption"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("category", {
              required: true
            })}
          >
            <option value="Hành Động">Hành Động</option>
            <option value="Kinh Dị">Kinh Dị</option>
            <option value="Hài kịch">Hài kịch</option>
          </select>
        </div>

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

export default AddPage;
