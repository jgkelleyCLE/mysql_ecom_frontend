import React, { useState } from 'react';
import { CategoryGrid, PageContainer } from '../components/UI';

const Gallery = () => {
  const [videos, setVideos] = useState([
    'https://www.youtube.com/embed/YykPGGq2XR4',
    'https://www.youtube.com/embed/kpTeQwMAy4c',
    'https://www.youtube.com/embed/EAFEEor52fk',
    'https://www.youtube.com/embed/SrugbNLBar4',
    'https://www.youtube.com/embed/HSRU_s6n7q4',
    'https://www.youtube.com/embed/1LaIVbsAzB0',
    'https://www.youtube.com/embed/9xie0QHmDRE',
    'https://www.youtube.com/embed/ZmjWonBhID4',
    'https://www.youtube.com/embed/1BkB0iyoyps',
    'https://www.youtube.com/embed/Ugy35SE73k8',
  ]);

  const list = videos.map((item, index) => <iframe key={index} src={item} className="m-2 rounded-md"></iframe>);

  return (
    <>
      <title>Gallery | SQL Rentals</title>
      <PageContainer>
        <div className="flex flex-col items-center">
          <iframe
            width="800"
            height="315"
            src="https://www.youtube.com/embed/4Vi7ssA4HWQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-11/12 h-[600px] max-w-[1200px] my-4"
          ></iframe>
          <CategoryGrid className="gap-[1px]">{list}</CategoryGrid>
        </div>
      </PageContainer>
    </>
  );
};

export default Gallery;
