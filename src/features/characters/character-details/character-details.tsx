import { CharacterFragment } from "../character/character";
import { FragmentType, useFragment } from "../../../gql";
import styles from "./character-details.module.scss";
import { Property } from "../property/property";

export const CharacterDetails = (props: {
  characterDetails: FragmentType<typeof CharacterFragment>;
}) => {
  const characterDetails = useFragment(
    CharacterFragment,
    props.characterDetails
  );

  const { name, species, status, gender, location, origin, image, episode } =
    characterDetails;

  return (
    <div className={styles.container}>
      <figure className={styles.imageContainer}>
        <img src={image || ""} alt={name || ""} className={styles.image} />
      </figure>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.section}>
        <strong className={styles.subtitle}>Properties</strong>
        <Property property="Gender" value={gender || ""} />
        <Property property="Specie" value={species || ""} />
        <Property property="Status" value={status || ""} />
      </div>

      <div className={styles.section}>
        <strong className={styles.subtitle}>Whereabouts</strong>
        <Property property="Origin" value={origin?.name || ""} />
        <Property property="Location" value={location?.name || ""} />
      </div>
      <div className={styles.section}>
        <strong className={styles.subtitle}>Episodes:</strong>
        <ul className={styles.episodes}>
          {episode.slice(0, 5).map((ep) => (
            <li className={styles.episode} key={ep?.id}>
              {ep?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
