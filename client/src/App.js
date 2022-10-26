import { useContext, useEffect, useState } from 'react';
import Card from './components/Card';
import FrontPage from './pages/FrontPage';
import QuizApp from './pages/QuizApp';
import LastPage from './pages/LastPage'
import {questions} from './questions'

import './App.css';
import './css/AnswerButton.css';
import { PContext } from './components/PlayerContext';
import Rankings from './pages/Rankings';

const shuffleQuestions= (questions) => {
  if(questions.length == 0){
      return;
  }
  for(let i= questions.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

function App() {

  const [ page, setPage ] = useState(0)
  const [ score, setScore ] = useState()

  const done = (corrects) => {
    setScore(corrects)
    setPage(3)
  }

  return (
    <div className="App">
      <Card>
        {
          page===0 &&
          <FrontPage onSetPage={setPage}/>
        }
        {
          page===1 &&
          <QuizApp done={done} questions ={shuffleQuestions(questions)}/>
        }
        {
          page===3 &&
          <LastPage score={score} next={setPage} questLength ={questions.length}/>
        }
        {
          page===4 &&
          <Rankings page={setPage}/>
        }
      </Card>
    </div>
  );
}

export default App;
