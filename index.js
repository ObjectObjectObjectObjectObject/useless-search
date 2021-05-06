// @ts-check

/**
 * @param { string } str
 * @returns { string }
 */
function sortString(str) {
    return Array.from(str.toLowerCase()).sort().join('').trim();
}

/**
 * @param { string } str
 * @param { string[] } corpus
 * @param { { useless: boolean } } options
 * @returns { str[] }
 */
function search(str, corpus, options) {
    // empty string, so return everything
    if (str.length === 0) {
        return corpus;
    }

    const sortedCorpusItems = corpus.map(corpusItem => (options.useless ? sortString(corpusItem) : corpusItem));
    const normalisedInput = options.useless ? sortString(str) : str;

    const finalResults = [];
    outer: for (const corpusItem of sortedCorpusItems) {
        let currIndex = corpusItem.indexOf(normalisedInput[0]);

        if (currIndex === -1) {
            continue;
        }

        for (let i = 1; i < normalisedInput.length; i++) {
            let nextIndex = corpusItem.slice(currIndex + 1).indexOf(normalisedInput[i]);

            if (nextIndex === -1) {
                continue outer;
            } else {
                currIndex += nextIndex + 1;
            }
        }

        finalResults.push(corpusItem);
    }

    return finalResults;
}
