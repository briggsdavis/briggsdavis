import { createContext, useContext } from "react"

const HeroIntroContext = createContext(false)

export const HeroIntroProvider = HeroIntroContext.Provider

export const useHeroIntro = () => useContext(HeroIntroContext)
