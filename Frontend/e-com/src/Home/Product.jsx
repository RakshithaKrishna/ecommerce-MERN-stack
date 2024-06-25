import React ,{useEffect, useState} from 'react';
import AxiosApi,{url} from '../AxiosAPI';

const Product = () => {


const [data,setdata] = useState([])
const [image,setimage] = useState()


    const videos = [
        'v4.mp4',
        'v2.mp4',
        'v5.mp4',
        'v1.mp4'
    ];

    const handleMouseOver = (event) => {
        event.target.play();
    };

    const handleMouseOut = (event) => {
        event.target.pause();
        event.target.currentTime = 0; // Reset video to start
    };

const getting = async() =>{
    try{
        const response = await AxiosApi.get('/user/home')
        console.log(response,"getting")
        setdata(response.data.Products)
        setimage(response.data.Products[1].image[0])

    }catch(error){
        console.log(error)
    }
}

useEffect(()=>{
    getting()
},[])



    return (
        <div>
            <div className="lg:flex flex-row p-2   ">
                {videos && videos.map((video, index) => (
                    <video
                        key={index}
                        className="ml-4 w-full lg:w-1/4 sm:w-auto"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
            </div> 
            {/* <div className="flex mt-12 ml-6 p-2 max-h-200px space-x-4 space-y-4 ">
                {
                    image && 

    <div className="mr-4" >
        <img src={`${url}/products/${image}`} alt="" className=" object-cover max-h-400px min-h-200px h-300px" />
    </div>
                    
                }
    <div className="grid grid-cols-2 mt-5 space-y-1   ">
        {
            data && data.map((item)=>(
        <div className="mr-4" key={item}>
            <img src={`${url}/products/${item.image[0]}`} alt="" className=" max-h-96 w-80 object-fill space-x-2   " />
        </div>
            ))
        }
      
    </div>
</div> */}


        </div>
    );
};

export default Product;
