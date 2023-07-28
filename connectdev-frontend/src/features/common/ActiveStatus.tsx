import { memo } from "react"
import { TbCircleDotFilled } from "react-icons/tb"
function ActiveStatus({
  isActiveNow,
}: {
  isActiveNow: boolean
}) {
  return (
    <TbCircleDotFilled color={isActiveNow ? "var(--success-color)" : "var(--danger-color)"} />
  )
}

export default memo(ActiveStatus)