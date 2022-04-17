import { useEffect, useState } from "react";

interface PokemonColor {
  name: string;
  url: string;
}

export default function PokeList(){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PokemonColor[]>([]);

  useEffect(() => {
    setLoading(true);

    fetch('https://pokeapi.co/api/v2/pokemon-color')
      .then((response) => {
        if(!response.ok) {
          const message = `response is not ok(${response.status}): ${response.statusText}`
          throw new Error(message);
        }
        return response.json();
      })
      .then((result) => {
        setData(result.results);
      })
      .catch(err => {
        console.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading) {
    return <div>Loading....</div>
  }

  return (
    <div>
      {data.map(item => {
        return <div data-testid="pokemonColors" key={item.url}>
          <span>{item.name}</span>
          <span>{item.url}</span>
        </div>
      })}
    </div>
  )
}
