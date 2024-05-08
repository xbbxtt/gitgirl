import React from 'react';

export default function HeroImage() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image'
        style={{
          backgroundImage: "url('/src/workingwomen.jpg')",
          height: 600,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(233, 155, 155, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>GitGirl Network</h1>
              <h4 className='mb-3'>Join us today</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
