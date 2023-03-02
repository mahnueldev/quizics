import React, { useEffect, useState } from 'react';
import { Button, HText, Label } from '../components';
import {} from '../layouts';
import { getQuestions } from '../features/questions/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const questionsStatus = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
 
  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  // Handle states
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const shuffleArray = (array) => {
    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // const options = shuffleArray([...incorrectAnswers, correctAnswer]);
  const renderQuestion = () => {
    if (currentQuestion) {
      
      const options = shuffleArray([currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers]);
      return (
        <div key={currentQuestion.id}>
          <Label
            text={currentQuestion.category}
            bgCol='bg-blue-100'
            textCol='text-blue-200'
          />
          <HText text={currentQuestion.question} />
          {currentQuestion.type === 'Multiple Choice' &&
            options.map((option) => (
              <div key={option}>
                <input
                  type='radio'
                  name='option'
                  id={option}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
        </div>
      );
    } else {
      return <div>No questions found</div>;
    }
  };

  if (questionsStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (questionsStatus === 'failed') {
    return <div>Error: {error}</div>;
  } else {
    return (
      <section className='ml-32 mt-20 '>
        <div className='mb-4'>{renderQuestion()}</div>
        <br />
        <br />
        {currentQuestionIndex < questions.length - 1 && (
          <Button
            onClick={handleNextQuestion}
            text='Next'
            bgCol='bg-green-300'
            textCol='text-light-100'
          />
          // <button onClick={handleNextQuestion}>Next</button>
        )}
      </section>
    );
  }
};

export default Home;
