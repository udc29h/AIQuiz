import { useState } from "react";
import { resultInitialState } from "./assets/question";



const Quiz=({questions})=>
{
    const [currentQuestion,setcurrentQuestion]=useState(0);
    const [answerIdx,setAnswerIdx]=useState(null);
    const {question,choices,correctAnswer}=questions[currentQuestion];
    const [answer,setAnswer]=useState(null);
    const [result,setResult]=useState(resultInitialState);
    const [showResult,setshowResult]=useState(false);

    const onChoiceClick=(answer,index)=>{
        setAnswerIdx(index);
        if(answer===correctAnswer)
        {
            setAnswer(true);
        }else{ setAnswer(false);}
    }

    const onClickNext=()=>{
        setAnswerIdx(null);
        setResult(
            (prev)=>answer?
            {
                ...prev,
                score: prev.score+5,
                correctAnswers:prev.correctAnswers+1,
            }:
            {
                ...prev,
                wrongAnswers:prev.wrongAnswers+1
            }
        );

        if(currentQuestion!==questions.length-1)
        {
            setcurrentQuestion((prev)=>prev+1);
        }else{
            setcurrentQuestion(0);
            setshowResult(true);
        }
    }

    const onTryAgain=()=>
    {
        setResult(resultInitialState);
        setshowResult(false);
        setcurrentQuestion(0);
    }
    return (
        <div className="quiz-container">
            {!showResult?(
                 <>
                 <span> <div className="current-question">{currentQuestion+1}</div>
                 <div className="total-question">/{questions.length}</div></span>
                 <h1>{question}</h1>
                 <ul>
                  {
                      choices.map((answer,index)=>(
                          
                          <li
                           onClick={()=>onChoiceClick(answer,index)} key={answer}
                           className={answerIdx===index?'selected-answer':null}
                          >{answer}</li>
                      ))
                  }
                 </ul>
                 <div className="footer">
                  <button onClick={onClickNext} disabled={answerIdx===null}>
                      {currentQuestion===questions.length-1? "Finish": " Next"}
                  </button>
                 </div>
                 </>
            ):(<div>
                
                <h1>Result</h1>
                    <h2>
                        Total Questions : <span style={{display:'inline-block'}}>{questions.length}</span>
                    </h2>
                    <h2>
                        Correct Answers : <span style={{display:'inline-block'}}>{result.correctAnswers}</span>
                    </h2>
                    <h2>
                        Score : <span style={{display:'inline-block'}}>{result.score}</span>
                    </h2>
                    <h2>
                        Wrong Answers : <span style={{display:'inline-block'}}>{result.wrongAnswers}</span>
                    </h2>
                    <button onClick={onTryAgain}>TryAgain</button>
                 </div>)}
           
        </div>
    );
}

export default Quiz;