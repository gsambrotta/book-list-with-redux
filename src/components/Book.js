import React from 'react'
import PropTypes from 'prop-types'
import './Book.css';

export default function Book (props) {
  const {id, imgs, categories, pubDate, title, authors } = props
  let inEvidence = false

  const thumb = imgs && imgs.thumbnail ? imgs.thumbnail : (imgs && imgs.smallThumbnail ? imgs.smallThumbnail : '')
  const author = authors && authors.map((aut, i) => <strong key={i}> {aut} </strong> )
  const genre = categories && categories.map((category) => {
    inEvidence = (category === 'Fiction' || category === 'Religion')
    return <em key={category}>{category}</em>
  })

  return (
    <li key={id} className={inEvidence ? 'u-is-highlight bookDetail' : 'bookDetail'}>
      <div className='bookDetail__img'>{imgs && <img src={thumb} />}</div>
      <div>
        {title &&
          <h3>{title}</h3>
        }
        {authors &&
          <p>{author}</p>
        }
        <p className='bookDetail__notes'>{categories && genre}  | {pubDate}</p>
      </div>
    </li>
  )
}

Book.propsType = {
  id: PropTypes.number.isRequired,
  imgs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  pubDate: PropTypes.number.isRequired
}
