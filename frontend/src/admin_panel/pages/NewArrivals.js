import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { postBooks, getBooks, deleteBook, patchBook } from '../../services/api';

const FormContainer = styled.form`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BookList = styled.div`
  max-width: 800px;
  margin: 40px auto;
`;

const BookItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display:flex;
  align-items: center;
  gap: 10px;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  margin-top: 10px;
  border-radius: 4px;
`;


function NewArrivals() {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    author: '',
    year: '',
    Genr: '',
  });

  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      if (response?.books) {
        setBooks(response.books);
      }
    } catch (error) {
      console.error('Ошибка при получении списка книг:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('quantity', formData.quantity);
      submitFormData.append('author', formData.author);
      submitFormData.append('year', formData.year);
      submitFormData.append('Genr', formData.Genr);
      if (selectedFile) {
        submitFormData.append('image', selectedFile);
      }

      if (editingId) {
        const response = await patchBook({ id: editingId, formData: submitFormData });
        if (response?.book) {
          alert("Книга обновлена");
          fetchBooks();
        }
      } else {
        const response = await postBooks({formData:submitFormData});
        if (response?.book) {
          alert("Книга успешно создана");
          fetchBooks();
        }
      }

      setFormData({ title: '', quantity: '', author: '', year: '', Genr: '' });
      setSelectedFile(null);
      setPreviewUrl('');
      setEditingId(null);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert("Произошла ошибка");
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (error) {
        alert("Ошибка при удалении");
      }
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book.id);
    if (book.img_url) {
      setPreviewUrl(book.img_url);
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <label>Название книги</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            required 
          />
        </FormGroup>
        <FormGroup>
          <label>Автор</label>
          <input 
            type="text" 
            name="author" 
            value={formData.author} 
            onChange={handleChange}
            required 
          />
        </FormGroup>
        <FormGroup>
          <label>Год издания</label>
          <input 
            type="number" 
            name="year" 
            value={formData.year} 
            onChange={handleChange}
            required 
          />
        </FormGroup>
        <FormGroup>
          <label>Количество</label>
          <input 
            type="number" 
            name="quantity" 
            value={formData.quantity} 
            onChange={handleChange}
            required 
          />
        </FormGroup>
        <FormGroup>
          <label>Жанр</label>
          <input 
            type="text" 
            name="Genr" 
            value={formData.Genr} 
            onChange={handleChange}
            required 
          />
        </FormGroup>
        <FormGroup>
          <label>Изображение</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            required={!editingId} 
          />
          {previewUrl && (
            <ImagePreview src={previewUrl} alt="Preview" />
          )}
        </FormGroup>
        <Button type="submit">{editingId ? 'Обновить' : 'Сохранить'}</Button>
        {editingId && <Button type="button" onClick={() => {
          setFormData({ title: '', quantity: '', author: '', year: '', Genr: '' });
          setSelectedFile(null);
          setPreviewUrl('');
          setEditingId(null);
        }}>Отмена</Button>}
      </FormContainer>

      <BookList>
        {books.length > 0 ? (
          books.map(book => (
            <BookItem key={book.id}>
              {book.img_url && (
                <img 
                  src={`${process.env.REACT_APP_API_URL}${book.img_url}`} 
                  alt={book.title} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <strong>{book.title}</strong> — {book.author} ({book.year})<br />
                Жанр: {book.Genr} — Кол-во: {book.quantity}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button onClick={() => handleEdit(book)}>Редактировать</Button>
                <Button onClick={() => handleDelete(book.id)} style={{ backgroundColor: 'red' }}>
                  Удалить
                </Button>
              </div>
            </BookItem>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Нет новых поступлений</p>
        )}
      </BookList>
    </>
  );
}

export default NewArrivals;
