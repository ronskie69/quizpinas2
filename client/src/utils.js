export default {
    shuffleQuestions: (questions) => {
        if(questions.length == 0){
            return;
        }
        for(let i= questions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions;
    }
}