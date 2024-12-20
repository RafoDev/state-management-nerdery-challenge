import { useQuery } from "@apollo/client";
import { FragmentType, graphql } from "../../gql";
import { Character, CharacterFragment } from "./character/character";
import InfiniteScroll from "react-infinite-scroll-component";

const getCharacters = graphql(`
  query getCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        next
      }
      results {
        ...CharacterItem
      }
    }
  }
`);

export const CharacterList = ({
  selectCharacter,
}: {
  selectCharacter: (character: FragmentType<typeof CharacterFragment>) => void;
}) => {
  const { loading, error, data, fetchMore } = useQuery(getCharacters, {
    variables: {
      page: 1,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return (
    // <InfiniteScroll dataLength={}>
    <ul>
      {data?.characters?.results?.map((character) => {
        if (!character) return null;

        const characterData = character as FragmentType<
          typeof CharacterFragment
        >;

        return (
          <Character
            key={character?.id}
            characterData={characterData}
            onSelect={selectCharacter}
          />
        );
      })}
    </ul>
    // </InfiniteScroll>
  );
};
