export const hasDuplicateCharacter = (
    str: string,
    characterToCheck: string
): boolean => {
    return str.split(characterToCheck.trim()).length > 2;
};
