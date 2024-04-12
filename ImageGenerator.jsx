import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '/Users/sarvagyasamridhsingh/Documents/Programming/Javascript and other js/dreamforgeAI/src/Components/Assets/Experimenting-Panda.webp'


export const ImageGenerator = () => {

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if(inputRef.current.value===""){
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:
                    "API Key",
                    "User-Agent" : "Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:"1024x1024",

                }),
            }
        );

        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
    }

    return (
      <div className='Dream-Forge'>
          <div className='header'>
              Dream Forge <span>Generator</span>
          </div>
  
          <div className='img-loading'>
              <div className='image'>
                   <img src={image_url==="/" ? default_image:image_url} alt='' style={{ maxWidth: '50%', maxHeight: '50%', alignItems:'center'}} />
              </div>
          </div>
  
          <div className='search-box-container'> {/* Add this container */}
            <div className='search-box'>
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See'/>
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
          </div>
  
      </div>
    )
  }
  
