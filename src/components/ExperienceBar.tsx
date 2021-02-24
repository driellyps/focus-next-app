import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentXp, xpToNextLevel } = useContext(ChallengesContext)

  const percentage = Math.round(currentXp * 100) / xpToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentage}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentage}%` }}>{currentXp} xp</span>
      </div>
      <span>{xpToNextLevel} xp</span>
    </header>
  )
}