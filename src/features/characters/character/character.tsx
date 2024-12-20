import { RiArrowRightSLine } from "@remixicon/react";
import { FragmentType, graphql, useFragment } from "../../../gql";
import styles from "./character.module.scss";

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
    episode {
      id
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
      className={styles.container}
      onClick={() => {
        onSelect(characterData);
      }}
    >
      <div className={styles.textContainer}>
        <h4 className={styles.name}>{name}</h4>
        <span className={styles.specie}>{specie}</span>
      </div>

      <RiArrowRightSLine className={styles.arrowIcon} />
    </li>
  );
};
