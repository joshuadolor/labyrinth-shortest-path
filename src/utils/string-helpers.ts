export const hasDuplicateCharacter = (
    str: string,
    characterToCheck: string
): boolean => {
    return str.split(characterToCheck).length > 2;
};
