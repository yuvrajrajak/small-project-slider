import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
import styled from 'styled-components'

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 5000)
    return () => {
      clearInterval(slider)
    }
  })

  return (
    <Wrapper>
      <section>
        <div className="title">
          <h2>
            <span>/</span>reviews
          </h2>
        </div>
        <div className="section-center">
          {
            people.map((person, personIndex) => {
              const { id, image, name, title, quote } = person
              let position = 'nextSlide'
              if(personIndex === index){
                position = 'activeSlide'
              }
              if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)){
                position = 'lastSlide'
              }
              return (
                <article className={position} key={id}>
                  <img src={image} alt={name} className="person-img" />
                  <h4>{name}</h4>
                  <p className="title">{title}</p>
                  <p className="text">{quote}</p>
                  <FaQuoteRight className="icon" />
                </article>
              )
            })
          }
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>

          <button className="next" onClick={() => setIndex(index - 1)}>
            <FiChevronRight />
          </button>
        </div>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
margin-top: 5rem;
.title{
  text-align: center;
  margin-bottom: 4.5rem;
}
.title h2{
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.title span{
  font-size: 0.85em;
  color: var(--clr-primary-5);
  margin-right: 1rem;
  font-weight: 700;
}
.section-center{
  width: 80vw;
  margin: 0 auto;
  margin-top: 4rem;
  // have to have a height
  height: 450px;
  max-width: 800px;
  text-align: center;
  position: relative;
  display: flex;
  overflow: hidden;
}
.person-img{
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 4px solid var(--clr-grey-8);
  box-shadow: var(--dark-shadow);
}
article h4{
  text-transform: uppercase;
  color: var(--clr-primary-5);
  margin-bottom: 0.25rem;
}
.title{
  text-transform: capitalize;
  margin-bottom: 0.75rem;
  color: var(--clr-grey-3);
}
.text{
  max-width: 35em;
  margin: 0 auto;
  margin-top: 2rem;
  line-height: 2;
  color: var(-clr-grey-5);
}
.icon{
  font-size: 3rem;
  margin-top: 1rem;
  color: var(--clr-primary-5);
}
.prev,
.next {
  position: absolute;
  top: 200px;
  transform: translateY(-50%);
  background: var(--clr-grey-5);
  color: var(--clr-white);
  width: 1.25rem;
  height: 1.25rem;
  display: grid;
  place-items: center;
  border-color: transparent;
  font-size: 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
}
.prev:hover,
.next:hover {
  background: var(--clr-primary-5);
}

.prev{
  left: 0;
}
.next{
  right: 0;
}

@media (min-width: 800px){
  .text {
    max-width: 45em;
  }
  .prev,.next{
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
  }
}
article{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: var(--transition);
}
article.activeSlide {
  opacity: 1;
  transform: translateX(0);
}
article.lastSlide {
  transform: translateX(-100%);
}
article.nextSlide {
  transform: translateX(100%);
}

`

export default App;
