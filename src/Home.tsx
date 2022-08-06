import { useAccelerometer } from './Accelerometer'

function getClipPath(alpha: number) {
  return `polygon(0 0, 100% 0, ${100 - alpha}% 100%, ${alpha}% 100%)`
}

export default function Home() {
  const { x, y, z, rotation } = useAccelerometer()
  return (
    <div className="w-full h-screen grid place-content-center">
      <img
        src="https://img.seadn.io/files/7c09bb8adc54f991b4f12f45e7906f61.png?auto=format&fit=max&w=512"
        alt="nft"
        className="duration-200"
        style={{
          clipPath: getClipPath(rotation!.alpha || 0),
        }}
      />
    </div>
  )
}
