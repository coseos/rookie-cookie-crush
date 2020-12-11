const FIVE_SECONDS = 5000;
const TEN_SECONDS = 10000;

function ignoreByURLpattern( info ) {
    if(null!==info.urlPattern) {
        if(null===document.URL.match(new RegExp(info.urlPattern, 'i'))) {
            return true;
        }
    }
    return false;
}

function removeById( elementInfo ) {
    if(ignoreByURLpattern(elementInfo)) {
        return;
    }
    let element = document.getElementById(elementInfo.nodeId);
    if(null!==element) {
        element.remove();
    }
}

function removeByClassname( clazzInfo ) {
    if(ignoreByURLpattern(clazzInfo)) {
        return;
    }
    let nodelist = document.getElementsByClassName(clazzInfo.clazz);
    if(null!==nodelist) {
        for( let node of nodelist ) {
            node.remove();
        }
    }    
}

function removeBySelector( attributeInfo ) {
    if(ignoreByURLpattern(attributeInfo)) {
        return;
    }
    let nodelist = document.querySelectorAll(attributeInfo.selector);
    if(null!==nodelist) {
        for( let node of nodelist ) {
            node.remove();
        }
    }
}

function removeWith( datafile, func ) {
    const dataURL = browser.runtime.getURL(datafile);
    fetch(dataURL)
        .then((response) => response.json())
        .then((json) => json.data )
        .then((data) => data.forEach( dataInfo => func(dataInfo )));
}

function scanWebpage() {
    removeWith( 'data/ids.json', removeById );
    removeWith( 'data/clazzes.json', removeByClassname );
    removeWith( 'data/selectors.json', removeBySelector );
}

scanWebpage();
setTimeout( () => scanWebpage(), FIVE_SECONDS);
