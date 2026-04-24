import Heading from './Heading.jsx'
import Find from './Find.jsx'
import Button from './Button.jsx'

const Header = () => {
  return (
    <div className='flex justify-between'>
        <Heading />
        <Find />
        <Button />
    </div>
  )
}

export default Header