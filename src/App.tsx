import { useState } from "react";
import { CharacterList } from "./features/characters/character-list";
import { CharacterDetails } from "./features/characters/character-details/character-details";
import { CharacterFragment } from "./features/characters/character/character";
import { FragmentType } from "./gql";
import styles from "./app.module.scss";

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
      <nav className={styles.nav}>
        <h2 className={styles.title}>Ravn Rick and Morty Registry</h2>
      </nav>
      <section className={styles.container}>
        <aside className={styles.characters}>
          <CharacterList selectCharacter={selectCharacter} />
        </aside>
        <main className={styles.details}>
          {selectedCharacter && (
            <CharacterDetails characterDetails={selectedCharacter} />
          )}
        </main>
      </section>
    </>
  );
};

export default App;
