import Contentstack, { Config, Entry } from 'contentstack';

const config: Config = {
  api_key: process.env.CONTENTSTACK_API_KEY||'',
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN||'',
  environment: process.env.CONTENTSTACK_ENVIRONMENT||''
}
console.log(JSON.stringify(config))
const Stack = Contentstack.Stack(config);
type Song = {
  title: string
}

  type props = {
    song: Song
  }

export default function Page({song}: props) {
    return <div>
        <h1>Song</h1>
        <p>{song.title}</p>
    </div>
  }

  export async function getStaticProps(){

    const entry = Stack.ContentType('songs').Entry("blt218c1230563a8110");
    const result = await entry.fetch()
    console.log(result)
    const song = await result.json()
    
    return {
        props: {song: {title: song.get('title')}},
    }
  }