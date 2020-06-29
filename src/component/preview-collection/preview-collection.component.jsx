import React from 'react';
import CollectionItem from '../collection-item/collection-item.component.jsx';
import './preview-collection.styles.scss';

const PreviewCollection = ({title, items}) => (
  <div className='preview-collection'>
    <h1>{title.toUpperCase()}</h1>
    <div className='preview'>
      {
        items
          .filter((item,idx) => idx<4)
          .map(item => (
          <CollectionItem key={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl}></CollectionItem>
        ))
      }
    </div>
  </div>
)

export default PreviewCollection;