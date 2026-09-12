import { useState, type SyntheticEvent } from "react";
import styles from "./ProjectSearch.module.css";

type Props = {
  initialQuery: string;
  onSearch: (query: string) => void;
};

export function ProjectSearch({ initialQuery, onSearch }: Props) {
  const [draft, setDraft] = useState(initialQuery);

  const submit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(draft.trim());
  };

  return (
    <form className={styles.search} onSubmit={submit} role="search">
      <label htmlFor="project-search">Search projects</label>
      <div>
        <input
          id="project-search"
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          placeholder="Name, team, or owner"
          type="search"
          value={draft}
        />
        <button type="submit">Apply filter</button>
      </div>
    </form>
  );
}
