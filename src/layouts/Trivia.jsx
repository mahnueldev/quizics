import React, { useEffect, useState } from 'react';
import { Button, CheckMark, HText, Label } from '../components';
import {} from '../layouts';
import { getQuestions } from '../features/questions/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Trivia = () => {
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
  const [showResult, setShowResult] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  // Handle states
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handleFinish = () => {
    setShowResult(true);
    renderResult();
    setShowButton(false);
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
      const options = [
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers,
      ];
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
              <div
                key={option}
                className={`my-4 drop-shadow-md bg-light-100 rounded-lg p-6 xl:w-2/6 sm:w-4/6 ${
                  selectedOption === option
                    ? 'bg-green-300 border-green-500 transform translate-x-5'
                    : ''
                }`}
              >
                <label
                  htmlFor={option}
                  className='flex items-center cursor-pointer'
                >
                  <span
                    className={` w-4 h-4 rounded-full  border border-gray-500 mr-2 flex items-center justify-center transition duration-200 ease-in-out ${
                      selectedOption === option
                        ? 'bg-green-500 border-green-500'
                        : ''
                    }`}
                  >
                    {selectedOption === option && <CheckMark />}
                  </span>
                  <input
                    type='radio'
                    name='option'
                    id={option}
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                    className='opacity-0 absolute h-0 w-0 '
                  />
                  <span className='ml-2 text-dark-300 xl:text-lg sm:text-sm'>
                    {option}
                  </span>
                </label>
              </div>
            ))}
        </div>
      );
    } else {
      return <div>No questions found</div>;
    }
  };

  const renderResult = () => {
    const numCorrectAnswers = questions.filter(
      (question) => question.correctAnswer === question.selectedOption
    ).length;
    return (
      <div>
        <p>
          You answered {numCorrectAnswers} out of {questions.length} questions
          correctly!
        </p>
        <br />
        <Button
          onClick={() => window.location.reload()}
          text='PLAY AGAIN'
          bgCol='bg-green-300'
          textCol='text-light-100'
        />
      </div>
    );
  };

  if (questionsStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (questionsStatus === 'failed') {
    return <div>Error: {error}</div>;
  } else {
    return (
      <section>
        <div className='mb-4'>
          {showResult ? renderResult() : renderQuestion()}
        </div>
        <br />
        <br />
        {currentQuestionIndex < questions.length - 1 ? (
          <Button
            onClick={handleNextQuestion}
            text='Next'
            bgCol='bg-green-300'
            textCol='text-light-100'
          />
        ) : showButton ? (
          <Button
            onClick={handleFinish}
            text='Finish'
            bgCol='bg-red-300'
            textCol='text-light-100'
          />
        ) : null}
      </section>
    );
  }
};

export default Trivia;
