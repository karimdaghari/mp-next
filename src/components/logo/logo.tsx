import logo from './logo.png';
import Image, { type ImageProps } from 'next/image';

export function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      src={logo}
      alt='Meeting Potes logo'
      {...props}
    />
  );
}
