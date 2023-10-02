import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from './quiz'
import { jsQuizz } from './assets/question'

function App() {
  return (
  <Quiz questions={jsQuizz.questions}/>
  );
}

export default App
