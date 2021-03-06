import { useState, useCallback } from 'react';

/**
 * @typedef {import('../services/characters.service').Hero} Hero
 */

/**
 * @returns {[Hero[], (member: Hero) => void, (args: { id: number}) => void]}
 */
export function useTeam() {
  const [team, setTeam] = useState([]);

  /**
   * @type {(member: Hero) => void}
   */
  const addTeam = useCallback((member) => {
    setTeam((data) => {
      if (data.length > 4) {
        // eslint-disable-next-line no-alert
        window.alert(
          'Your team is full, please remove one hero before add new one',
        );
        return data;
      }
      const id = data.reduce((acc, cur) => (acc.id > 0 ? acc.id : cur.id + 1), 0);
      return [...data, { ...member, id }];
    });
  }, []);

  /**
   * @type {(args: { id: number}) => void }
   */
  const removeTeam = useCallback(({ id }) => {
    setTeam((data) => data.filter((hero) => hero.id !== id));
  }, []);

  return [team, addTeam, removeTeam];
}
