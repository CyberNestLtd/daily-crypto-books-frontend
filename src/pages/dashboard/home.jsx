import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, CardHeader, CardBody, Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { DashboardNavbar } from "@/widgets/layout";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  let baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/book/books`, getAuthHeaders());
      setBooks(response.data?.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(`${baseUrl}/api/book/delete/${id}`, getAuthHeaders());
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="mt-12 px-6">
      <DashboardNavbar />
      <Card className="border border-blue-gray-200 shadow-lg rounded-lg overflow-hidden">
        <CardHeader floated={false} shadow={false} className="bg-blue-500 text-white p-6 flex justify-between items-center">
          <Typography variant="h6">📚 Books List</Typography>
          <Button color="white" className="text-blue-500 font-bold shadow-md" onClick={() => navigate("/books/new")}>
            + Add New Book
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                {["Book Name", "Author", "Genre", "Published Year", "Actions"].map((el) => (
                  <th key={el} className="py-3 px-6 text-left border-b font-medium">
                    {el}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map(({ _id, name, author, genre, year }, index) => (
                  <tr key={_id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                    <td className="py-4 px-6">{name}</td>
                    <td className="py-4 px-6">{author}</td>
                    <td className="py-4 px-6">{genre}</td>
                    <td className="py-4 px-6">{year}</td>
                    <td className="py-4 px-6 flex gap-3">
                      <IconButton size="sm" color="green" onClick={() => navigate(`/books/edit/${_id}`)}>
                        <PencilIcon className="h-5 w-5" />
                      </IconButton>
                      <IconButton size="sm" color="red" onClick={() => handleDelete(_id)}>
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">No books available</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Home;
