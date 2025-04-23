import { useEffect, useState } from 'react';
import '../styles/style.css';
import {
    getQuestion,
    postAnswers,
    patchAnswers,
    deleteAnswers,
    deleteQuestion,
    getTypes
} from '../../services/api';

function AskLibrarian() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answerText, setAnswerText] = useState('');
    const [editingAnswerId, setEditingAnswerId] = useState(null);
    const [editingAnswerText, setEditingAnswerText] = useState('');
    const [types, setTypes] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState(null);

    const adminId = localStorage.getItem("adminId");

    useEffect(() => {
        const loadData = async () => {
            try {
                const questionResponse = await getQuestion();
                if (questionResponse.questions) {
                    setQuestions(questionResponse.questions);
                }

                const typeResponse = await getTypes();
                if (typeResponse.types) {
                    setTypes(typeResponse.types);
                }
            } catch (error) {
                console.error("Ошибка в отображении данных", error);
                alert("Произошла ошибка при загрузке данных");
            }
        };

        loadData();
    }, []);

    const refreshQuestions = async () => {
        const response = await getQuestion();
        setQuestions(response.questions);
        setSelectedQuestion(null);
        setAnswerText('');
        setEditingAnswerId(null);
        setEditingAnswerText('');
        setSelectedTypeId(null);
    };

    const handleSelectQuestion = (question) => {
        setSelectedQuestion(question);
        setAnswerText('');
        setSelectedTypeId(null);
    };

    const handleSendAnswer = async () => {
        if (!answerText.trim()) return alert("Введите ответ!");

        try {
            const formData = {
                questionId: selectedQuestion.id,
                answer: answerText,
                adminId: adminId,
                typeId: selectedTypeId
            };

            await postAnswers(formData);
            await refreshQuestions();
        } catch (error) {
            console.error("Ошибка при отправке ответа", error);
            alert("Ошибка при отправке ответа");
        }
    };

    const handleEditAnswer = (answer) => {
        setEditingAnswerId(answer.id);
        setEditingAnswerText(answer.answer);
        setSelectedTypeId(answer.typeId);
    };

    const handleSaveEditedAnswer = async () => {
        if (!editingAnswerText.trim()) return alert("Введите текст!");

        try {
            await patchAnswers({
                id: editingAnswerId,
                formData: {
                    answer: editingAnswerText,
                    typeId: selectedTypeId
                }
            });

            await refreshQuestions();
        } catch (error) {
            console.error("Ошибка при редактировании ответа", error);
            alert("Ошибка при редактировании ответа");
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот ответ?")) return;

        try {
            await deleteAnswers(answerId);
            await refreshQuestions();
        } catch (error) {
            console.error("Ошибка при удалении ответа", error);
            alert("Ошибка при удалении ответа");
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот вопрос?")) return;

        try {
            await deleteQuestion(questionId);
            await refreshQuestions();
        } catch (error) {
            console.error("Ошибка при удалении вопроса", error);
            alert("Ошибка при удалении вопроса");
        }
    };

    return (
        <div>
            <main className="content">
                <div className="questions-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Автор</th>
                                <th>Вопрос</th>
                                <th>Статус</th>
                                <th>Ответы</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.length > 0 ? (
                                questions.map(question => (
                                    <tr key={question.id}>
                                        <td>{question.Name} {question.LastName}</td>
                                        <td>{question.Question}</td>
                                        <td className={question.Answer ? 'status-answered' : 'status-not-answered'}>
                                            {question.Answer ? 'Отвечен' : 'Не отвечен'}
                                        </td>
                                        <td>
                                            {question.Answer ? (
                                                editingAnswerId === question.Answer.id ? (
                                                    <div className="edit-answer-popup">

                                                        <textarea
                                                            value={editingAnswerText}
                                                            onChange={(e) => setEditingAnswerText(e.target.value)}
                                                            style={{ width: '100%' }}
                                                        />
                                                        <select
                                                            value={selectedTypeId}
                                                            onChange={(e) => setSelectedTypeId(e.target.value)}
                                                            className="type-selector"
                                                        >
                                                            <option value="">Выберите тип</option>
                                                            {types.map((type) => (
                                                                <option key={type.id} value={type.id}>
                                                                    {type.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button onClick={handleSaveEditedAnswer} className="save-button">
                                                            Сохранить
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p>{question.Answer.answer}</p>
                                                        <p>Тип: {question.Answer.Type?.title || 'Не указан'}</p>
                                                        <div className="answer-actions">
                                                            <button
                                                                onClick={() => handleEditAnswer(question.Answer)}
                                                                className="edit-button"
                                                            >
                                                                Редактировать
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteAnswer(question.Answer.id)}
                                                                className="delete-btn"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    </>
                                                )
                                            ) : (
                                                <p>Нет ответа</p>
                                            )}
                                        </td>
                                        <td>
                                            {!question.Answer && (
                                                <button
                                                    className="answer-button"
                                                    onClick={() => handleSelectQuestion(question)}
                                                >
                                                    Ответить
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteQuestion(question.id)}
                                                className="delete-btn"
                                            >
                                                Удалить
                                            </button>
                                        </td>


                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Нет новых поступлений</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {selectedQuestion && (
                    <div className="answer-form" id="answerForm">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Ответ библиотекаря</h2>
                            <button onClick={() => setSelectedQuestion(null)} className="close-button">
                                ✖
                            </button>
                        </div>
                        <p className="question-text">{selectedQuestion.Question}</p>
                        <textarea
                            value={answerText}
                            placeholder="Введите ответ..."
                            onChange={(e) => setAnswerText(e.target.value)}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                        />
                        <select
                            value={selectedTypeId}
                            onChange={(e) => setSelectedTypeId(e.target.value)}
                            className="type-selector"
                        >
                            <option value="">Выберите тип</option>
                            {types.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.title}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="save-button"
                            onClick={handleSendAnswer}
                        >
                            Отправить
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AskLibrarian;
