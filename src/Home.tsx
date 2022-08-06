import { useAccelerometer } from './Accelerometer'

export default function Home() {
  const { x, y, z, rotation } = useAccelerometer()
  return (
    <div>
      <h1>x: {x}</h1>
      <h1>y: {y}</h1>
      <h1>z: {z}</h1>
      <h1>
        rotation: ({rotation?.alpha}, {rotation?.beta}, {rotation?.gamma}){' '}
      </h1>
    </div>
  )
}
