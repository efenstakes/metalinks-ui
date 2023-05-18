import './section_title.component.scss'

type ComponentProps = {
    title: string,
    children?: any,
}
const SectionTitleComponent = ({ title, children }: ComponentProps) => {
  return (
    <div className='padded_container_lg section_title_container'>

        <p className='section_title_container__title su_3'> { title } </p>
        
        <div className='section_title_container__right su_5'>
            { children }
        </div>
    </div>
  )
}

export default SectionTitleComponent