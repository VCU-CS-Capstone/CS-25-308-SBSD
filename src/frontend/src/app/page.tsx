import Chatbot from "@/components/Chatbot/Chatbot";
import { getImageProps } from 'next/image'
 
function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ')
      return `url("${url}") ${dpi}`
    })
    .join(', ')
  return `image-set(${imageSet})`
}

export default function Home() {
  const {
    props: { srcSet },
  } = getImageProps({ alt: '', width: 3412, height: 1815, src: '/test.png' })
  const backgroundImage = getBackgroundImage(srcSet)
  const style = { height: '100vh', width: '100vw', backgroundImage }

  return (
    <main className="relative h-screen w-screen">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('/test.png')",
            backgroundPosition: 'start',
            width: '100vw',
            height: '100%', 
          }}
        ></div>
        <div className="h-[80%] w-[100%] flex flex-col justify-center items-center">
            <Chatbot/>
        </div>
    </main>
  );
}

