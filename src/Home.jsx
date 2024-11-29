import React from 'react';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <meta property="og:title" content="AVFarm" />
        <meta property="og:description" content="This is a description of the AVFarm website." />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://avfarm.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avfarm" />
      </Helmet>

      <h1>Welcome to AVFarm</h1>
      <p>This is the homepage of AVFarm!</p>
    </div>
  );
};

export default HomePage;
