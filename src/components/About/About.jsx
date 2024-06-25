import React from 'react';
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <section>
        <div className="container">
            <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                    <img src={aboutImg} alt="" />
                    <div className='absolute z-20 bottom-4 right-4 md:w-[300px] w-[200px] md:right-4'>
                        <img src={aboutCardImg} alt="" />
                    </div>
                </div>
                <div className='w-full lg:w-1/2 xl:2-[670px] order-1 lg:order-2'>
                    <h2 className='heading'>Proud to be nations one of the best</h2>
                    <p className='text__para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quibusdam modi, odio reiciendis ut culpa accusantium incidunt harum porro est repudiandae beatae mollitia consequuntur magnam eius eligendi excepturi accusamus fuga!</p>
                    <p className='text__para mt-30px'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quibusdam modi, odio reiciendis ut culpa accusantium incidunt harum porro est repudiandae beatae mollitia consequuntur magnam eius eligendi excepturi accusamus fuga!</p>
                    <Link to="/">
                        <button className='btn'>
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}

export default About;
