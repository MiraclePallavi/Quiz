import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../Assets/data'
const Quiz = () => {
  let [index, setindex] = useState(0);
  const [question,setquestion]= useState(data[index]);
  const [lock, setlock] = useState(false);
  let [score,setscore] = useState(0);
  let [result, setresult] = useState(false);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option_arr = [option1,option2,option3,option4];
  const checkAns = (e,ans)=>{
    if(lock===false){

      if(question.ans===ans){
        e.target.classList.add("correct");
        setlock(true);
        setscore(prev=>prev+1);
      }
      else{
        e.target.classList.add("wrong");
        setlock(true);
        option_arr[question.ans-1].current.classList.add("correct");
      }
  }
}
const nest = () => {
if(lock===true){
  if(index===data.length-1){
    setresult(true);
    return 0;
  }
  setindex(++index);
  setquestion(data[index]);
  setlock(false);
  option_arr.map((option)=>{
    option.current.classList.remove("wrong");
    option.current.classList.remove("correct");
  })
}
}
const reset=()=>{
      setindex(0);
      setquestion(data[0]);
      setscore(0);
      setlock(false);
      setresult(false);
}
  return (

    <div>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<>
        <h2>{index+1}.{question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li >
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={nest}>Next</button>
        <div className="index">{index+1} of {data.length} Q</div>
        </>}
        {result?<><h2>You scored {score} out of {data.length}</h2>
       <button onClick={reset}>Reset</button></>:<></>}
       
      </div>
    </div>
  )
}

export default Quiz
