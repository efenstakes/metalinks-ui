import './component.scss'


type ComponentProps = {
    children: any,
}
const FabComponent = ({ children }: ComponentProps) => {
  return (
    <div className='fab'>
        {children}
    </div>
  )
}

export default FabComponent