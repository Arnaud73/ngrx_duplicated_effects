/**
 * Utility function returning the values of a dictionary
 *
 * @param dictionary to get the values from
 * @return any[] containing the values of the dictionary
 */
export function dictionaryValues<E extends { id?: string }> (dictionary: { [key: string]: E }): E[] {
    return Object.keys(dictionary).map(key => dictionary[key]);
}

/**
 * Transforms a list of entities having an id into a dictionary of these entities indexed by their id.
 *
 * @param entities the objects to include into the dictionary
 * @param transform an optional function to apply to each entity before adding it to the dictionary
 * @return {[id:string]:E} the dictionary of entities
 */
export function toDictionary<E extends { id?: string }> (entities: E[], transform: (e: E) => any = (e) => e): { [id: string]: E } {
    return entities.reduce((dictionary: { [id: string]: E }, e: E) => {
        return Object.assign(dictionary, {
            [e.id]: transform(e)
        });
    }, {});
}
