import { TbCircleDotFilled } from "react-icons/tb"

export default function ActiveStatus({
  isActiveNow,
}: {
  isActiveNow: boolean
}) {
  return (
    <TbCircleDotFilled color={isActiveNow ? "var(--success-color)" : "var(--danger-color)"} />
  )
}
