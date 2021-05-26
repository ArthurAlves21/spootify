import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';
import LoadingMusic from './DiscoverLoading';

function ScrollContainer(id, { isNegative } = {}) {
  return () => {   
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}


export default function DiscoverBlock({text, id, data, imagesKey = 'images', isLoading }) {
  let objs = [];
  for(let i=0; i<20; i++){
    objs.push(i)
  }
  return (
    <>
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={ScrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={ScrollContainer(id, {isNegative: false})}
                value={10}
              />
            </div>
          ) : null
        }
        
      </div>
      {

      isLoading ? (
        <div className="discover-block__row" id={id}>
          {objs.map(item => {
            return(
              <LoadingMusic />
            )
          })}
        </div>
      ) : (
        <div className="discover-block__row" id={id}>
        {data.map(({ [imagesKey]: images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
      )}
    </div>
   </> 
  );
}
