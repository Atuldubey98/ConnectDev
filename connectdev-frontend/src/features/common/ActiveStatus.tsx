import { TbCircleDotFilled } from "react-icons/tb"

export default function ActiveStatus({
  isActiveNow,
}: {
  isActiveNow: boolean
}) {
  return <TbCircleDotFilled color={isActiveNow ? "green" : "red"} />
}
