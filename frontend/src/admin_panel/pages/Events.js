import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { deleteEvents, getEvents, patchEvents, postEvents } from '../../services/api';

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

const EventCard = styled.div`
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f9f9f9;
`;

function Events() {
  const [formData, setFormData] = useState({
    EventsName: '',
    date: '',
    description: '',
  });

  const [eventses, setEventses] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const response = await patchEvents({ id: editId, formData });
        if (response?.event) {
          setEventses(prev =>
            prev.map(ev => (ev.id === editId ? response.event : ev))
          );
          alert('Событие обновлено!');
        }
      } else {
        const response = await postEvents(formData);
        console.log('Response from server:', response); // для отладки

        if (response?.event) {
          // Добавляем новое событие в начало списка
          setEventses(prevEvents => {
            const updatedEvents = [{
              id: response.event.id,
              EventsName: response.event.EventsName,
              date: response.event.date,
              description: response.event.description
            }, ...prevEvents];

            // Сортируем события по дате
            return updatedEvents.sort((a, b) => 
              new Date(b.date) - new Date(a.date)
            );
          });
          
          alert('Событие создано!');
        }
      }

      // Очищаем форму
      setFormData({ EventsName: '', date: '', description: '' });
      setEditId(null);
    } catch (error) {
      alert('Ошибка при сохранении события');
      console.error('Error in handleSubmit:', error);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      EventsName: event.EventsName,
      date: event.date,
      description: event.description,
    });
    setEditId(event.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить это событие?')) {
      try {
        await deleteEvents(id);
        setEventses(prev => prev.filter(e => e.id !== id));
      } catch (error) {
        alert('Ошибка при удалении');
        console.log(error);
      }
    }
  };

  const cancelEdit = () => {
    setFormData({ EventsName: '', date: '', description: '' });
    setEditId(null);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await getEvents();
        console.log('Initial events load:', response); // для отладки

        if (response?.events) {
          const formattedEvents = response.events.map(event => ({
            id: event.id,
            EventsName: event.EventsName,
            date: event.date,
            description: event.description
          }));

          // Сортируем события по дате
          const sortedEvents = formattedEvents.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
          );

          setEventses(sortedEvents);
        }
      } catch (error) {
        console.error('Error in loadEvents:', error);
      }
    };

    loadEvents();
  }, []);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <label>Заголовок</label>
        <input 
          type="text" 
          name="EventsName" 
          value={formData.EventsName} 
          onChange={handleChange} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <label>Дата и Время</label>
        <input 
          type="datetime-local" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          required
        />
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

      <h3 style={{ marginTop: '30px' }}>Список событий</h3>
      {eventses.length > 0 ? (
        eventses.map((event) => (
          <EventCard key={event.id}>
            <strong>{event.EventsName}</strong><br />
            <small>{new Date(event.date).toLocaleString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</small><br />
            <p>{event.description}</p>
            <Button type="button" onClick={() => handleEdit(event)}>Редактировать</Button>
            <Button type="button" style={{ backgroundColor: 'red' }} onClick={() => handleDelete(event.id)}>Удалить</Button>
          </EventCard>
        ))
      ) : (
        <p>Событий нет</p>
      )}
    </FormContainer>
  );
}

export default Events;
