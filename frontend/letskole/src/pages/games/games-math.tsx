import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import apiRewards from "../../api/api.reward";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import { ApplicationUserResponse } from "../../models/auth/application-user-response";
import { RewardUser } from "../../models/RewardUser";

const MathGame = () => {
    const [score, setScore] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [answer, setAnswer] = useState('');
    const [numberOne, setNumberOne] = useState(0);
    const [numberTwo, setNumberTwo] = useState(0);
    const [operator, setOperator] = useState('');
    const history = useHistory();
    const appUserData:ApplicationUserResponse = Object.assign(new ApplicationUserResponse,
        JSON.parse(localStorage.getItem('appUserData')));  
    
    useEffect(() => {
        generateProblem()
    }, []);

    function generateProblem(){
        setNumberOne(generateNumber(10));
        setNumberTwo(generateNumber(10));
        setOperator(['+', '-', 'x'][generateNumber(2)])
    }
    
    function generateNumber(max){
        return Math.floor(Math.random() * (max + 1))
    }

    function checkLogic(){
        if(score === 10){
            let rewardUser: RewardUser = new RewardUser();
            rewardUser.rewardId = 3
            rewardUser.userId = appUserData.userId

            apiRewards.post(rewardUser)

            window.alert("Has ganado")
            history.push(`/logros/list/${appUserData.userId}`)

        }
        else if(wrongAnswers === 2){
            window.alert("Has perdido, vuelve a intentarlo")
            history.push("/games/list")
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        let correctAnswer 
        
        if(operator == "+") correctAnswer = numberOne + numberTwo
        if(operator == "-") correctAnswer = numberOne - numberTwo
        if(operator == "x") correctAnswer = numberOne * numberTwo
        
        if(parseInt(answer, 10) === correctAnswer){
            setScore(score + 1)
            generateProblem()
        } else{
            setWrongAnswers(wrongAnswers + 1)
        }
        checkLogic()
    }

    return (
        <div >
            <p>{numberOne} {operator} {numberTwo}</p>
            <form action="" onSubmit={handleSubmit}>
                <CustomTextField
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    label="Respuesta"
                  />
                <button>Submit</button>
            </form>
            <p>Necesitas ganar {10-score} y solo tienes {3-wrongAnswers} oportunidades</p>
        </div>
    )
}

export default MathGame
