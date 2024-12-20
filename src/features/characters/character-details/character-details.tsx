import { CharacterFragment } from "../character/character";
import { FragmentType, useFragment } from "../../../gql";

export const CharacterDetails = (props: {
  characterDetails: FragmentType<typeof CharacterFragment>;
}) => {
  const characterDetails = useFragment(
    CharacterFragment,
    props.characterDetails
  );
  return <div>{JSON.stringify(characterDetails)}</div>;
};
