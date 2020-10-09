var gresty = Object()

on("ready", function() {
    gresty.utils.repeat(() => {log("Hello World!")}, 3);
});


gresty.utils = {
    repeat: (func, repetitions) => {
        for(let i = 0; i < repetitions; i++) {
            func();
        }
        return;
    },
    findHandouts: (name, filterFunction) => {
        let originalResults = findObjs({'name': name, 'type': 'handout'});
        // Filter the results with the filterFunction as predicate.
        if (filterFunction) {
            originalResults = originalResults.filter(filterFunction);
        }
        // Return null if no results.
        if (originalResults == null || originalResults.length == 0) {
            return null;
        }
        // Return the object itself if it is the only result.
        else if (originalResults.length == 1) {
            return originalResults[0];
        }
        return originalResults;
    },
    doHandoutNotes: (handout, notetype, callback) => {
        // Config handout contents must be in code blocks.
        // Lines delimited by <br>
        handout.get(notetype, notes => {
            let s = notes.replace(/(?:<\/?(pre)>)/g, "");
            let lines = s.split("<br>");
            let content = lines.join("\n");
            callback(content);
        });
    }
};
