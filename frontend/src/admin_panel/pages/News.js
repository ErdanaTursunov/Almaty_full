import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { deleteNews, getNews, patchNews, postNews } from '../../services/api';

const FormContainer = styled.form`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
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

const NewsCard = styled.div`
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f9f9f9;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  margin-top: 10px;
  border-radius: 4px;
`;

const NewsImage = styled.img`
  max-width: 100%;
  height: 100px;
  margin: 10px 0;
  border-radius: 4px;

`;

function News() {
  const [formData, setFormData] = useState({
    NewsName: '',
    date: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [newses, setNewses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      submitFormData.append('NewsName', formData.NewsName);
      submitFormData.append('date', formData.date);
      submitFormData.append('description', formData.description);
      if (selectedFile) {
        submitFormData.append('image', selectedFile);
      }

      if (editId) {
        const response = await patchNews({ id: editId, formData: submitFormData });
        if (response?.news) {
          alert('Новость успешно обновлена');
          setNewses(prev =>
            prev.map(news => (news.id === editId ? response.news : news))
          );
          setEditId(null);
          setOriginalData(null);
        }
      } else {
        const response = await postNews(submitFormData);
        if (response?.news) {
          alert('Новость успешно создана');
          setNewses(prev => [response.news, ...prev]);
        }
      }

      setFormData({
        NewsName: '',
        date: '',
        description: '',
      });
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (error) {
      alert('Ошибка при сохранении новости');
      console.log('Ошибка:', error);
    }
  };

  const handleEdit = (news) => {
    setFormData({
      NewsName: news.NewsName,
      date: news.date,
      description: news.description,
    });
    if (news.img_url) {
      setPreviewUrl(news.img_url);
    }
    setOriginalData(news);
    setEditId(news.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить эту новость?')) {
      try {
        await deleteNews(id);
        setNewses(prev => prev.filter(news => news.id !== id));
        alert('Новость удалена');
      } catch (error) {
        alert('Ошибка при удалении');
        console.log(error);
      }
    }
  };

  const cancelEdit = () => {
    setFormData({
      NewsName: '',
      date: '',
      description: '',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setEditId(null);
    setOriginalData(null);
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await getNews();
        if (response.news) {
          // Сортируем новости по дате (новые сверху)
          const sortedNews = response.news.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
          );
          setNewses(sortedNews);
        }
      } catch (error) {
        console.log('Ошибка в loadNews', error);
      }
    };

    loadNews();
  }, []);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <label>Заголовок</label>
        <input 
          type="text" 
          name="NewsName" 
          value={formData.NewsName} 
          onChange={handleChange}
          required 
        />
      </FormGroup>

      <FormGroup>
        <label>Дата</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
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
          required={!editId} 
        />
        {previewUrl && (
          <ImagePreview src={previewUrl} alt="Preview" />
        )}
      </FormGroup>

      <FormGroup>
        <label>Описание</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange}
          required 
        />
      </FormGroup>

      <Button type="submit">{editId ? 'Обновить' : 'Сохранить'}</Button>
      {editId && <Button type="button" onClick={cancelEdit}>Отмена</Button>}

      <h3 style={{ marginTop: '30px' }}>Список новостей</h3>
      {newses.length > 0 ? (
        newses.map((news) => (
          <NewsCard key={news.id}>
            <strong>{news.NewsName}</strong><br />
            <small>{new Date(news.date).toLocaleDateString('ru-RU')}</small><br />
            {news.img_url && (
              <NewsImage  src={`${process.env.REACT_APP_API_URL}${news.img_url}`}  alt={news.NewsName} />
            )}
            <p>{news.description}</p>
            <Button type="button" onClick={() => handleEdit(news)}>Редактировать</Button>
            <Button type="button" style={{ backgroundColor: 'red' }} onClick={() => handleDelete(news.id)}>Удалить</Button>
          </NewsCard>
        ))
      ) : (
        <p>Новостей нет</p>
      )}
    </FormContainer>
  );
}

export default News;
