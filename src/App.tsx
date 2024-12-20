// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";
import { CharacterList } from "./features/characters/character-list";
import { CharacterDetails } from "./features/characters/character-details/character-details";
import { CharacterFragment } from "./features/characters/character/character";
import { FragmentType } from "./gql";

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<FragmentType<
    typeof CharacterFragment
  > | null>(null);

  const selectCharacter = (
    character: FragmentType<typeof CharacterFragment>
  ) => {
    setSelectedCharacter(character);
  };

  return (
    <>
      <h2>Character List</h2>
      <CharacterList selectCharacter={selectCharacter} />
      {selectedCharacter && <CharacterDetails characterDetails={selectedCharacter} />}
    </>
  );
};

export default App;
