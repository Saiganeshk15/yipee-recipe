import React from 'react'
import { useState , useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import { styled } from 'styled-components';

function Searched() {

  const [ searchedRecipies , setSearchedRecipies ] = useState([]);
  let params = useParams();

  useEffect(() => {
    getSearched(params.search)
  },[params.search]);

  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    const recipies = await data.json();
    setSearchedRecipies(recipies.results);
  };

  return (
    <Grid >
      {searchedRecipies.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/'+item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })};
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
    height: 15rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;