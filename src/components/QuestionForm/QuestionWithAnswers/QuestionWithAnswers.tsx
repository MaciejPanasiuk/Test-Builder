import './QuestionWithAnswers.scss'

function QuestionWithAnswers({children}:any) {
  
  return (
    <div className='QWAContainer'>
        {children}
    </div>
  );
}
export default QuestionWithAnswers;
