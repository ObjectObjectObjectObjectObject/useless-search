// @ts-check

const corpus = ['cat', 'dog', 'cow', 'green', 'eggs', 'spam', 'mac and cheese'];
const input = 'eg';

/**
 *
 * @param { string } str
 * @returns { string }
 */
const sortString = str => Array.from(str.toLowerCase()).sort().join('').trim();

/**
 * helper type to organise individual corpus strings and their sorted versions
 * @typedef { { original: string; sorted: string; rank?:number } } SortedCorpusItem
 */

/**
 *
 * @param { string } str
 * @returns { str[] }
 */
const search = str => {
    // empty string, so eturn eerything
    if (str.length === 0) {
        return corpus;
    }

    /** @type { SortedCorpusItem[] } */
    const sortedCorpusItems = corpus.map(corpusItem => ({ original: corpusItem, sorted: sortString(corpusItem) }));

    const sortedInput = sortString(str);

    const finalResults = [];

    outer: for (const corpusItem of sortedCorpusItems) {
        let currIndex = corpusItem.sorted.indexOf(sortedInput[0]);

        if (currIndex === -1) {
            continue;
        }

        for (let i = 1; i < sortedInput.length; i++) {
            let nextIndex = corpusItem.sorted.indexOf(sortedInput[i]);
            if (nextIndex <= currIndex) {
                continue outer;
            } else {
                currIndex = nextIndex;
            }
        }

        finalResults.push(corpusItem);
    }

    return finalResults.sort((resultA, resultB) => resultA.rank - resultB.rank).map(result => result.original);
};
