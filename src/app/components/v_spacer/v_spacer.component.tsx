
type ComponentProps = {
    space: number
}
const VSpacerComponent = ({ space = 1 }: ComponentProps) => {
    return (
        <div style={{ height: `${space * 1}rem` }} />
    )
}
export default VSpacerComponent