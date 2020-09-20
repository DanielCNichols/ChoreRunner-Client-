import React from 'react';
import s from './Loading.module.css';
import images from '../../ImgAssets/index';

export default function Loading() {
  return (
    <div className={s.loadingContainer}>
      <img src={images.megaman} alt="megaman" />
      <p className="videoGameTitles">
        Loading
        <span className={s.period}>.</span>
        <span className={s.period}>.</span>
        <span className={s.period}>.</span>
      </p>
    </div>
  );
}
