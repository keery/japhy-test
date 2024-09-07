import { defineStore } from 'pinia'

const SKIP_RULES_KEY_LOCAL_STORAGE = 'japhy-test'

export enum GameSteps {
  LOADING = 'LOADING',
  READY_TO_PLAY = 'READY_TO_PLAY',
  START_PLAYING = 'START_PLAYING',
  DISPLAY_RULES = 'DISPLAY_RULES',
  STOP_SHOWING_RULES = 'STOP_SHOWING_RULES',
  SHUFFLING = 'SHUFFLING',
  MAKE_A_CHOICE = 'MAKE_A_CHOICE',
  CHECKING_CHOICE = 'CHECKING_CHOICE',
  REVEAL = 'REVEAL',
  NEXT_ROUND = 'NEXT_ROUND',
  FINAL_RESULT = 'FINAL_RESULT',
  REPLAY = 'REPLAY'
}

export type EYES_COLOR = 'grey' | 'blue' | 'red'

// MESSAGES
const MESSAGE_IS_SHUFFLING = 'Laisse moi mélanger tout ça ...'
const MESSAGE_MAKE_A_CHOICE = 'Choisis le bon coquillage, réfléchis bien'
const MESSAGE_CONFIRM_CHOICE = "C'est ton dernier mot ?"
const MESSAGE_CHECKING_CHOICE = '...'
const MESSAGE_SUCCESS_1 = 'Oh mon dieu tu as trouvé la perle'
const MESSAGE_SUCCESS_2 = "Bien joué, est-ce que c'était un coup de chance ?"
const MESSAGE_SUCCESS_3 = 'Félicitation on dirait que tu as du flair'
const MESSAGES_SUCCESS = [MESSAGE_SUCCESS_1, MESSAGE_SUCCESS_2, MESSAGE_SUCCESS_3]
const MESSAGE_FAILURE_1 = 'Pas de chance essaye encore'
const MESSAGE_FAILURE_2 = "Non, t'aurais pas du choisir ce coquillage ..."
const MESSAGE_FAILURE_3 = 'Pas de bol, on dirait que ce jeu est truqué'
const MESSAGES_FAILURE = [MESSAGE_FAILURE_1, MESSAGE_FAILURE_2, MESSAGE_FAILURE_3]
const MESSAGE_NEXT_ROUND = 'Ok, continuons ...'
const MESSAGE_VICTORY = "Tu gagné j'arrive pas à y croire"
const MESSAGE_DEFEAT = 'On dirait bien que tu as perdu mon ami'
const MESSAGE_ERROR = "Une erreur s'est produite"

// CTA LABELS
const CTA_LABEL_LOADING = 'Chargement ...'
const CTA_LABEL_START = 'Commencer à jouer !'
const CTA_LABEL_CONFIRM = 'Confirmer'
const CTA_LABEL_CONTINUE = 'Prochain tour'
const CTA_LABEL_REPLAY = 'Rejouer'

const getRandomItemFromArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)]
}

const DEFAULT_STATE = {
  currentStep: GameSteps.LOADING,
  message: '' as string,
  cta: {
    label: CTA_LABEL_LOADING,
    action: null as GameSteps | null
  },
  selectedShell: null as number | null,
  pearlLocation: null as number | null,
  currentRound: 1,
  howManyRounds: 2,
  score: 0,
  hasWon: null as boolean | null,
  eyesColor: 'grey' as EYES_COLOR,
  timeoutID: null as number | null
}

export const useGameManager = defineStore('todolist', {
  state: () => ({ ...DEFAULT_STATE }),
  actions: {
    async runStep(step: GameSteps) {
      this.cancelTimeout()
      this.currentStep = step
      this.message = ''
      this.cta.label = ''

      try {
        switch (step) {
          case GameSteps.READY_TO_PLAY:
            this.cta = {
              label: CTA_LABEL_START,
              action: GameSteps.START_PLAYING
            }

            break
          case GameSteps.START_PLAYING:
            // If a cache exist it means we don't display the rules
            if (localStorage.getItem(SKIP_RULES_KEY_LOCAL_STORAGE)) {
              this.runStep(GameSteps.SHUFFLING)
            } else {
              this.runStep(GameSteps.DISPLAY_RULES)
            }
            break
          case GameSteps.DISPLAY_RULES:
            break
          case GameSteps.STOP_SHOWING_RULES:
            localStorage.setItem(SKIP_RULES_KEY_LOCAL_STORAGE, 'true')
            this.runStep(GameSteps.SHUFFLING)
            break
          case GameSteps.SHUFFLING:
            this.selectedShell = null
            this.eyesColor = 'grey'
            await this.getRandomPearlLocation()

            this.setMessage(MESSAGE_IS_SHUFFLING)

            this.timeoutID = setTimeout(() => {
              this.runStep(GameSteps.MAKE_A_CHOICE)
            }, 5000)
            break
          case GameSteps.MAKE_A_CHOICE:
            this.setMessage(MESSAGE_MAKE_A_CHOICE)
            break
          case GameSteps.CHECKING_CHOICE:
            this.setMessage(MESSAGE_CHECKING_CHOICE)

            this.timeoutID = setTimeout(() => {
              this.runStep(GameSteps.REVEAL)
            }, 1500)
            break
          case GameSteps.REVEAL:
            // SUCCESS
            if (this.selectedShell === this.pearlLocation) {
              this.setMessage(getRandomItemFromArray(MESSAGES_SUCCESS))
              this.score = this.score + 1
              this.eyesColor = 'blue'
            }
            // FAILURE
            else {
              this.setMessage(getRandomItemFromArray(MESSAGES_FAILURE))
              this.eyesColor = 'red'
            }

            if (this.currentRound + 1 <= this.howManyRounds) {
              this.cta = {
                label: CTA_LABEL_CONTINUE,
                action: GameSteps.NEXT_ROUND
              }
            } else {
              this.timeoutID = setTimeout(() => {
                this.runStep(GameSteps.FINAL_RESULT)
              }, 2000)
            }
            break
          case GameSteps.NEXT_ROUND:
            this.setMessage(MESSAGE_NEXT_ROUND)
            this.currentRound = this.currentRound + 1

            this.timeoutID = setTimeout(() => {
              this.runStep(GameSteps.SHUFFLING)
            }, 1500)
            break
          case GameSteps.FINAL_RESULT:
            this.hasWon = this.score >= Math.ceil(this.howManyRounds / 2)
            if (this.hasWon) {
              this.eyesColor = 'blue'
              this.setMessage(MESSAGE_VICTORY)
            } else {
              this.eyesColor = 'red'
              this.setMessage(MESSAGE_DEFEAT)
            }
            this.cta = {
              label: CTA_LABEL_REPLAY,
              action: GameSteps.REPLAY
            }
            this.cancelTimeout()
            break
          case GameSteps.REPLAY:
            Object.assign(this, { ...DEFAULT_STATE })
            this.runStep(GameSteps.SHUFFLING)
            break
        }
      } catch {
        this.message = MESSAGE_ERROR
      }
    },
    onSelectShell(indexShell: number) {
      this.selectedShell = indexShell === this.selectedShell ? null : indexShell

      if (this.selectedShell !== null) {
        this.message = MESSAGE_CONFIRM_CHOICE
        this.cta = {
          label: CTA_LABEL_CONFIRM,
          action: GameSteps.CHECKING_CHOICE
        }
      } else {
        this.runStep(GameSteps.MAKE_A_CHOICE)
      }
    },
    setMessage(message: string) {
      this.message = message
    },
    getRandomPearlLocation() {
      return fetch(
        'https://www.random.org/integers/?num=1&min=0&max=2&col=1&base=10&format=plain&rnd=new'
      )
        .then((res) => res.json())
        .then((res) => {
          this.pearlLocation = res
        })
    },
    isCurrentStep(value: GameSteps | GameSteps[]) {
      if (Array.isArray(value)) {
        return value.includes(this.currentStep)
      } else {
        return this.currentStep === value
      }
    },
    cancelTimeout() {
      if (typeof this.timeoutID === 'number') {
        clearTimeout(this.timeoutID)
      }
    }
  }
})
