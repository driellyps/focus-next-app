import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentXp: number; 
  challengesCompleted: number; 
  activeChallenge: Challenge;
  xpToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentXp', String(currentXp))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentXp, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play;

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return
    }

    const { amount } = activeChallenge;

    let finalXp = currentXp + amount;

    if(finalXp >= xpToNextLevel) {
      finalXp -= xpToNextLevel
      levelUp();
    }

    setCurrentXp(finalXp)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level,
        currentXp, 
        challengesCompleted,
        activeChallenge, 
        xpToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeModal
      }}>
      {children}

      {isModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}