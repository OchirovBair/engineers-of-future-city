import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { RESOURCES, type ResourceCode } from '../config/resources'
import { FAILURE_OUTCOME, selectRangeOutcome, type Outcome } from '../config/outcomes'

type Values = Record<ResourceCode, number>

function makeInitial(): Values {
  return Object.fromEntries(
    RESOURCES.map((r) => [r.code, r.start])
  ) as Values
}

type Action =
  | { type: 'SET'; code: ResourceCode; delta: 1 | -1 }
  | { type: 'RESET' }

function reducer(state: Values, action: Action): Values {
  switch (action.type) {
    case 'SET': {
      const next = Math.max(0, state[action.code] + action.delta)
      return { ...state, [action.code]: next }
    }
    case 'RESET':
      return makeInitial()
    default:
      return state
  }
}

export interface GameState {
  values: Values
  failed: boolean
  failedCode: ResourceCode | null
  index: number
  /** Введённое вручную значение катастроф (до умножения) */
  katInput: number
  /** Отображаемое и используемое значение КАТ = katInput × 2 */
  katDisplay: number
  final: number
  outcome: Outcome | null
  showResult: boolean
  setValue: (code: ResourceCode, delta: 1 | -1) => void
  setKatDelta: (delta: 1 | -1) => void
  openResult: () => void
  closeResult: () => void
  reset: () => void
}

export function useGameState(): GameState {
  const [values, dispatch] = useReducer(reducer, undefined, makeInitial)
  const [katInput, setKatInput] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const failedCode = useMemo<ResourceCode | null>(() => {
    for (const r of RESOURCES) {
      if (r.critical && values[r.code] === 0) return r.code
    }
    return null
  }, [values])

  const failed = failedCode !== null

  // При провале — автоматически открыть модал
  useEffect(() => {
    if (failed) setShowResult(true)
  }, [failed])

  const index = useMemo(
    () => RESOURCES.reduce((sum, r) => sum + values[r.code], 0),
    [values]
  )

  const katDisplay = katInput * 2
  const final = index - katDisplay

  const outcome = useMemo<Outcome | null>(() => {
    if (failed) return FAILURE_OUTCOME
    return selectRangeOutcome(final, values, katInput)
  }, [failed, final, values, katInput])

  const setValue = useCallback((code: ResourceCode, delta: 1 | -1) => {
    dispatch({ type: 'SET', code, delta })
  }, [])

  const setKatDelta = useCallback((delta: 1 | -1) => {
    setKatInput((prev) => Math.max(0, prev + delta))
  }, [])

  const openResult = useCallback(() => setShowResult(true), [])
  const closeResult = useCallback(() => setShowResult(false), [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    setKatInput(0)
    setShowResult(false)
  }, [])

  return {
    values,
    failed,
    failedCode,
    index,
    katInput,
    katDisplay,
    final,
    outcome,
    showResult,
    setValue,
    setKatDelta,
    openResult,
    closeResult,
    reset,
  }
}
