import { FragmentType, graphql, useFragment } from "../../../gql";

export const CharacterFragment = graphql(`
  fragment CharacterItem on Character {
    id
    name
    species
    image
    status
    gender
    location {
      name
    }
    origin {
      name
    }
  }
`);

export const Character = ({
  characterData,
  onSelect,
}: {
  characterData: FragmentType<typeof CharacterFragment>;
  onSelect: (character: FragmentType<typeof CharacterFragment>) => void;
}) => {
  const character = useFragment(CharacterFragment, characterData);
  const { name, species: specie } = character;

  return (
    <li
      onClick={() => {
        onSelect(characterData);
      }}
    >
      <span>{name}</span>
      <small>{specie}</small>
    </li>
  );
};
