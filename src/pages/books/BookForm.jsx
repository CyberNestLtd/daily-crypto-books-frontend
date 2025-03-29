import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";

const BookForm = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    author: "",
    genre: "",
    year: "",
  });
  let baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  const fetchBook = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/book/${id}`, getAuthHeaders());
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.post(`${baseUrl}/api/book/edit/${id}`, book, getAuthHeaders());
      } else {
        await axios.post(`${baseUrl}/api/book/create`, book, getAuthHeaders());
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div className="mt-12 flex justify-center">
      <Card className="w-96 p-6">
        <CardBody>
          <Typography variant="h5" className="mb-4">
            {id ? "Edit Book" : "Add New Book"}
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Book Name" name="name" value={book.name} onChange={handleChange} required />
            <Input label="Author" name="author" value={book.author} onChange={handleChange} required />
            <Input label="Genre" name="genre" value={book.genre} onChange={handleChange} required />
            <Input label="Published Year" name="year" value={book.year} onChange={handleChange} required type="number" />
            <Button type="submit" color="blue">{id ? "Update Book" : "Create Book"}</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookForm;
