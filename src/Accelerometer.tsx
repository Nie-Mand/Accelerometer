import { useEffect, useState, useMemo, useContext, createContext } from 'react'

function useStates<T>(defaults: T) {
  const [state, _setState] = useState<T>(defaults)
  function setState(newState: Partial<T>) {
    _setState(Object.assign({}, state, newState))
  }
  return [state, setState] as [T, typeof setState]
}

const AccelerometerContext = createContext<Context>({
  x: null,
  y: null,
  z: null,
  rotation: null,
})

export default function Accelerometer(props: Props) {
  const [v, setV] = useStates<State>({
    x: null,
    y: null,
    z: null,
    rotation: null,
    landscape: false,
  })

  function handleAcceleration(e: DeviceMotionEvent) {
    const useGravity = props.useGravity && true
    const multiplier = props.multiplier || 1
    const { landscape } = v
    const acceleration = useGravity
      ? e.accelerationIncludingGravity
      : e.acceleration
    const rotation = e.rotationRate || null

    const { x, y, z } = acceleration!

    setV({
      rotation,
      x: (landscape ? y! : x!) * multiplier,
      y: (landscape ? x! : y!) * multiplier,
      z: z! * multiplier,
    })
  }

  function handleOrientation() {
    const orientation = window.orientation
    const landscape = orientation === 90 || orientation === -90
    setV({
      landscape,
    })
  }

  useEffect(() => {
    handleOrientation()
    addEventListener('devicemotion', handleAcceleration)
    addEventListener('orientationchange', handleOrientation)

    return () => {
      removeEventListener('devicemotion', handleAcceleration)
      removeEventListener('orientationchange', handleOrientation)
    }
  }, [])

  const value = useMemo(() => {
    return {
      x: v.x,
      y: v.y,
      z: v.z,
      rotation: v.rotation,
    }
  }, [v])

  return (
    <AccelerometerContext.Provider value={value}>
      {props.children}
    </AccelerometerContext.Provider>
  )
}

export function useAccelerometer() {
  return useContext(AccelerometerContext)
}

interface State {
  x: number | null
  y: number | null
  z: number | null
  rotation: DeviceMotionEventRotationRate | null
  landscape: boolean
}

interface Context {
  x: number | null
  y: number | null
  z: number | null
  rotation: DeviceMotionEventRotationRate | null
}

interface Props {
  children: React.ReactNode
  multiplier?: number
  useGravity?: boolean
}
