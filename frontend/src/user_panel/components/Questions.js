import React, { useState, useEffect } from 'react';
import {
  Search, Keyboard, ChevronDown, ChevronUp, ChevronLeft, ChevronRight
} from 'lucide-react';
import { FaTimes } from 'react-icons/fa';
import { getTypes, postQuestion, QuestionTrue } from '../../services/api';



const Sidebar = ({ categories, selectedCategory, onCategorySelect, onAskQuestion }) => {
  return (
    <div className="sidebar-questions">
      <button className="ask-question-btn" onClick={onAskQuestion}>
        Сұрақ қою
      </button>
      <div className="categories-scroll">
        <div
          className={`category-item ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          Барлығы
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Delete'],
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
    ['ә', 'і', 'ң', 'ғ', 'ү', 'ұ', 'қ', 'ө', 'һ']
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleKeyClick = (key) => {
    if (key === 'Delete') {
      setSearchQuery(prev => prev.slice(0, -1));
    } else {
      setSearchQuery(prev => prev + key);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Кілт сөздер арқылы іздеу"
          className="search-input"
        />
        <div className="search-icons">
          <Keyboard className="keyboard-icon" onClick={() => setShowKeyboard(!showKeyboard)} />
          <div className="divider" />
          <Search className="search-icon" onClick={onSearch} />
        </div>
      </div>
      {!isMobile && showKeyboard && (
        <div className="virtual-keyboard">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map(key => (
                <button
                  key={key}
                  className={`keyboard-key ${key === 'Delete' ? 'delete-key' : ''}`}
                  onClick={() => handleKeyClick(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuestionItem = ({ question }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullName = `${question.Name} ${question.LastName}`;
  const questionText = question.Question;
  const answer = question.Answer?.answer;
  const category = question.Answer?.Type?.title;
  const date = question.Answer?.createdAt
    ? new Date(question.Answer.createdAt).toISOString().split('T')[0]
    : 'Дата жоқ';

  return (
    <div className={`question-item ${isExpanded ? 'expanded' : ''} border p-4 rounded-md shadow-sm bg-white mb-4`}>
      <div className="question-header">
        <div className="question-meta text-sm text-gray-500 mb-1">
          <span className="date mr-4">{date}</span>
          <span className="author font-semibold">{fullName}</span>
          {category && (
            <div className="category-tag bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs ml-4 inline-block">
              {category}
            </div>
          )}
        </div>
        <div className="question-content text-gray-800 font-medium">{questionText}</div>
      </div>

      {answer && (
        <>
          <button
            className="toggle-answer flex items-center text-sm text-blue-600 mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="mr-2">{isExpanded ? 'Жауапты жасыру' : 'Жауапты көрсету'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isExpanded && (
            <div className="answer visible mt-2 text-gray-700">
              {answer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const AskQuestionModal = ({ isOpen, onClose, setIsModalOpen, onQuestionSubmitted }) => {
  const [form, setForm] = useState({
    Name: '',
    LastName: '',
    Question: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postQuestion(form);

      if (res.newQuestion) {
        alert("Сұрақ сәтті жіберілді!");
        setForm({ Name: '', LastName: '', Question: '' });
        onClose();
        // Refresh questions list after submission
        if (onQuestionSubmitted) {
          onQuestionSubmitted();
        }
      }
    } catch (error) {
      alert("Сұрақты жіберу кезінде қате болды.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <h2>Сұрақ қою</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Аты"
            value={form.Name}
            onChange={(e) => setForm({ ...form, Name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Тегі"
            value={form.LastName}
            onChange={(e) => setForm({ ...form, LastName: e.target.value })}
            required
          />
          <textarea
            placeholder="Сұрағыңыз"
            value={form.Question}
            onChange={(e) => setForm({ ...form, Question: e.target.value })}
            required
          />
          <button type="submit">Жіберу</button>
        </form>
      </div>
    </div>
  );
};

export default function Questions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const questionsPerPage = 10;

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const typeResponse = await getTypes();
        if (typeResponse.types) {
          setCategories(typeResponse.types);
        }
      } catch (error) {
        console.error("Ошибка при загрузке категорий", error);
      }
    };

    loadCategories();
  }, []);

  // Function to fetch questions with filters
  const fetchQuestions = async (filters = {}) => {
    try {
      setIsLoading(true);
      const response = await QuestionTrue(filters);

      if (response && response.questions) {
        setQuestions(response.questions);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке вопросов", error);
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle search
  const handleSearch = () => {
    const filters = {};

    if (searchQuery.trim()) {
      filters.query = searchQuery.trim();
    }

    if (selectedCategory) {
      filters.typeId = selectedCategory;
    }

    setCurrentPage(1); // Reset to first page on search
    fetchQuestions(filters);
  };

  // Apply filters when category changes
  useEffect(() => {
    const filters = {};

    if (searchQuery.trim()) {
      filters.query = searchQuery.trim();
    }

    if (selectedCategory) {
      filters.typeId = selectedCategory;
    }

    setCurrentPage(1);
    fetchQuestions(filters);
  }, [selectedCategory]);

  // Calculate pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  return (
    <div className="questions-container flex">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onAskQuestion={() => setIsModalOpen(true)}
      />
      <div className="content-questions w-full p-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {isLoading ? (
          <div className="loading-indicator text-center py-8">Жүктелуде...</div>
        ) : questions.length === 0 ? (
          <div className="no-results text-center py-8">Сұрақтар табылмады</div>
        ) : (
          <div className="questions-list mt-4">
            {currentQuestions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </div>
        )}

        {questions.length > 0 && totalPages > 1 && (
          <div className="pagination flex justify-center items-center gap-2 mt-4">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
        onQuestionSubmitted={() => fetchQuestions({
          ...(selectedCategory && { typeId: selectedCategory }),
          ...(searchQuery.trim() && { query: searchQuery.trim() })
        })}
      />
    </div>
  );
}