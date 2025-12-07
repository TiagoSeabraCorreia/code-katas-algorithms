export function lengthOfLongestSubstring(str: string): number{
    const activeCharacters = new Set<string>();
    let left = 0;
    let max = 0;
    for (let index = 0; index < str.length; index++) {
        const element = str[index];

        while (!_windowIsValid(activeCharacters, element)) {
            activeCharacters.delete(str[left]);
            left++;
        }
        activeCharacters.add(element);
        console.log(activeCharacters);
        max = Math.max(max, index - left + 1);
    }
    return max;
}

function _windowIsValid(set: Set<string>, char: string){
    return set.has(char) == false;
}
