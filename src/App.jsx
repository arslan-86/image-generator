import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { logo, preview } from '../src/assets/index'
import { getRandomPrompt } from './constants'

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [generateImg, setGenerateImg] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key
  });
  const openai = new OpenAIApi(configuration);


  function generateRandomPrompt(){
    const randomPrompt = getRandomPrompt();
    setPrompt(randomPrompt)
  }

  async function generateImage(){
    if(prompt == '') return;
    try {
      setGenerateImg(true)
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '512x512', 
      })
      console.log(res.data.data[0])
      setResult(res.data.data[0].url)
    } catch (error) {
      console.log(error)  
    }finally{
      setGenerateImg(false)
    }
    
  }
  return (
    <main>
      <header className='bg-slate-100 border-b-orange-100'>
        <nav className='container mx-auto py-5'>
          <img src={logo} className='w-28 object-contain ' alt="" />
        </nav>
      </header>

      <section className=' bg-slate-100 p-10 pt-1'>
        <div className='container max-w-max mx-auto text-center '>

          <div className='flex justify-between mb-2'>
          <label htmlFor="prompt" className='block mr-8 mb-4 text-2xl font-semibold'>
            Enter Prompt:
          </label>
          <button
          onClick={generateRandomPrompt}
           className='text-xs  px-4 py-2 bg-blue-100 rounded-lg self-center'>
            Random Prompt
          </button>
          </div>
         

            <textarea
              className='p-3 '
              name="prompt"
              id="prompt"
              cols="60"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A Man falling in Love with his Computer, digital art"
              required>
            </textarea>


            <button
            onClick={generateImage} 
            className='block w-full mt-6 py-2 text-white text-xl font-semibold sp bg-green-500 rounded-xl'>
             {generateImg ? 'Generating Image....' : 'Generate Image'}
            </button>

        </div>
      </section>

      <div className='container mx-auto mt-2 flex justify-center'>
        <img src={result ? result : preview} alt={prompt} className='w-[512px] object-contain rounded-2xl'/>
      </div>
    </main>
  )
}




