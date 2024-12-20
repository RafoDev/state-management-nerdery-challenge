import { useQuery } from "@apollo/client";
import { FragmentType, graphql } from "../../gql";
import { Character, CharacterFragment } from "./character/character";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./character-list.module.scss";
import { Loading } from "../../shared/ui/loading/loading";

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
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data) return <Loading>Loading...</Loading>;
  if (error) return <p>Error : {error.message}</p>;

  const characters = data?.characters?.results || [];
  const hasMore = data?.characters?.info?.next != null;

  const loadMoreCharacters = () => {
    if (hasMore) {
      fetchMore({
        variables: {
          page: data?.characters?.info?.next,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;

          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...(prevResult.characters?.results || []),
                ...(fetchMoreResult.characters?.results || []),
              ],
            },
          };
        },
      });
    }
  };

  return (
    <InfiniteScroll
      dataLength={characters.length}
      next={loadMoreCharacters}
      hasMore={hasMore}
      // loader={<Loading>Loading more characters...</Loading>}
      loader={null}
      scrollableTarget="characters"
    >
      <div id="characters" className={styles.container}>
        {characters.map((character) => {
          if (!character) return null;

          const characterData = character as FragmentType<
            typeof CharacterFragment
          >;

          return (
            <Character
              key={character.id}
              characterData={characterData}
              onSelect={selectCharacter}
            />
          );
        })}
        {loading && <Loading>Ga</Loading>}
      </div>
    </InfiniteScroll>
  );
};
