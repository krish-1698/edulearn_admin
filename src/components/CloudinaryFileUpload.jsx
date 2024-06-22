// import { useEffect } from 'react';

// let cloudinary;
// let widget;

// const ImageUploadWidget = ({ children, onUpload }) => {

//   useEffect(() => {

//     if ( !cloudinary ) {
//       cloudinary = window.cloudinary;
//     }

//     function onIdle() {
//       if ( !widget ) {
//         widget = createWidget();
//         console.log("Widget created:", widget);
//       }
//     }
//     'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
//   }, []);


//   function createWidget() {
//     const options = {
//       cloudName: 'drwfh1tcn',
//       uploadPreset: 'xrvclikm'
//     }

//     return cloudinary?.createUploadWidget(options,
//       function (error, result) {
//         if ( error || result.event === 'success' ) {
//           onUpload(error, result, widget);
//         }
//       }
//     );
//   }
//   function open() {
//     if ( !widget ) {
//       widget = createWidget();
//     }
//     widget && widget.open();
//   }

//   return (
//     <>
//       {children({ cloudinary, widget, open })}
//     </>
//   )
// }

// export { ImageUploadWidget };


import React, { useEffect, useRef } from 'react';

const ImageUploadWidget = ({ children, onUpload }) => {
  // Using a ref to keep the widget instance specific to each component
  const widgetRef = useRef(null);

  useEffect(() => {
    // Ensure cloudinary is only set up once
    const cloudinary = window.cloudinary;

    function onIdle() {
      if (!widgetRef.current) {
        widgetRef.current = createWidget(cloudinary);
        console.log("Widget created:", widgetRef.current);
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
  }, []);

  function createWidget(cloudinary) {
    const options = {
      cloudName: 'drwfh1tcn',
      uploadPreset: 'xrvclikm'
    };

    return cloudinary?.createUploadWidget(options, (error, result) => {
      if (error || result.event === 'success') {
        onUpload(error, result, widgetRef.current);
      }
    });
  }

  function open() {
    if (!widgetRef.current) {
      const cloudinary = window.cloudinary;
      widgetRef.current = createWidget(cloudinary);
    }
    widgetRef.current && widgetRef.current.open();
  }

  return (
    <>
      {children({ open })}
    </>
  );
};

export { ImageUploadWidget };
