import Image from 'next/image'
import logoImage from '../../public/images/logo.png'
import { CSSProperties } from 'react'

const Logo = ({ style }: { style?: CSSProperties }) => {
  return (
    <Image
      src={logoImage}
      alt="Picture of the author"
      width={26.5}
      height={40}
      style={style}
    />
  )
}

export default Logo
