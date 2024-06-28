import Image, { type ImageProps } from 'next/image'
import logo from './logo.png'

export function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  return <Image src={logo} alt="Meeting Potes logo" {...props} />
}
