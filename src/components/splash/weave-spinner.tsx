'use client';

import React from 'react';

const WeaveSpinner: React.FC = () => {
  return (
    <>
      <style>
        {`
          .spinner-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
            pointer-events: none;
          }

          .spinner-container {
            position: relative;
            width: 150px;
            height: 150px;
            transform-style: preserve-3d;
            perspective: 1200px;
            opacity: 0.15;
          }

          .node {
            display: none;
          }

          .thread {
            position: absolute;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(0, 242, 254, 0.3),
              transparent
            );
            box-shadow: 0 0 8px rgba(0, 242, 254, 0.1);
            transform-origin: center;
          }

          .t1 {
            width: 100%;
            height: 1px;
            top: 30%;
            left: 0;
            animation: weave1 4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          }

          .t2 {
            width: 1px;
            height: 100%;
            top: 0;
            left: 70%;
            animation: weave2 4.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          .t3 {
            width: 100%;
            height: 1px;
            bottom: 30%;
            left: 0;
            animation: weave3 4.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
          }

          .t4 {
            width: 1px;
            height: 100%;
            top: 0;
            left: 30%;
            animation: weave4 4.6s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
          }

          @keyframes weave1 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
            }
            50% {
              transform: translateY(30px) rotateX(70deg) rotateZ(40deg);
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
            }
          }

          @keyframes weave2 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
            }
            50% {
              transform: translateX(-30px) rotateY(70deg) rotateZ(-40deg);
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
            }
          }

          @keyframes weave3 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
            }
            50% {
              transform: translateY(-30px) rotateX(-70deg) rotateZ(30deg);
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
            }
          }

          @keyframes weave4 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
            }
            50% {
              transform: translateX(30px) rotateY(-70deg) rotateZ(-30deg);
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
            }
          }
        `}
      </style>
      <div className="spinner-wrapper">
        <div className="spinner-container">
          <div className="thread t1" />
          <div className="thread t2" />
          <div className="thread t3" />
          <div className="thread t4" />
          <div className="node" />
        </div>
      </div>
    </>
  );
};

export default WeaveSpinner;
