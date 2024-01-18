import React, { useState, useEffect } from 'react';
import './style.css';
import { PerguntasEasy } from '../Data/perguntasEasy';
import { PerguntasNormal } from '../Data/perguntasNormal';
import { PerguntasHard } from '../Data/perguntasHard';
import imgQuiz from './quiz.png'

const Quizz = () => {
  const [nivelSelecionado, setNivelSelecionado] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [showPontuacao, setShowPontuacao] = useState(false);
  const [pontos, setPontos] = useState(0);

  useEffect(() => {
    let perguntasNivel;
    if (nivelSelecionado === 'easy') {
      perguntasNivel = PerguntasEasy;
    } else if (nivelSelecionado === 'normal') {
      perguntasNivel = PerguntasNormal;
    } else if (nivelSelecionado === 'hard') {
      perguntasNivel = PerguntasHard;
    }

    if (perguntasNivel) {
      setQuestions(perguntasNivel);
    }
  }, [nivelSelecionado]);

  useEffect(() => {
    // Adicionando confetes quando a pontuação é exibida
    if (showPontuacao) {
      const confettiContainer = document.querySelector('.confetti-container');

      function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight / 3 + 'px';
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }

      const confettiInterval = setInterval(createConfetti, 200);
      
      setTimeout(() => {
        clearInterval(confettiInterval);
      }, 5000);
    }
  }, [showPontuacao]);

  function proximaPergunta(correta) {
    const nextQuestion = perguntaAtual + 1;

    if (correta) {
      setPontos(pontos + 1);
    }

    if (nextQuestion < questions.length) {
      setPerguntaAtual(nextQuestion);
    } else {
      setShowPontuacao(true);
    }
  }

  function handleNivelSelecionado(nivel) {
    setNivelSelecionado(nivel);
    setPerguntaAtual(0);
    setShowPontuacao(false);
    setPontos(0);
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function reiniciarQuiz() {
    setPerguntaAtual(0);
    setShowPontuacao(false);
    setPontos(0);
  }

  // Tela inicial com seleção de nível
  if (!nivelSelecionado) {
    return (
      
      <div className='nivelSelecao'>
        <img className="imagemQuiz" src={imgQuiz} alt="Descrição da imagem de fundo" />
        <h1>SUPER QUIZ HTML-CSS</h1>
        <h3>Selecione o Nível de Dificuldade</h3>
        <button onClick={() => handleNivelSelecionado('easy')}>Easy</button>
        <button onClick={() => handleNivelSelecionado('normal')}>Normal</button>
        <button onClick={() => handleNivelSelecionado('hard')}>Hard</button>
      </div>
    );
  }

  // Tela do quiz
  return (
    <div>
      <img className="imagemQuiz" src={imgQuiz} alt="Descrição da imagem de fundo" />
      <div className='container'>
        {showPontuacao ? (
          <div className='pontuacao'>
            <span>Você acertou: {pontos} perguntas de {questions.length} possíveis</span>
          </div>
        ) : (
          <>
            <div className='infoperguntas'>
              <div className='contagemPerguntas'>
                <span>Pergunta {perguntaAtual + 1}/{questions.length}</span>
              </div>
              <div className='pergunta'>{questions[perguntaAtual]?.pergunta}</div>
            </div>
            <div className='resposta'>
              {questions[perguntaAtual]?.opcoesResposta.map((opcoesResposta) => (
                <div className='grupoResposta' key={opcoesResposta.alternativa}>
                  <span>{opcoesResposta.alternativa}</span>
                  <button onClick={() => proximaPergunta(opcoesResposta.correta)}>
                    {opcoesResposta.resposta}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="confetti-container"></div>

      {/* Botões fora das divs principais */}
      {showPontuacao && (
        
        <div className='botoesFinais'>
          <button onClick={reiniciarQuiz}>Reiniciar Quiz</button>
          <button onClick={() => setNivelSelecionado(null)}>Escolher Novo Nível</button>
        </div>
      )}
    </div>
  );
};

export default Quizz;
